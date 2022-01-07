"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albomsModel = exports.photosModel = exports.usersModel = void 0;
const { Schema, model } = require("mongoose");
const schemaUsers = new Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now },
    token: String
});
const schemaPhotos = new Schema({
    albumId: { type: Number, required: true, ref: 'Alboms' },
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'Users' }, //ссылка на пользователя
});
const schemaAlboms = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
});
exports.usersModel = model('Users', schemaUsers);
exports.photosModel = model('Photos', schemaPhotos);
exports.albomsModel = model('Alboms', schemaAlboms);
// default:""
//# sourceMappingURL=Users.js.map