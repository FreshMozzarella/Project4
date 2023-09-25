const mongoose = require('mongoose');
const Schema = mongoose.Schema

const birdSchema = new Schema ({
    speciesName: String,
    scientificName: String,
    family: String,
    weight: {
        min: Number,
        max: Number
    },
    wingspan: Number,
    distinctiveFeatures: String,
    bestTimeToSpot: String,
    conservationStatus: String,
    diet: String,
    imageURL: String, // S3 URL for the image
    audioURL: String 
},{timestamps: true})

module.exports = mongoose.model('Bird', birdSchema);