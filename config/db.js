const mongoose = require('mongoose');

/**
 * Function that creates a connection with database connection
 * @source Mongodb Atlas
 * @author Shivaprasad
 */
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log(`Mongodb Connected: ${conn.connection.host}`.cyan.underline);
};

module.exports = connectDB;
