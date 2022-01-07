const { Schema, model} = require ("mongoose");


const schemaUsers = new Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now },
    token:String
  });

const schemaPhotos = new Schema({
    albumId: { type: Number, required: true, ref: 'Alboms' }, //ссылка на колекцию альбомов
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl:{ type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'Users' }, //ссылка на пользователя
  });

const schemaAlboms = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
  });
  

export  const usersModel = model('Users', schemaUsers);
export  const photosModel = model('Photos', schemaPhotos);
export  const albomsModel = model('Alboms', schemaAlboms);
// default:""


  
  
