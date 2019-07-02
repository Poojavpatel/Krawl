const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const router = express.Router();

// Function to scrape data
let getData = (html) => {
    data=[];
    const $ = cheerio.load(html);
    $('ul.repo-list').each((i,ele) => {
        data.push({
            repo_item : $(ele)
        });
    });
    console.log("data",data);
}




//GET requests 
// url 'localhost:5000/genres/'
router.get('/',async (req ,res) => {
    axios.get('https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories')
    .then(response => {
        // console.log(response.data);
        console.log("response obtained");
        getData(response.data);
    })
    .catch(error => {
        console.log(error);
    });
    res.send("hello");
});

{/* <ul class="repo-list">
    <li class="repo-list-item"></li>
</ul> */}

module.exports = router ;