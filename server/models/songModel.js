const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    imageURL: {
        type: String,
        required: true,
    },
    songUrl: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    artist: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
        require: true,
    }
    },
    { timestamps: true }
);

const songCollection = mongoose.model("songs", SongSchema);

module.exports = songCollection;