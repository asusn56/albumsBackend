const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
         required: true
    },
    rating: {
        type: Number,
        required: false,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);