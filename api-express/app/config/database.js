const mongoose = require('mongoose')
mongoose.Promise = global.Promise

require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL

//conexão com o mongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conexão com o MongoDB estabelecida");
    } catch (error) {
        console.error("Erro ao conectar com o MongoDB", error);
        process.exit(1);
    }
};

module.exports = connectMongoDB;