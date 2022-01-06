const { Schema, model} = require ("mongoose");


const schemaUser = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    registerDate: String
  });

const schemaPhotos = new Schema({
    albumId: { type: Number, required: true }, //ссылка на колекцию альбомов
    title: String,
    url: String,
    thumbnailUrl:String,
    owner: String, //ссылка на пользователя
  });

const albomPhotos = new Schema({
    title: String,
    owner: String,
  });
  

export  const userModel = model('User', schemaUser);
export  const photoModel = model('Photo', schemaPhotos);
export  const albomModel = model('Albom', albomPhotos);




  
  
