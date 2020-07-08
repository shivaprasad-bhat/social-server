const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const colors = require('colors');
var cors = require('cors');
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

//Database Connection function call
connectDB();

//Cors Error from react? Fix is this
app.use(cors());
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
