import express from 'express'
import { createUser } from '../controllers/user.controller.js';

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', createUser);


export default router;