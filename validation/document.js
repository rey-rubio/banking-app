const Validator = require("validator");
const isEmpty = require("is-empty");


const documentTypes = require("../models/Documents");


module.exports = function validateDocument(documentName) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    // data.name = !isEmpty(data.name) ? data.name : "";
    // data.email = !isEmpty(data.email) ? data.email : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Find user by email
    console.log("Test inside validateDocument");

    console.log(documentName);

    let document = {}
    documentName = documentName.toUpperCase().trim();

    console.log(documentName);

    switch(documentName){

        case(documentTypes.BIRTH_CERTIFICATE):
            document = {
                name: documentTypes.BIRTH_CERTIFICATE,
                date : Date.now()
            };
            break;

        case(documentTypes.DRIVERS_LICENSE):
            document = {
                name: documentTypes.DRIVERS_LICENSE,
                date : Date.now()
            };
            break;

        case(documentTypes.PASSPORT):
            document = {
                name: documentTypes.PASSPORT,
                date : Date.now()
            };
            break;

        case(documentTypes.PROOF_OF_ADDRESS):
            document = {
                name: documentTypes.PROOF_OF_ADDRESS,
                date : Date.now()
            };
            break;

        case(documentTypes.SOCIAL_SECURITY):
            document = {
                name: documentTypes.SOCIAL_SECURITY,
                date : Date.now()
            };
            break;

        case(documentTypes.STATE_ID):
            document = {
                name: documentTypes.STATE_ID,
                date : Date.now()
            };
            break;
        default:
            errors.addDocument = "Invalid document";
            break;
    }

    // if(documentName === documentTypes.BIRTH_CERTIFICATE ||
    //     documentName == documentTypes.DRIVERS_LICENSE.toString() ||
    //     documentName === documentTypes.PASSPORT ||
    //     documentName === documentTypes.PROOF_OF_ADDRESS ||
    //     documentName === documentTypes.SOCIAL_SECURITY)
    // {
    //
    // }
    // {
    //     errors.addDocument = "Invalid document";
    // }

    return {
        errors,
        isValid: isEmpty(errors),
        document
    };
};
