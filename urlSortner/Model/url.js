const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    sortId:{
        type:String,
        require:true,
        uniquire:true
    },
    redirectId:{
        type:String,
        require:true
    },
    visits:[
        {timestamps:{type:Number}}
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})


const URL = mongoose.model("url",urlSchema);

module.exports = URL;