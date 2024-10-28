const express = require('express');
const dotenv = require('dotenv')
const dbConnection = require('./config/db');
const router = require('./routes/user.routes');
dotenv.config()
const app = express();

dbConnection(process.env.MONGO_URI);

app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/user',router)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})