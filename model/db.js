const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Database connection successful")
});

mongoose.connection.on("error", (e) => {
    console.log(`Error: ${e.message}`)
    process.exit(1)
});

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connection to DB terminated')
        process.exit(1)
    })
});

module.exports = db