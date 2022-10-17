const mongoose = require('mongoose')
const config = require('config')
const MONGO_URI = config.get("MONGO_URI")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`Mongo DB connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB