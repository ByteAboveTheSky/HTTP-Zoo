const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + '/../.env'});

const errTypes = require("../models/errTypes");
const horses = require("../models/horses");

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
        const type1xx = await errTypes.findOne({description: "1xx: Information"});
        const type2xx = await errTypes.findOne({description: "2xx: Successful"});
        const type3xx = await errTypes.findOne({description: "3xx: Redirection"});
        const type4xx = await errTypes.findOne({description: "4xx: Client Error"});
        const type5xx = await errTypes.findOne({description: "5xx: Server Error"});

        await horses.updateMany(
            {code:{$gte:100, $lt:200}},
            {$set: {type_id: type1xx._id }}
        )
        await horses.updateMany(
            {code:{$gte:200, $lt:300}},
            {$set: {type_id: type2xx._id }}
        )
        await horses.updateMany(
            {code:{$gte:300, $lt:400}},
            {$set: {type_id: type3xx._id }}
        )
        await horses.updateMany(
            {code:{$gte:400, $lt:500}},
            {$set: {type_id: type4xx._id }}
        )
        await horses.updateMany(
            {code:{$gte:500, $lt:600}},
            {$set: {type_id: type5xx._id }}
        )

        console.log("🐎 Связь установлена!");
        process.exit();
    }catch (err){
        console.error("❌ Ошибка во время выполнения:", err.message);
        process.exit(1);
    }
}