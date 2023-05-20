const albumModel = require("../models/albumModel");

exports.getAll = async(req, res) =>{
    const options = {
        // // sort returned documents in ascending order
        // sort: { createdAt: 0 },
        // Include only the following
        // projection : {}
    };
    const cursor = await albumModel.find(options);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
};

exports.save = async(req, res) => {
    const newAlbum = albumModel({
        name: req.body.name,
        imageURL: req.body.imageURL,
    });
    try {
        const savedAlbum = await newAlbum.save();
        res.status(200).send({ album: savedAlbum });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

exports.getOne = async (req, res) => {
    const filter = { _id: req.params.id };
    const cursor = await albumModel.findOne(filter);
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
        const result = await albumModel.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
            },
            options
      );
        res.status(200).send({ album: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
};

exports.delete = async (req, res) => {
    const filter = { _id: req.params.id };
    const result = await albumModel.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(400).send({ success: false, msg: "Data Not Found" });
    }
};
