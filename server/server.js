const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const artistRouter = require("./routers/artistRouter");
const albumRouter = require("./routers/albumRouter");
const songRouter = require("./routers/songRouter");

dotenv.config({path: "./config.env" });
const connect = require("./db/connection");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin : ["http://localhost:3000"],
        credentials: true, 
    })
);

// Users Routes
app.use("/api/users", userRouter);

// Artists Routes
app.use("/api/artists", artistRouter);

// Albums Routes
app.use("/api/albums", albumRouter);

// Songs Routes
app.use("/api/songs", songRouter);

// TEST main API
app.get("/", (req, res) =>{
    return res.json("Hello World");
});

const port = process.env.PORT || 8080;

connect.then((req, res) =>{
    app.listen(port, () => {
        console.log(`Server is runing on PORT: ${port}`);
    });
}).catch((err) =>{
    console.log(`DB has error: ${err}`);
});
 