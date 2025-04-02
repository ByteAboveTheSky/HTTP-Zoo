const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + '/../.env'});

const errTypes = require("../models/errTypes");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(run)
    .catch(err => {
        console.error("Ошибка подключения:", err.message);
        process.exit(1);
    });

async function run(){
    try{

        await errTypes.updateOne(
            {description: "1xx: Information"},
            {$set: {code: 100 }}
        )
        await errTypes.updateOne(
            {description: "2xx: Successful"},
            {$set: {code: 200 }}
        )
        await errTypes.updateOne(
            {description: "3xx: Redirection"},
            {$set: {code: 300 }}
        )
        await errTypes.updateOne(
            {description: "4xx: Client Error"},
            {$set: {code: 400 }}
        )
        await errTypes.updateOne(
            {description: "5xx: Server Error"},
            {$set: {code: 500 }}
        )

        console.log("🐎 Связь установлена!");
        process.exit();
    }catch (err){
        console.error("❌ Ошибка во время выполнения:", err.message);
        process.exit(1);
    }
}