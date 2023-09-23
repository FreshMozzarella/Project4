const express = require('express')
const Bird = require('../models/bird')

module.exports = {
    create,
     findAll,
     findOne,
}

async function create(req, res, next){
    try {
        res.json(await Bird.create(req.body))
    } catch (error) {
        res.status(400).json(error)    }
}

async function findAll(req, res, next){
    try {
        res.json(await Bird.find({}));
    } catch (error) {
        
    }
}

async function findOne(req, res, next){
    try {
        res.json(await Bird.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
}


