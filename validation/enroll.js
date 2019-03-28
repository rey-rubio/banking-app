const Validator = require("validator");
const isEmpty = require("is-empty");

const productTypes = require("../models/Products");

const documentTypes = require("../models/Documents");

module.exports = function validateEnroll(user, productType) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    // data.name = !isEmpty(data.name) ? data.name : "";
    // data.email = !isEmpty(data.email) ? data.email : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Find user by email
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

        case(productTypes.SAVINGS):

            // Check minimum balance
            if(user.balance < productTypes.SAVINGS_MIN){

                errors.products_savings = "You need at least $" + productTypes.SAVINGS_MIN + " to enroll in a Savings account. ";

            }else{
                //errors = {};
                account.balance =  productTypes.SAVINGS_MIN;

            }



            break;

        case(productTypes.CHECKING):

            // Check minimum balance
            if(user.balance < productTypes.CHECKING_MIN)
                errors.products_checking = "You need at least $" + productTypes.CHECKING_MIN + " to enroll in a Checking account. ";
            else{
                //errors = {};
                account.balance =  productTypes.CHECKING_MIN;

            }
            break;

        case(productTypes.MONEY_MARKET):

            // Check minimum balance
            if(user.balance < productTypes.MONEY_MARKET_MIN)
                errors.products_money_market = "You need at least $" + productTypes.MONEY_MARKET_MIN + " to enroll in a Money Market account. ";
            else{
                //errors = {};
                account.balance =  productTypes.MONEY_MARKET_MIN;

            }
            break;

        case(productTypes.CD):
            // Check minimum balance
            if(user.balance < productTypes.CD_MIN)
                errors.products_cd = "You need at least $" + productTypes.CD_MIN + " to enroll in a CD account. ";
            else{
                account.balance =  productTypes.CD_MIN;

            }
            break;

        case(productTypes.IRA_CD):

            // Check minimum balance
            if(user.balance < productTypes.IRA_CD_MIN)
                errors.products_ira_cd = "You need at least $" + productTypes.IRA_CD_MIN + " to enroll in an IRA CD account. ";
            else{
                account.balance =  productTypes.IRA_CD_MIN;

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
    valid.push({name: documentTypes.BIRTH_CERTIFICATE, hasDocument: false},
        {name: documentTypes.DRIVERS_LICENSE, hasDocument: false},
        {name: documentTypes.PASSPORT, hasDocument: false},
        {name: documentTypes.PROOF_OF_ADDRESS, hasDocument: false},
        {name: documentTypes.SOCIAL_SECURITY, hasDocument: false},
        {name: documentTypes.STATE_ID, hasDocument: false});

    console.log("inside hasDocuments 1.2");
    console.log(valid);

    console.log("inside hasDocuments 1.3");
    for(let i = 0; i < user.documents.length; i++) {

        console.log(user.documents[i]);
        switch (user.documents[i].name) {
            case(documentTypes.BIRTH_CERTIFICATE):
                console.log("found birth certificate");
                valid[0].hasDocument = true;
                break;
            case(documentTypes.DRIVERS_LICENSE):

                console.log("found drivers license");
                valid[1].hasDocument = true;
                break;
            case(documentTypes.PASSPORT):

                console.log("found passport");
                valid[2].hasDocument = true;
                break;
            case(documentTypes.PROOF_OF_ADDRESS):

                console.log("found proof of address");
                valid[3].hasDocument = true;
                break;
            case(documentTypes.SOCIAL_SECURITY):

                console.log("found social security");
                valid[4].hasDocument = true;
                break;
            case(documentTypes.STATE_ID):

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
            errors += doc.name + " ";
        }

    });

    if(!isEmpty(errors))
        errors = "Missing: " + errors;


    console.log("inside hasDocuments 3");
    console.log(valid);

    console.log(errors);

    // return {
    //     isValid: isEmpty(errors),
    //     errors,
    // };
    return errors;
}