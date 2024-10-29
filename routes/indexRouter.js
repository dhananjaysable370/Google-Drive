import { Router } from "express";

const indexRoute = Router();

indexRoute.get('/home', (req, res) => {
    res.render('home.ejs');
})


export default indexRoute;