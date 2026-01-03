const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

/* ===============================
   1. CORS CONFIGURATION (FIXED)
================================ */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

/* ===============================
   2. BODY PARSING
================================ */
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

/* ===============================
   3. DATABASE CONNECTION
================================ */
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Railway MySQL database!");

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;

  const createPetsTable = `
    CREATE TABLE IF NOT EXISTS pets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      species VARCHAR(255) NOT NULL,
      breed VARCHAR(255) DEFAULT 'Unknown',
      age INT DEFAULT 0,
      description TEXT,
      Image LONGTEXT,
      user_id INT,
      status VARCHAR(50) DEFAULT 'available'
    );
  `;

  db.query(createUsersTable, (err) => {
    if (err) console.error("Error creating users table:", err);
  });

  db.query(createPetsTable, (err) => {
    if (err) console.error("Error creating pets table:", err);
  });
});

/* ===============================
   4. ROUTES
================================ */

// Health check
app.get("/", (req, res) => {
  res.send("Server is Online");
});

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      return res.json({ message: "Success" });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
app.post("/api/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [req.body.email], async (err, data) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (data.length > 0) {
      const match = await bcrypt.compare(
        req.body.password,
        data[0].password
      );

      if (match) {
        return res.json({ message: "Success", user: data[0] });
      }

      return res.status(401).json({ message: "Fail", error: "Wrong password" });
    }

    return res.status(404).json({ message: "Fail", error: "User not found" });
  });
});

// ADD PET
app.post("/api/add-pet", (req, res) => {
  const sql = `
    INSERT INTO pets
    (name, species, breed, age, description, Image, user_id, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'available')
  `;

  const values = [
    req.body.name,
    req.body.species,
    req.body.breed || "Unknown",
    req.body.age || 0,
    req.body.description || "No description",
    req.body.image,
    req.body.user_id
  ];

  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    return res.json({ message: "Success", id: data.insertId });
  });
});

// GET PETS
app.get("/api/pets", (req, res) => {
  db.query("SELECT * FROM pets ORDER BY id DESC", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

/* ===============================
   5. SERVER START (RAILWAY SAFE)
================================ */
const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
