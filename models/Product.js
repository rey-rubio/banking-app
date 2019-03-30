const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        default: 0
    },
    documents: [{
        id: Schema.Types.ObjectId,
        name: String,
        docType: String,
        date : Date,
    }],
    products: [{
        id: Schema.Types.ObjectId,
        accountNumber: String,
        name: String,
        balance: Number,
        date : Date,
        isActive: Boolean
    }]
});

module.exports = Product = mongoose.model("products", ProductSchema);
