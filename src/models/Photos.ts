const { Schema, model} = require ("mongoose");

const schemaPhotos = new Schema({
    albumId: { type: Number, required: true, ref: 'Alboms' }, //ссылка на колекцию альбомов
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl:{ type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'Users' }, //ссылка на пользователя
  });

export  const photosModel = model('Photos', schemaPhotos);