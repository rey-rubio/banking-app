// authReducer.js
import {SET_CURRENT_USER, USER_LOADING, ENROLL,
    ADD_BALANCE, GET_USER_DATA, ADD_DOCUMENT} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    enrolling: false,
    addingBalance: false,
    addingDocument: false,
    gettingUserData: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_CURRENT_USER:
            console.log("Test login from authReducer.js");
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: true,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case ENROLL:
            console.log("Test enroll from authReducer.js");
            return {
                ...state,
                enrolling: true,
            };
        case ADD_BALANCE:
            console.log("Test addBalance from authReducer.js");
            return {
                ...state,
                addingBalance: true,
            };
        case ADD_DOCUMENT:
            console.log("Test addBalance from authReducer.js");
            return {
                ...state,
                loading: false,
                enrolling: false,
                addingBalance: false,
                addingDocument: true,
                gettingBalance: false,
                gettingProducts: false,
                gettingUserData: false
            };

        case GET_USER_DATA:
            return {
                ...state,
                balance: action.balance,
                products: action.products,
                documents: action.documents,
                gettingUserData: true,
            };
        default:
            return state;
    }
}


