const mongoose = require("mongoose");

async function connecttoMongoose(url){
    mongoose.connect(url);
}

module.exports = {
    connecttoMongoose,
}