const express = require('express');
const app = express();

app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
})