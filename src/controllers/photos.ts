import { photosModel } from "../models/Photos";
import { albumsModel } from "../models/Albums";

require("dotenv").config();
const request = require('request');

const RemoveDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
    }, []);
};

export const loadFotos = async (req, res) => {
    try {

        await request(process.env.PHOTO_URL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const JsonPhoto = JSON.parse(body);
                JsonPhoto.map((item) => { item.owner = req.user.login });
                photosModel.insertMany(JsonPhoto);

                const jsonAlbom = RemoveDuplicates(JsonPhoto, "albumId")
                jsonAlbom.map((item) => { item.title = item.albumId })

                albumsModel.insertMany(jsonAlbom);
                return res.send(JsonPhoto)
            }
        })
    } catch (err) {
        res.status(400).json({
            error: "load foto error"
        })
    }
};

export const getFoto = async (req, res) => {
    try {

        const { ownerid, page, maxcount } = req.body;

        if (ownerid) {
            const resultSort = await photosModel.find({ owner: ownerid })
            return res.status(200).json(resultSort.map((item) => item.url));
        }

        const resultSort = await photosModel.find().skip(page * 20).limit(maxcount);
        return res.status(200).json(resultSort);

    } catch (err) {
        res.status(400).json({
            error: "get foto error"
        })
    }
};

export const deleteFoto = async (req, res) => {
    try {

        const { photoid } = req.body;
        const photoidArr = photoid.split(",");
        const resultSort = await photosModel.deleteMany({ id: { $in: photoidArr } });


        return res.status(200).json(resultSort);

    } catch (err) {
        res.status(400).json({
            error: "delete foto error"
        })
    }
};

