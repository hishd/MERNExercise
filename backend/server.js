const express = require('express')
const cors = require('cors')

const exerciseRouter = require("./routes/exercises")
const userRoutes = require("./routes/users")

const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected with mongoDB atlas')
})

app.use('/exercises', exerciseRouter)
app.use('/users', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on PORT : ${port}`)
})