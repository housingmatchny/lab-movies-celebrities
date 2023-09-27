var express = require('express');
var router = express.Router();

const Celebrity = require('../models/Celebrity')
//importing celebrity model; must be capital to match how we declared the model in models>celebrity.js

router.get('/add-celebrity', (req, res, next) => {
    
    res.render('celebrities/new-celebrity.hbs')

})
//address for getting request: add-celebrity which we defined in layout
//response will be to render the new celebrity file

router.post('/add-celebrity', (req, res, next) => {

    let { name, occupation, catchPhrase } = req.body 

    Celebrity.findOne({
        name: name
    }) //server-level validation method 
    .then((foundCelebrity) => {
        if (foundCelebrity) {
res.render('celebrities/new-celebrity.hbs',{errorMessage: 'Celebrity already exists. Please try again.'})
        } else {
            Celebrity.create({
                name,
                occupation,
                catchPhrase
})
.then((createdCelebrity)=> {
    console.log("Created celebrity ==>", createdCelebrity)
    res.redirect('/celebrities/all-celebrities')
}) 

        }
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/all-celebrities', (req, res, next) => {
    
    Celebrity.find()//gives every celebrity in the collection
        .then((celebrities) => {
            console.log("found celebrities ==>", celebrities)
            res.render('celebrities/celebrities.hbs', {celebrities})
        })
        .catch((err) =>{
            console.log(err)
            next(err)
        })

})
//this router.get shows us something to test

//add a celebrity based on the inputs from our form
//deconstruct from the request body




module.exports = router;

/*router.post('/add-celebrity', (req, res, next) => {

let { name, occupation, catchPhrase } = req.body

Celebrity.findOne({
    name: name
})
.then((foundCelebrity) => {

    if (foundCelebrity) {
        res.render('celebrities/new-celebrity.hbs', {errorMessage: 'Celebrity already exists.  Try again'})
    } else {
        Celebrity.create({
            name,
            occupation,
            catchPhrase
        })
        .then((createdCelebrity) => {
            console.log("created celebrity ===>", createdCelebrity)
            res.redirect('/celebrities/all-celebrities')
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

})
.catch((err) => {
    console.log(err)
    next(err)
})

})
*/