const expres = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')

dotenv.config()
const app = expres();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 4000;


// test api

app.get('/api', (req, res) => {
    res.send('Hello wrold')
})


// admin register

app.post('/api/admin/register', (req, res) => {
    const {firstName, lastName, email, phone, whatsapp, github, skype, english, bangla, hindi } = req.body
    // console.log(req.body);
    res.send(req.body)
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})