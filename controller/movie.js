// const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");

const movieModel = require("../model/movie.js")

exports.showIndex = (req,res) =>{
    res.send("running node api")
}
exports.showmovie = async (req,res) => {
    let data = await movieModel.find({
        "$or":[
            {movieCode:{$regex:req.params.key}},
            {title:{$regex:req.params.key}}
        ]
    })

    res.send(data)
    // .then(result => {
    //     res.send(result)
    // })
    // .catch(err => {
    //     res.send(err)
    // })
}


exports.addMovie = async (req,res) =>{
    const post = new movieModel({
        title:req.body.title,
        movie_id: req.body.movie_id,
        movieCode: req.body.movieCode,
        director: req.body.director,
        release_date: req.body.release_date,
        producer: req.body.producer,
        actors: req.body.actors,
        audio_language: req.body.audio_language
       
    })

    try {
        const movieSchema = new Joi.object({
            title: Joi.string().min(1).required(),
            movie_id: Joi.string(),
            movieCode:Joi.string().min(1).required(),
            director: Joi.string().min(3).required(),
            release_date:Joi.date().required(),
            producer: Joi.string().min(3).required(),
            audio_language: Joi.array().min(1).required(),
            actors: Joi.array().min(1).required()
        })
        const {error} = await movieSchema.validateAsync(req.body)
        if(error){
            res.status(400).send(error.details[0].message)
            return;
        } else {
            post.save()
            .then(data => {res.send(data)})
            .catch(err => {res.send(err)})
        }
    } catch (error) {
        res.status(500).send(error)
    }

    
}

exports.updateMovie = (req,res) =>{
    movieModel.findById(req.params.id , (err,movie)=>{
        if(err)
        res.send(err)
        movie.title = req.body.title ? req.body.title : movie.title
        movie.actors = req.body.actors ? req.body.actors : movie.actors
        movie.director = req.body.director ? req.body.director : movie.director
        movie.producer = req.body.producer ? req.body.producer : movie.producer
        
       
          movie.save((err) => {
            if(err)
            res.send(err)
            res.json({
                message: 'movie updated successfully',
                data: movie
            })
        })
    })
}

exports.deletemovie = (req,res) =>{
    movieModel.deleteOne({

        
        _id:req.params.id
    }, (err) =>{
        if(err)
        res.send(err)

        res.json({
            status : "Success",
            message : `successfully deleted the movie with Id: ${req.params.id}`
        })
    })
}




