import express from 'express'
import { createUser, loginUser } from '../controllers/user.controller.js';
import { body } from 'express-validator';

const router = express.Router()

// Register user
router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 })
    , createUser);


// Login user
router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 })
    , loginUser);

export default router;