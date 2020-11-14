const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express()

// conectando com mongoDB(banco de dados MongoDB Atlas com user e senha[user:pass] e nome do banco[oministack]) 
mongoose.connect('mongodb+srv://vandsonfalcao:32235090@cluster0-lyngu.gcp.mongodb.net/NashPlayer?retryWrites=true&w=majority', {
    useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")))
app.use("/assets", express.static(path.resolve(__dirname, "assets")))
app.use("/cover", express.static(path.resolve(__dirname, "tmp", "cover")))
app.use(routes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => { console.log("Server is running...") });