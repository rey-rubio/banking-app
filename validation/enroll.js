const Validator = require("validator");
const isEmpty = require("is-empty");

const types = require("../models/products/types");


module.exports = function validateEnroll(user, productType) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    // data.name = !isEmpty(data.name) ? data.name : "";
    // data.email = !isEmpty(data.email) ? data.email : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Find user by email
    console.log("Test enroll inside validateEnroll");
    console.log(user.balance);

    console.log(productType);
    let account = {
        name: productType,
        balance: 0,
        date : Date.now(),
        isActive: true
    };
    switch(productType){
        case(types.SAVINGS):

            // Check minimum balance
            if(user.balance < types.SAVINGS_MIN){

                errors.products_savings = "You need at least $" + types.SAVINGS_MIN + " to enroll in a Savings account. ";

            }
            else{
                //errors = {};
                account.balance =  types.SAVINGS_MIN;

            }

            break;

        case(types.CHECKING):

            // Check minimum balance
            if(user.balance < types.CHECKING_MIN)
                errors.products_checking = "You need at least $" + types.CHECKING_MIN + " to enroll in a Checking account. ";
            else{
                //errors = {};
                account.balance =  types.CHECKING_MIN;

            }
            break;

        case(types.MONEY_MARKET):

            // Check minimum balance
            if(user.balance < types.MONEY_MARKET_MIN)
                errors.products_money_market = "You need at least $" + types.MONEY_MARKET_MIN + " to enroll in a Money Market account. ";
            else{
                //errors = {};
                account.balance =  types.MONEY_MARKET_MIN;

            }
            break;

        case(types.CD):
            // Check minimum balance
            if(user.balance < types.CD_MIN)
                errors.products_cd = "You need at least $" + types.CD_MIN + " to enroll in a CD account. ";
            else{
                //errors = {};
                account.balance =  types.CD_MIN;

            }
            break;

        case(types.IRA_CD):

            // Check minimum balance
            if(user.balance < types.IRA_CD_MIN)
                errors.products_ira_cd = "You need at least $" + types.IRA_CD_MIN + " to enroll in an IRA CD account. ";
            else{
                //errors = {};
                account.balance =  types.IRA_CD_MIN;

            }
            break;
        default:
            break;

    }

    return {
        errors,
        isValid: isEmpty(errors),
        account
    };
};
