const {Schema, model} = require ("mongoose");

const schemaAlbums = new Schema({
    albumId: { type: Number, required: true },
    title: { type: String },
    owner: { type: String },
  });

export  const albumsModel = model('Alboms', schemaAlbums);