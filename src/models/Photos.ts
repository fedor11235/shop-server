const { Schema, model} = require ("mongoose");

const schemaPhotos = new Schema({
    albumId: { type: Number, required: true, ref: 'Alboms' },
    id: { type: Number, required: true},
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl:{ type: String, required: true },
    owner: { type: String, required: true, ref: 'Users' },
  });

export  const photosModel = model('Photos', schemaPhotos);