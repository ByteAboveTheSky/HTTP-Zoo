const mongoose = require("mongoose");
const errTypes = require("../models/errTypes")
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('✅ Подключено к MongoDB');

        const types = [
            {description:"1xx: Information"},
            {description:"2xx: Successful"},
            {description:"3xx: Redirection"},
            {description:"4xx: Client Error"},
            {description:"5xx: Server Error"},
        ];

        await errTypes.insertMany(types);
        console.log('✅ Данные успешно добавлены!');
        process.exit(); // завершить выполнение скрипта
    })
    .catch(err => {
        console.error('❌ Ошибка:', err.message);
        process.exit(1);
    });