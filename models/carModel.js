const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model:
    {
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    registration: {
            type: String,
            required: true
        },
    owner: {
        type: String,
        required: true
  
    }
}, {timestamps:true})

module.exports = mongoose.model('car', carSchema)