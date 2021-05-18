const mongoose = require('mongoose')
const UserModel = new mongoose.Schema({
    username:String,
    password:String,
    list:[]
})
module.exports = mongoose.model('User', UserModel);