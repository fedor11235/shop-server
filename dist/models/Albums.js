"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumsModel = void 0;
const { Schema, model } = require("mongoose");
const schemaAlbums = new Schema({
    albumId: { type: Number, required: true },
    title: { type: String },
    owner: { type: String },
});
exports.albumsModel = model('Alboms', schemaAlbums);
//# sourceMappingURL=Albums.js.map