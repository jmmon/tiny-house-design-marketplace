const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//id, username, password (hashed)

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    designs: [{ type: Schema.Types.ObjectId, ref: 'Design'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// When user is created, generate JWT and use it late for authentication and authorization