require("dotenv").config();
const axios = require('axios').default;
const request = require('request');

request(process.env.PHOTO_URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body)
        console.log(info)
    }
})