const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./config/dbconfig');
const apiRouter = require("./router/index");

const setUpAndStartServer = ()=>{
    const app = express();
    const PORT = process.env.PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRouter);
    app.listen(PORT, () => {
        connectToDatabase().then((data)=>console.log("hello")).catch((error)=>console.log("hii"));
        console.log(`Connected to MongoDB`);
        console.log(`Server is running on port ${PORT}`);
    });
}

setUpAndStartServer();