const mongoose = require("mongoose");

const errTypes = new mongoose.Schema({
    description:String,
    code:Number
    })

module.exports = mongoose.model("errTypes", errTypes, "errTypes");