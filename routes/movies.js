var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity');
const { route } = require('.');


router.get('/add-movie', (req, res, next) => {

    Celebrity.find()
    .then((celebrities) => {
        res.render('movies/new-movie.hbs', {celebrities})//an array with a key of celebrities and a value of celebrities
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })

   
})

router.post('/add-movie', (req, res, next) => {
    
    let newMovie = req.body

    Movie.create(newMovie)
    .then((newMovie) => {
        console.log("Created movie ==>", newMovie)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
  
})

router.get('/', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        
        res.render('movies/movies.hbs', {movies}) //render the movies

    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/details/:movieId', (req, res, next) =>{
    Movie.findById(req.params.movieId)
    .populate('cast')
    .then((movie) => {
        console.log("Found movie ==>", movie)
        res.render('movies/movie-details.hbs', movie)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

module.exports = router;

//router.get('/details/:movieId') - no need to write out movies/details b/c we know that we are in the movies section
//Movie.find() finds all the movies in the database
//req.body is an object; instead of destructuring out from this object we're going to use .create which expects an object
  // console.log(req.body)//validate method to see how the button, Add movie, works in the console