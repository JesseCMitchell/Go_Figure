const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "Title is required"],
        minlength:[2, "Title must be at least 2 characters"]
    },
    price: {
        type: Number,
        required:[true, "Price is required"],
        min:[0, "Price greater than 0"]
    },
    description: {
        type: String,
        required:[true, "Description is required"],
        minlength:[5, "Description must be at least 5 characters long"]
    },
    imgUrl: {
        type: String,
        required:[true, "We need to have an image"],
    },
    dateAdded: {
        type: Date,
    },
    inStock: {
        type: Boolean
    }
}, {timestamps: true});

// module.exports.Product = mongoose.model("Product", ProductSchema);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;