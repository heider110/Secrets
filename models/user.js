const mongoose = require('mongoose');


const passportLocaMongoose = require('passport-local-mongoose');

//new Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String,
    name: String
});
userSchema.plugin(passportLocaMongoose);
const User = mongoose.model("User", userSchema);


module.exports = User, userSchema;