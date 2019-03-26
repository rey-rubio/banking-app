const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
    employment_history: {
        type: Array,
        default: {
            employer_name: "",
            start_date: Date.now,
            end_date: Date.now,
            salary: 80000

        }

    },
    products: [{
            id: Schema.Types.ObjectId,
            accountNumber: String,
            name: String,
            balance: Number,
            date : Date,
            isActive: Boolean
    }]


});

module.exports = User = mongoose.model("users", UserSchema);
