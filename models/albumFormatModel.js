const mongoose = require('mongoose');

const albumFormatSchema = new mongoose.Schema({
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true
    },
    albumType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlbumType",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("AlbumFormat", albumFormatSchema);