const artistModel = require("../models/artistModel");

exports.getAll = async(req, res) =>{
    const options = {
        // // sort returned documents in ascending order
        // sort: { createdAt: 0 },
        // Include only the following
        // projection : {}
    };
    const cursor = await artistModel.find(options);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
};

exports.save = async(req, res) => {
    const newArtist = artistModel({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
    });
    try {
        const savedArtist = await newArtist.save();
        res.status(200).send({ artist: savedArtist });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

exports.getOne = async (req, res) => {
    const filter = { _id: req.params.id };
    const cursor = await artistModel.findOne(filter);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
};

exports.update = async (req, res) => {
    const filter = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const result = await artistModel.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
            },
            options
      );
        res.status(200).send({ artist: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

exports.delete = async (req, res) => {
    const filter = { _id: req.params.id };
    const result = await artistModel.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(400).send({ success: false, msg: "Data Not Found" });
    }
};
