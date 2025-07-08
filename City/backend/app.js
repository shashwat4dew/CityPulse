require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");

app.use(express.json());

// app.use(cors())

app.use(cors({
  origin: 'https://city-pulse-ijpl-r7k597ain-shashwat-dewangans-projects.vercel.app/',
  credentials: true
}));

app.use("/api", mainRouter);

app.use("/uploads", express.static("uploads"));


const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

