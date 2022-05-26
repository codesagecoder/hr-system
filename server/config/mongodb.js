const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function connection() {
    const CONNECTION_URL = process.env.DB_URL || 'mongodb://localhost:27017/techGenius'
    try {
        var connection = await mongoose.connect(CONNECTION_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        console.info(('Connected to database!'));
        
        return connection
    } catch (e) {
        console.log("Error", e)
    }
}