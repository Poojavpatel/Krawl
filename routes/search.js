const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const router = express.Router();


//POST request to search form 
// url 'localhost:5000/search/'
router.post('/',async (req ,res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name}} , {new:true});
});


module.exports = router ;