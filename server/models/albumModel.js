const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    imageURL: {
        type: String,
        required: true,
    },
    },
    { timestamps: true }
);

const albumCollection =  mongoose.model("albums", albumSchema);

module.exports = albumCollection;