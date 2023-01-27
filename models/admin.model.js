const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema(
    {
        userName: {type: String, required: true},
        password: {type: String, required: true},

        postDate: {type: Date, default: Date.now}
    }
);

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin;