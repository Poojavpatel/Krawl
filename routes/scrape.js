const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const {Repo} = require('../models/repo');
const router = express.Router();

// Function to scrape data
// let getData = (html) => {
//     data=[];
//     const $ = cheerio.load(html);
//     $('li.repo-list-item').each((i,ele) => {
//         let repo_name = $(ele).find('h3 a').text().trim().split("/");
//         data.push({
//             repo_title : repo_name[1],
//             repo_author :repo_name[0],
//             repo_des:$(ele).find('p.mb-2').text().trim().replace("\n",""),
//             repo_language:$(ele).find('span.repo-language-color + span').text().trim().replace("\n",""),
//             repo_updatetime:$(ele).find('p.mb-0').text().trim().replace("\n",""),
//             repo_link:$(ele).find('h3 a').attr('href')
//         });
//     });
//     // console.log("data",data);
//     for(i=0;i<3;i++){
//         axios.get(`/search?o=desc&p=${i}&q=nodejs&s=updated&type=Repositories`)
//         .then( response => {
//             data=[];
//             const $ = cheerio.load(response.data);
//             $('li.repo-list-item').each((i,ele) => {
//                 let repo_name = $(ele).find('h3 a').text().trim().split("/");
//                 data.push({
//                     repo_title : repo_name[1],
//                     repo_author :repo_name[0],
//                     repo_des:$(ele).find('p.mb-2').text().trim().replace("\n",""),
//                     repo_language:$(ele).find('span.repo-language-color + span').text().trim().replace("\n",""),
//                     repo_updatetime:$(ele).find('p.mb-0').text().trim().replace("\n",""),
//                     repo_link:$(ele).find('h3 a').attr('href')
//                 });
//             });
//             console.log(data);
//             })
//         .catch(err => console.log("err",err));
//     }
// }

// Function to Post data to mlab
let postData = (html) => {
    const $ = cheerio.load(html);
    $('li.repo-list-item').each((i,ele) => {
        let repo_name = $(ele).find('h3 a').text().trim().split("/");
        const repo = new Repo({
            repo_title : repo_name[1],
            repo_author :repo_name[0],
            repo_des:$(ele).find('p.mb-2').text().trim().replace("\n",""),
            repo_language:$(ele).find('span.repo-language-color + span').text().trim().replace("\n",""),
            repo_updatetime:$(ele).find('p.mb-0').text().trim().replace("\n",""),
            repo_link:$(ele).find('h3 a').attr('href')
        });
        repo.save()
        .then(resultrepo => {
            // console.log("resultrepo", resultrepo);
        })
        .catch((err) => {console.log(err);});
    });
    for(i=0;i<3;i++){
        axios.get(`/search?o=desc&p=${i}&q=nodejs&s=updated&type=Repositories`)
        .then( response => {
            data=[];
            const $ = cheerio.load(response.data);
            $('li.repo-list-item').each((i,ele) => {
                let repo_name = $(ele).find('h3 a').text().trim().split("/");
                data.push({
                    repo_title : repo_name[1],
                    repo_author :repo_name[0],
                    repo_des:$(ele).find('p.mb-2').text().trim().replace("\n",""),
                    repo_language:$(ele).find('span.repo-language-color + span').text().trim().replace("\n",""),
                    repo_updatetime:$(ele).find('p.mb-0').text().trim().replace("\n",""),
                    repo_link:$(ele).find('h3 a').attr('href')
                });
            });
            // console.log(data);
            })
        .catch(err => console.log("err",err));
    }
}


//GET requests 
// url 'localhost:5000/genres/'
router.get('/',async (req ,res) => {
    axios.get('https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories')
    .then(response => {
        // console.log("response obtained");
        // getData(response.data);
        postData(response.data);
    })
    .catch(error => {
        console.log(error);
    });
    res.render(__dirname+'/../static/update.html',{displaydata:"scraped and posted to mlab database"});
});

module.exports = router ;