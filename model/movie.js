const mongoose = require("mongoose");
var uuid = require('node-uuid');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    movie_id:{
        type: String,
        default: uuid.v1(),
    },
     movieCode: {
        type: String,
        required: true,
    },
    release_date:{
        type: Date,
        required: true,
    },
    director:{
     type: String,
     required: true,
    },
    producer:{
        type: String,
        required: true,
    },
    actors:{
        type: Array,
        required: true,
    },
    audio_language:{
        type: Array,
        required: true,
    },
    // created_on:{
    //     type: Date,
    //    default:Date.now()
    // },
    // modified_on:{
    //     type: Date,
    //    default:Date.now()
    // }


},{
    timestamps:true
})

module.exports = mongoose.model("movie", movieSchema)