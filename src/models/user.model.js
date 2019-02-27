const mongoose = require('mongoose');
const MongooseTrigger = require('mongoose-trigger');

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true}, 
    password: {type:String, required:true},
    first_name: String,
    last_name: String,
    last_login: Date,
    temporary_password:String
},
{
    timestamps: true
});

const UserEvents = MongooseTrigger(UserSchema, { 
    events:{
        create:true
    }
});

UserEvents.on('create', data=> console.log(data, 2))

module.exports = mongoose.model('user', UserSchema)