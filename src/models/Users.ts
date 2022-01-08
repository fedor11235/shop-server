const { Schema, model} = require ("mongoose");

const schemaUsers = new Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now },
    token:String
  });
  

export  const usersModel = model('Users', schemaUsers);


  
  
