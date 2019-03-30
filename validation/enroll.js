const Validator = require("validator");
const isEmpty = require("is-empty");

const PRODUCT_TYPES = require("../models/Products");
const DOCUMENT_TYPES = require("../models/Documents");

module.exports = function validateEnroll(user, productType) {

    let errors = {};

    console.log("Test enroll inside validateEnroll");
    // console.log(user.balance);
    // console.log(user.documents);
    console.log(productType);
    let account = {
        name: productType,
        balance: 0,
        date : Date.now(),
        isActive: true
    };

    const error = hasDocuments(user);
    console.log("ERRORS?: " + error);
    if(!isEmpty(error)){
        errors.documents = error;
        console.log(errors);
    }


    switch(productType){

        case(PRODUCT_TYPES.SAVINGS):

            // Check minimum balance
            if(user.balance < PRODUCT_TYPES.SAVINGS_MIN){

                errors.products_savings = "You need at least $" + PRODUCT_TYPES.SAVINGS_MIN + " to enroll in a Savings account. ";

            }else{
                //errors = {};
                account.balance =  PRODUCT_TYPES.SAVINGS_MIN;

            }



            break;

        case(PRODUCT_TYPES.CHECKING):

            // Check minimum balance
            if(user.balance < PRODUCT_TYPES.CHECKING_MIN)
                errors.products_checking = "You need at least $" + PRODUCT_TYPES.CHECKING_MIN + " to enroll in a Checking account. ";
            else{
                //errors = {};
                account.balance =  PRODUCT_TYPES.CHECKING_MIN;

            }
            break;

        case(PRODUCT_TYPES.MONEY_MARKET):

            // Check minimum balance
            if(user.balance < PRODUCT_TYPES.MONEY_MARKET_MIN)
                errors.products_money_market = "You need at least $" + PRODUCT_TYPES.MONEY_MARKET_MIN + " to enroll in a Money Market account. ";
            else{
                //errors = {};
                account.balance =  PRODUCT_TYPES.MONEY_MARKET_MIN;

            }
            break;

        case(PRODUCT_TYPES.CD):
            // Check minimum balance
            if(user.balance < PRODUCT_TYPES.CD_MIN)
                errors.products_cd = "You need at least $" + PRODUCT_TYPES.CD_MIN + " to enroll in a CD account. ";
            else{
                account.balance =  PRODUCT_TYPES.CD_MIN;

            }
            break;

        case(PRODUCT_TYPES.IRA_CD):

            // Check minimum balance
            if(user.balance < PRODUCT_TYPES.IRA_CD_MIN)
                errors.products_ira_cd = "You need at least $" + PRODUCT_TYPES.IRA_CD_MIN + " to enroll in an IRA CD account. ";
            else{
                account.balance =  PRODUCT_TYPES.IRA_CD_MIN;

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


function hasDocuments(user) {
    console.log("inside hasDocuments 1");
    console.log(user);

    console.log("inside hasDocuments 1.1");
    console.log(user.documents.length);
    //console.log(documents);
    let valid = [];
    let errors = "";
    valid.push({name: DOCUMENT_TYPES.BIRTH_CERTIFICATE, hasDocument: false},
        {name: DOCUMENT_TYPES.DRIVERS_LICENSE, hasDocument: false},
        {name: DOCUMENT_TYPES.PASSPORT, hasDocument: false},
        {name: DOCUMENT_TYPES.PROOF_OF_ADDRESS, hasDocument: false},
        {name: DOCUMENT_TYPES.SOCIAL_SECURITY, hasDocument: false},
        {name: DOCUMENT_TYPES.STATE_ID, hasDocument: false});

    console.log("inside hasDocuments 1.2");
    console.log(valid);

    console.log("inside hasDocuments 1.3");
    for(let i = 0; i < user.documents.length; i++) {

        console.log(user.documents[i]);
        switch (user.documents[i].docType) {
            case(DOCUMENT_TYPES.BIRTH_CERTIFICATE):
                console.log("found birth certificate");
                valid[0].hasDocument = true;
                break;
            case(DOCUMENT_TYPES.DRIVERS_LICENSE):

                console.log("found drivers license");
                valid[1].hasDocument = true;
                break;
            case(DOCUMENT_TYPES.PASSPORT):

                console.log("found passport");
                valid[2].hasDocument = true;
                break;
            case(DOCUMENT_TYPES.PROOF_OF_ADDRESS):

                console.log("found proof of address");
                valid[3].hasDocument = true;
                break;
            case(DOCUMENT_TYPES.SOCIAL_SECURITY):

                console.log("found social security");
                valid[4].hasDocument = true;
                break;
            case(DOCUMENT_TYPES.STATE_ID):

                console.log("found state id");
                valid[5].hasDocument = true;
                break;
            default:
                break;
        }

    }

    console.log("inside hasDocuments 2");
    console.log(valid);

    console.log("inside hasDocuments 2.1");
    valid.forEach(doc => {
        console.log(doc);
        if(doc.hasDocument == false){
            errors += doc.name + ", ";
        }

    });

    if(!isEmpty(errors))
        errors = "Missing Documents: " + errors;


    console.log("inside hasDocuments 3");
    console.log(valid);

    console.log(errors);

    // return {
    //     isValid: isEmpty(errors),
    //     errors,
    // };
    return errors;
}