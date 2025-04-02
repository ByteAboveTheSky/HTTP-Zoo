const mongoose = require("mongoose");


const errHorsesModel = new mongoose.Schema({
    code: Number,
    title:String,
    description:String,
    image: String,
    example: String,
    type_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "errTypes"
    }
})


module.exports = mongoose.model("errHorses",errHorsesModel, "horses");