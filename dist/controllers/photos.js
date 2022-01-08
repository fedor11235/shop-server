"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoto = exports.getFoto = exports.loadFotos = void 0;
const Photos_1 = require("../models/Photos");
const Albums_1 = require("../models/Albums");
require("dotenv").config();
const request = require('request');
const RemoveDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
    }, []);
};
const loadFotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield request(process.env.PHOTO_URL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const JsonPhoto = JSON.parse(body);
                JsonPhoto.map((item) => { item.owner = req.user.login; });
                // photosModel.insertMany(JsonPhoto);
                Photos_1.photosModel.insertMany(JsonPhoto, { "$ref": "users", "$id": "album" });
                const jsonAlbom = RemoveDuplicates(JsonPhoto, "albumId");
                jsonAlbom.map((item) => { item.title = item.albumId; });
                Albums_1.albumsModel.insertMany(jsonAlbom);
                return res.status(200).send(JsonPhoto);
            }
        });
    }
    catch (err) {
        res.status(400).json({
            error: "load foto error"
        });
    }
});
exports.loadFotos = loadFotos;
const getFoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerid, page, maxcount } = req.body;
        if (ownerid) {
            const resultSort = yield Photos_1.photosModel.find({ owner: ownerid });
            return res.status(200).json(resultSort.map((item) => item.url));
        }
        const resultSort = yield Photos_1.photosModel.find().skip(page * 20).limit(maxcount);
        return res.status(200).json(resultSort);
    }
    catch (err) {
        res.status(400).json({
            error: "get foto error"
        });
    }
});
exports.getFoto = getFoto;
const deleteFoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photoid } = req.body;
        const photoidArr = yield photoid.split(",");
        const resultSort = yield Photos_1.photosModel.deleteMany({ id: { $in: photoidArr } });
        return res.status(200).json(resultSort);
    }
    catch (err) {
        res.status(400).json({
            error: "delete foto error"
        });
    }
});
exports.deleteFoto = deleteFoto;
//# sourceMappingURL=photos.js.map