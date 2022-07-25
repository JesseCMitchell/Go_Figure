const mongoose = require('mongoose');

const BeltExamSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "Title is required"],
        minlength:[2, "Title must be at least 3 characters"]
    },
    salary: {
        type: Number,
        required:[true, "Salary is required"],
        min:[0, "Salary must be at least 70000"]
    },
    company: {
        type: String,
        required:[true, "Company is required"],
        minlength:[5, "Company must be at least 3 characters"]
    },
    imgUrl: {
        type: String,
        required:[true, "We need to have an image"],
    },
    dateAdded: {
        type: Date
    },
    checkbox: {
        type: Boolean
    },
    dropdown: {
        type: String
    }
}, {timestamps: true});

// module.exports.Product = mongoose.model("Product", BeltExamSchema);
const Item = mongoose.model("Item", BeltExamSchema);
module.exports = Item;