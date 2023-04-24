const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: [25, 'Username should be less than 25 characters']
    },

    password: {
        type: String,
        required: true, 
        minlength: [8, 'Password should be at least 8 characters']
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User