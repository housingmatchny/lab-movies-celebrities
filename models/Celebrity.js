const { Schema, model } = require('mongoose'); //schema constructor, model method

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    },
    {
        timestamps: true
    })

module.exports = model('Celebrity', celebritySchema) //invoking the mongoose model method to export a model so that it can be imported elsewhere

//timestamps: when record was created and last updated
//this page sets up the Celebrity model and says that this is a Mongoose model