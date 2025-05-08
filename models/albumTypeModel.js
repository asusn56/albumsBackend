const mongoose = require('mongoose');

const albumTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Disc', 'Vinyl', 'DVD', 'Cassette'],
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('AlbumType', albumTypeSchema);