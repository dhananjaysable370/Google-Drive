import express from 'express';
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import router from './routes/user.routes.js';
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