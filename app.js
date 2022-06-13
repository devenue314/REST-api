const express = require('express');
const app = express();
const routes = require('./router/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const post = require('./router/post');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB, () => {
    console.log('successfully connected to DB'); 
})

app.get('/', (req, res)=> {
    res.send('root folder')
});

app.use(express.json());
app.use('/api/user', routes);
app.use('/post', post);

app.listen('8080', ()=> {
    console.log('server is running on port 8080')}
);
