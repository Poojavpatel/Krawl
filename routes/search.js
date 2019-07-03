const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Repo = require('../models/repo').Repo;
const router = express.Router();


//POST request to search form 
// url 'localhost:5000/search/'
router.post('/',async (req ,res) => {
    console.log(req.body);
    const query = req.body.searchinp;
    const resrepo = await Repo.find({repo_title:query});
    res.send(resrepo);
});

module.exports = router ;