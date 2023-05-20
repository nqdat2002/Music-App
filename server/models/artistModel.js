const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    imageURL: {
        type: String,
        required: true,
    },

    twitter: {
        type: String,
        required: true,
    },

    instagram: {
        type: String,
        required: true,
    },

    },
    { timestamps: true }
);

const artistCollection = mongoose.model("artists", artistSchema);
module.exports = artistCollection;