/* jshint esversion:6 */
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const scrape = require('./routes/scrape.js');
const app = express();

app.use(express.json());

// connecting to mongodb
const mongouri = 'mongodb://pooja:poojakrawl1@ds245927.mlab.com:45927/krawl';
mongoose.connect(mongouri)
    .then( () => console.log('Connected to MongoDB'))
    .catch( err => console.log('Error while connecting to MongoDB', err));

// Homepage route
app.get('/' ,(req,res) => {
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

// use routes
app.use('/scrape' , scrape);

// Starting server on port
port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));