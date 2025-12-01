const express = require('express');

const app = express();


const db = require('./db');



const bodyParser = require('body-parser');

app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const usert = require('./routes/user');

const categoryrt = require('./routes/category');

const blogrt = require('./routes/blogs');

const PORT = process.env.PORT || 4000

const commentsrt = require('./routes/comment');

app.use('/user', usert);

app.use('/category',categoryrt);

app.use('/blogs',blogrt);

app.use('/comment',commentsrt);


app.listen(PORT, () => {
    console.log("server is live");
})