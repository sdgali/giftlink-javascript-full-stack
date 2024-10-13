require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;
const dbName = '/giftdb';
const collectionName = 'gifts';
const filename = `${__dirname}/gifts.json`;

// Read data from JSON file
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

mongoose.connect(url + dbName)
    .then(() => console.log("Connected successfully"))
    .catch(err => console.error("Error:", err));

// Define Schema
const giftSchema = new mongoose.Schema({
    id: String,
    name: String,
    category: String,
    condition: String,
    posted_by: String,
    zipcode: String,
    date_added: Number,
    age_days: Number,
    age_years: Number,
    description: String,
    image: String
});

// Create model
const GiftModel = mongoose.model(collectionName, giftSchema);

// Function to insert gifts
async function createGifts() {
    try {
        // Check for existing gifts
        for (const gift of data) {
            const existingGift = await GiftModel.findOne({ id: gift.id }); // Check for a gift with the same ID
            console.log(existingGift)

            if (!existingGift) {
                // If the gift does not exist, insert it
                await GiftModel.create(gift); // Use create to insert a single gift
                console.log(`Inserted gift with ID: ${gift.id}`);
            } else {
                console.log(`Gift with ID: ${gift.id} already exists.`);
            }
        }
    } catch (err) {
        console.error("Error inserting documents:", err);
    }
}

createGifts();
