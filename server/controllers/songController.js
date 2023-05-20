const songModel = require("../models/songModel");

exports.getAll = async(req, res) =>{
    const options = {
        // sort returned documents in ascending order
        // sort: { createdAt: 1 },
        // Include only the following
        // projection : {}
    };

    const cursor = await songModel.find(options);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
};

exports.getOne = async (req, res) => {
    const filter = { _id: req.params.id };

    const cursor = await songModel.findOne(filter);
  
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
};

exports.save = async (req, res) => {
    const newSong = songModel({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
        lyrics: req.body.lyrics,
    });
    try {
        const savedSong = await newSong.save();
        res.status(200).send({ song: savedSong });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

exports.update = async (req, res) => {
    const filter = { _id: req.params.id};
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const result = await songModel.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songUrl: req.body.songUrl,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category,
                lyrics: req.body.lyrics,
            },
            options
        );
        res.status(200).send({ data: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

exports.delete = async (req, res) => {
    const filter = { _id: req.params.id };
    const result = await songModel.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(400).send({ success: false, msg: "Data Not Found" });
    }
};

exports.getFavouriteSong = async (req, res) => {
    const query = req.query.id;
    res.send(query);
};