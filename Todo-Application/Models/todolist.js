const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true }); // Corrected option for timestamps

const LIST = mongoose.model("list", listSchema);

module.exports = LIST;
