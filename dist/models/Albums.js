"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albomsModel = void 0;
const { Schema, model } = require("mongoose");
const schemaAlboms = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
});
exports.albomsModel = model('Alboms', schemaAlboms);
//# sourceMappingURL=Albums.js.map