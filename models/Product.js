const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: Schema.Types.ObjectId,
    accountNumber: String,
    name: String,
    balance: Number,
    date : Date,
    isActive: Boolean
});

module.exports = Product = mongoose.model("products", ProductSchema);
