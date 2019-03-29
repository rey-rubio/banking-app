const Validator = require("validator");
const isEmpty = require("is-empty");


const DOCUMENT_TYPES = require("../models/Documents");


module.exports = function validateDocument(document) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    // data.name = !isEmpty(data.name) ? data.name : "";
    // data.email = !isEmpty(data.email) ? data.email : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Find user by email
    console.log("Test inside validateDocument");

    console.log(document);

    let newDocument = {};
    const documentType = document.docType.toUpperCase().trim();

    switch(documentType){

        case(DOCUMENT_TYPES.BIRTH_CERTIFICATE):
            newDocument = {
                name: document.name,
                docType: DOCUMENT_TYPES.BIRTH_CERTIFICATE,
                date : Date.now()
            };
            break;

        case(DOCUMENT_TYPES.DRIVERS_LICENSE):
            newDocument = {
                name: document.name,
                docType: DOCUMENT_TYPES.DRIVERS_LICENSE,
                date : Date.now()
            };
            break;

        case(DOCUMENT_TYPES.PASSPORT):
            newDocument = {
                name: document.name,
                docType: DOCUMENT_TYPES.PASSPORT,
                date : Date.now()
            };
            break;

        case(DOCUMENT_TYPES.PROOF_OF_ADDRESS):
            newDocument = {
                name: document.name,
                docType: DOCUMENT_TYPES.PROOF_OF_ADDRESS,
                date : Date.now()
            };
            break;

        case(DOCUMENT_TYPES.SOCIAL_SECURITY):
            newDocument = {
                name: document.name,
                docType: DOCUMENT_TYPES.SOCIAL_SECURITY,
                date : Date.now()
            };
            break;

        case(DOCUMENT_TYPES.STATE_ID):
            newDocument = {
                name: document.name,
                docType: DOCUMENT_TYPES.STATE_ID,
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
        newDocument
    };
};
