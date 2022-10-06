const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://root:root@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com:27017'
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