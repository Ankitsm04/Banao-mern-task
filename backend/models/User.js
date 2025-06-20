const mongoose = require("mongoose");

const userSchema = new mongoose.    Schema({
    fullName: String,
    email : {type: String, unique: true},
    password : String,
    hobbies : [{type: mongoose.Schema.ObjectId , ref : 'Hobby'}]
});

module.exports = mongoose.model("User", userSchema);