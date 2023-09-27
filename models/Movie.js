//movie model

const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast:[{type: Schema.Types.ObjectId, ref: 'Celebrity'}]//1:1 document relationship; populate on the specific lookup. There could also be 1:many like with the posts in the crud-with-populate lab earlier. If this was one cast member, it'd be the one cast object: {type: Schame.Types.ObjectId, ref = 'Celebrity}
    },
    {
        timestamps: true
    })

module.exports = model('Movie', movieSchema)

