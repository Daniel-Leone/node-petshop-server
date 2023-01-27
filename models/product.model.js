const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        brand: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        weight: {type: Number, required: true},
        productImage: {type: String, required: true},
        stagePet: {type: String, required: true},
        animal: {type: String, required: true},

        postDate: {type: Date, default: Date.now}
    }
);

const Product = mongoose.model('Product', productSchema)

module.exports = Product;

    