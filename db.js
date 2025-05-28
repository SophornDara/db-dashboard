const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aabb11111111',
    database: 'shop',
    port: 3307 // use your correct port
});

// Test DB Connection
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Successfully connected to the database as ID', db.threadId);
});