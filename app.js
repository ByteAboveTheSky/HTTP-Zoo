//загружаем .env в  process.env
require('dotenv').config();

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT);
const morgan = require("morgan");

const mainPg = require("./routes/main");


app.use(morgan("dev"));
app.use(express.json()); //(to work with json body)
app.use(express.static('public'));
app.use( "/",mainPg);

app.set('view engine','ejs');

//для правильного парсинга строк и стабильной работы
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Success connecting MongoDB!');

    })
    .catch((err) => {
        console.error('❌ connecting error', err.message);
    });

// app.get("/test", (req,res) => {
//     res.send("yes");
// })

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
