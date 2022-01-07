const { Schema, model} = require ("mongoose");

const schemaAlboms = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
  });

export  const albomsModel = model('Alboms', schemaAlboms);