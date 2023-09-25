const express = require('express')
const Animal = require('../models/animal')

module.exports = {
    create,
     findAll,
     findOne,
}

async function create(req, res, next){
    try {
        res.json(await Animal.create(req.body))
    } catch (error) {
        res.status(400).json(error)    }
}

async function findAll(req, res, next){
    try {
        res.json(await Animal.find({}));
    } catch (error) {
        
    }
}

async function findOne(req, res, next){
    try {
        res.json(await Animal.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
}