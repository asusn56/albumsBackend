const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
    },

    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
    },
    trackList: [{
        trackNumber: { type: Number, required: true },
        title: { type: String, required: true },
        duration: { type: String }
    }],
    albumType: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlbumType",
        required: true,
    }],
    albumFormat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlbumFormat",
        required: true,
    }],
    releaseDate: {
        type: Date,
        required: true
    },
    coverImageUrl: {
        type: String
    },
    description: {
        type: String
    },
    // price: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },
    // stock: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },
    albumAddedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Album", albumSchema);