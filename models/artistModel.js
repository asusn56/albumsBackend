const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    formedIn: {
        type: Date,
        required: false
    },
    // albums: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Album'
    // }],

})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;