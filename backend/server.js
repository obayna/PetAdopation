const express = require("express");
const mysql = require("mysql2"); 
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config(); 

const app = express();

// --- 1. CORS CONFIGURATION (FIXED) ---
// This must be placed BEFORE any routes or other middleware
app.use(cors({
    origin: "*", // Allows all origins, you can change this to your specific frontend URL later
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// This specifically handles the "Preflight" OPTIONS request that was failing with a 404
app.options('*', cors()); 

// --- 2. BODY PARSING MIDDLEWARE ---
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// --- 3. LIVE RAILWAY DATABASE CONNECTION ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to Railway MySQL database!");

    // --- AUTO-CREATE TABLES SECTION ---
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );`;

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
    );`;

    db.query(createUsersTable, (err) => {
        if (err) console.error("Error creating users table:", err);
        else console.log("Users table is ready!");
    });

    db.query(createPetsTable, (err) => {
        if (err) console.error("Error creating pets table:", err);
        else console.log("Pets table is ready!");
    });
});

// --- 4. ROUTES ---

// SIGNUP ROUTE
app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const sql = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hashedPassword];
        
        db.query(sql, [values], (err, data) => {
            if(err) {
                console.error("Signup DB Error:", err.sqlMessage);
                return res.status(500).json({ error: err.sqlMessage });
            }
            return res.json({ message: "Success", data });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error during hashing" });
    }
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ?";
    db.query(sql, [req.body.email], async (err, data) => {
        if(err) return res.status(500).json({ error: "Database error" });
        if(data.length > 0) {
            const match = await bcrypt.compare(req.body.password, data[0].password);
            if(match) {
                return res.json({ message: "Success", user: data[0] });
            } else {
                return res.json({ message: "Fail", error: "Wrong password" });
            }
        } else {
            return res.json({ message: "Fail", error: "User not found" });
        }
    });
});

// ADD PET ROUTE
app.post("/add-pet", (req, res) => {
    const sql = "INSERT INTO pets (name, species, breed, age, description, Image, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'available')";
    const values = [
        req.body.name,          
        req.body.species,       
        req.body.breed || "Unknown", 
        req.body.age || 0, 
        req.body.description || "No description provided",
        req.body.image,         
        req.body.user_id 
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("MySQL Error:", err.sqlMessage);
            return res.status(500).json({ error: err.sqlMessage });
        }
        return res.json({ message: "Success", id: data.insertId });
    });
});

// GET ALL PETS ROUTE
app.get("/pets", (req, res) => {
    const sql = "SELECT * FROM pets"; 
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// ADOPT PET ROUTE (UPDATE)
app.put("/adopt-pet/:id", (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE pets SET status = 'adopted' WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Pet successfully adopted!" });
    });
});

// DELETE PET ROUTE
app.delete("/pets/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM pets WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Listing deleted", data });
    });
});

// --- 5. SERVER START ---
const PORT = process.env.PORT || 8083; 

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});