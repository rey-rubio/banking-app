const Validator = require("validator");
const isEmpty = require("is-empty");

const types = require("../models/products/types");

// const SAVINGS = require("SAVINGS");
// const CHECKING = require("CHECKING");
// const MONEY_MARKET = require("MONEY_MARKET");
// const CD = require("CD");
// const IRA_CD = require("IRA_CD");
//
// const SAVINGS_MIN = require("SAVINGS_MIN");
// const CHECKING_MIN = require("CHECKING_MIN");
// const MONEY_MARKET_MIN = require("MONEY_MARKET_MIN");
// const CD_MIN = require("CD_MIN");
// const IRA_CD_MIN = require("IRA_CD_MIN");


module.exports = function validateEnroll(data, productType) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    // data.name = !isEmpty(data.name) ? data.name : "";
    // data.email = !isEmpty(data.email) ? data.email : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    console.log("Test enroll inside validateEnroll");
    console.log(data.user.balance);

    console.log(productType);
    switch(productType){
        case(types.SAVINGS):

            // Check minimum balance
            if(data.user.balance < types.SAVINGS_MIN)
                errors.balance = "You need at least $" + types.SAVINGS_MIN + " to enroll in a Savings account. ";

            break;

        case(types.CHECKING):

            // Check minimum balance
            if(data.user.balance < types.CHECKING_MIN)
                errors.balance = "You need at least $" + types.CHECKING_MIN + " to enroll in a Checking account. ";

            break;

        case(types.MONEY_MARKET):

            // Check minimum balance
            if(data.user.balance < types.MONEY_MARKET_MIN)
                errors.balance = "You need at least $" + types.MONEY_MARKET_MIN + " to enroll in a Money Market account. ";

            break;

        case(types.CD):
            // Check minimum balance
            if(data.user.balance < types.CD_MIN)
                errors.balance = "You need at least $" + types.CD_MIN + " to enroll in a CD account. ";

            break;

        case(types.IRA_CD):

            // Check minimum balance
            if(data.user.balance < types.IRA_CD_MIN)
                errors.balance = "You need at least $" + types.IRA_CD_MIN + " to enroll in an IRA CD account. ";

            break;
        default:
            break;

    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
