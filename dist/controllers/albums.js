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
exports.changeAlbumTitle = exports.deleteAlbum = void 0;
const Albums_1 = require("../models/Albums");
const Photos_1 = require("../models/Photos");
const deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { albumid } = req.body;
        const albumidArr = albumid.split(",");
        const resultSort = yield Albums_1.albumsModel.deleteMany({ title: { $in: albumidArr } });
        yield Photos_1.photosModel.deleteMany({ albumId: { $in: albumidArr } });
        return res.status(200).json(resultSort);
    }
    catch (err) {
        res.status(400).json({
            error: "delete album error"
        });
    }
});
exports.deleteAlbum = deleteAlbum;
const changeAlbumTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { albumid, new_album_name } = req.body;
        const resultUpdate = yield Albums_1.albumsModel.updateOne({ albumId: albumid }, { $set: { title: new_album_name } });
        return res.status(200).json(resultUpdate);
    }
    catch (err) {
        res.status(400).json({
            error: "get foto error"
        });
    }
});
exports.changeAlbumTitle = changeAlbumTitle;
//# sourceMappingURL=albums.js.map