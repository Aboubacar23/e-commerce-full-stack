const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {type: String, required: false},
    description : {type: String, required: false},
    price : {type: Number, required: false},
    stock : {type: Number, required: false},
    image : {type: String, required: false},
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : false
    },
    createdAt : {type: Date , default: Date.now()}

});  

module.exports = mongoose.model('Product', ProductSchema)