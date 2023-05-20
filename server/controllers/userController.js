const userModel = require("../models/userModel");

const admin = require("../config/firebase.config");

exports.login = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ message: "Invalid token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(500).json({ message: "Un Authorize" });
        } else {
            // checking user email already exists or not
            const userExists = await userModel.findOne({
                user_id: decodeValue.user_id,
            });
            if (!userExists) {
                newUserData(decodeValue, req, res);
                // return res.send("Need to Create");
            } else {
                updateUserData(decodeValue, req, res);
                // return res.send("Need to Update");
            }
        }
    } catch (error) {
        return res.status(505).json({
            message: error,
        });
    }
};

exports.getUsers = async (req, res) => {
    const options = {
      // sort returned documents in ascending order
      //sort: { createdAt: 1 },
      // Include only the following
      // projection : {}
    };
    const cursor = await userModel.find(options);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
};

exports.updateRole = async (req, res) => {
    // console.log(req.body.data.role, req.params.userId);
    const filter = { _id: req.params.id };
    const role = req.body.data.role;
    const options = {
        upsert: true,
        new: true,
    };
  
    try {
        const result = await userModel.findOneAndUpdate(filter, { role: role }, options);
        res.status(200).send({ user: result });
    } catch (err) {
        res.status(400).send({ success: false, msg: err });
    }
};

exports.getUser = async (req, res) => {
    const filter = { _id: req.params.id };
    const userExists = await userModel.findOne({ _id: filter });
    if (!userExists)
        return res.status(400).send({ success: false, msg: "Invalid User ID" });
    if (userExists.favourites) {
        res.status(200).send({ success: true, data: userExists });
    } else {
        res.status(200).send({ success: false, data: null });
    }
};

exports.delete = async (req, res) => {
    const filter = { _id: req.params.id };
    const result = await userModel.deleteOne(filter);
    
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
    }
};

const newUserData = async (decodeValue, req, res) => {
    const newUser = new userModel({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verfied: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time,
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).send({ user: savedUser });
    } catch (err) {
        res.status(400).send({ success: false, msg: err });
    }
};

const updateUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };
    const options = {
        upsert: true,
        new: true,
    };

    try {
        const result = await userModel.findOneAndUpdate(
            filter, { auth_time: decodeValue.auth_time }, options
        );
        res.status(200).send({ user: result });
    } catch (err) {
        res.status(400).send({ success: false, msg: err });
    }
};
