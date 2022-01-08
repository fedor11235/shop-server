const {Schema, model} = require ("mongoose");

const schemaAlbums = new Schema({
    albumId: { type: Number, required: true },
    title: { type: String },
    owner: { type: String },
  });

export  const albumsModel = model('Albums', schemaAlbums);

// import {Schema, model} from "mongoose";

// interface Albums {
//   albumId: Number,
//   title: String ,
//   owner: String ,
// }


// const schemaAlbums = new Schema<Albums>({
//     albumId: { type: Number, required: true },
//     title: { type: String },
//     owner: { type: String },
//   });

// export  const albumsModel = model<Albums>('Alboms', schemaAlbums);