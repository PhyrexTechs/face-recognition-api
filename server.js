const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const image = require('./controllers/image');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db, bcrypt))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) =>{image.handleApiCall(req, res)})
app.listen(process.env.PORT, ()=> {
    console.log("app is running on port 3001");
})