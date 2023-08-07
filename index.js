require('dotenv').config() 

const path = require("path");
const express = require("express")
const multer = require('multer')
const fs = require('fs')


const app = express();
const PORT = process.config.PORT || 8000



app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));

//app Router

const mainRouter = require('./routes/index')
app.use('/' , mainRouter);




app.listen(PORT , () => console.log(`Server on ${PORT} running`))