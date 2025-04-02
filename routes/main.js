//main.js
const express = require("express");
const horses = require("../models/horses")
const errTypes = require("../models/errTypes")
const router = express.Router();

async function getErrors(allTypes){

    let errorsArr =[];
    let readyObj = {};

    for(const typeErr of allTypes){

        const horseObj = await horses.find({type_id:typeErr._id}).sort({code:1})

        for(const findCode of horseObj){
            errorsArr.push({title:findCode.title, code:findCode.code, image:findCode.image })
        }

        readyObj[typeErr.description]=errorsArr;
        errorsArr=[];

    }

    return readyObj
}

router.get("/", async (req, res) => {

    const allTypes = await errTypes.find().sort({description: 1});
    const readyObj = await getErrors(allTypes);

    res.render('main_temp', { readyObj});

})

router.get("/:id(\\d{3})", async (req, res) => {

    const allTypes = await errTypes.find({code:req.params.id });

    if(allTypes.length === 0){
        res.status(404).send("Page not found")
        return
    }

    const readyObj = await getErrors(allTypes);

    res.render('main_temp', { readyObj});

})

router.get("/code/:id(\\d{3})", async (req, res) => {
    const codeErr = await horses.findOne({code:req.params.id });

    if(!codeErr){
        console.log(codeErr)
        res.status(404).send("Page not found")
        return
    }
    res.render('img_temp', {codeErr});
})


router.all("*", (req, res) => {
    res.status(404).send(`Route ${req.originalUrl} not found`);
});

module.exports = router;