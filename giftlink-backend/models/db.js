require('dotenv').config();
const mongoose = require('mongoose');

let dbInstance = null;
const dbName = "/giftdb";

async function connectToDatabase() {
    // If the connection is already established, use the existing instance
    if (dbInstance) {
        return dbInstance;
    }

    try {
        // Construct the MongoDB connection URI
        const dbURI = `${process.env.MONGO_URL}${dbName}`;
        console.log('dburi am hast:'+ dbURI)

        // Connect to MongoDB
        await mongoose.connect(dbURI);

        console.log('Connected to MongoDB successfully');

        // Store the connection instance in dbInstance
        dbInstance = mongoose.connection;

        // Return the database instance
        return dbInstance;

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectToDatabase;
