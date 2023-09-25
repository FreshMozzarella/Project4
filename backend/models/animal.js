const mongoose = require('mongoose');
const Schema = mongoose.Schema

const animalSchema = new Schema ({
    
        name: String, // Common Name
        scientificName: String, // Scientific Name
        family: String, // Family
        averageWeightInPounds: Number, // average an adult weighs in pounds
        description: String, // Brief Description
        diet: String, // Diet
        habitat: String, // Preferred Habitat
        behavior: String, // Common Behavior
        conservationStatus: String, // Conservation Status
        bestTimeToSee: String, // Best time to spot
        location: [ // Areas within the park where the animal is typically found
          String,
        ],
        interestingFact: String, // An interesting fact about the animal
        imageURL: String, // URL to an image of the animal
}, {timestamps: true})

module.exports = mongoose.model('Animal', animalSchema);