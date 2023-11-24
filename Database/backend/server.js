const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//require('dotenv').config

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ATLAS_URI= "mongodb+srv://ohjunsoo13:jeu5LDgM6J4vfWYZ@cluster0.chyhsl6.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(ATLAS_URI);
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

const statisticRouter = require('./routes/statistic');
const dataRouter = require('./routes/data');

app.use('/statistic', statisticRouter);
app.use('/data', dataRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});