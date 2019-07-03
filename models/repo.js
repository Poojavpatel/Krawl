const mongoose = require('mongoose');
const express = require('express');

// Defining schema for repo
const repoSchema = mongoose.Schema({
    repo_title:{ type:String,required:true},
    repo_author :{ type:String},
    repo_des:{ type:String},
    repo_language:{ type:String},
    repo_updatetime:{ type:String},
    repo_link:{type:String}
});
const Repo = mongoose.model( 'Repo' , repoSchema);

module.exports.Repo=Repo;