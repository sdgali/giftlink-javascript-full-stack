const connectToDatabase = require('./db');


(async () => {
    try {
        const db = await connectToDatabase();
        console.log('Database connection test successful!');
        // You can add further logic here if needed.
        process.exit(0); // Exit the process with success
    } catch (error) {
        console.error('Database connection test failed:', error);
        process.exit(1); // Exit the process with failure
    }
})();
