import express from 'express'
import { createUser } from '../controllers/user.controller.js';
import { body } from 'express-validator';

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 })
    , createUser);


export default router;