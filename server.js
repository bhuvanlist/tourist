const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root@123', // Replace with your MySQL password
    database: 'tourist_finder'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});


// API to fetch places by city and category
const express = require('express');
const app = express();
app.use(express.json());

app.get('/places', (req, res) => {
    const { city, category } = req.query;

    // Fetch city ID
    const query = `
        SELECT places.name, places.latitude, places.longitude
        FROM places
        JOIN cities ON cities.id = places.city_id
        WHERE cities.name = ? AND places.category = ?
    `;

    db.query(query, [city, category], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
