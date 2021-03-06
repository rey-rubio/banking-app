import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS, SET_CURRENT_USER, USER_LOADING, ENROLL, ADD_BALANCE,
    GET_USER_DATA, ADD_DOCUMENT
} from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {

    console.log("Test login from authActions.js");
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage

            // Set token to localStorage
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));
            //
            // dispatch(setUserLoading());
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


// Log user out
export const logoutUser = () => dispatch => {
    console.log("Test logout from 1 authActions.js");
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};


// Enroll for a product
export const enroll = (userData, productType) => dispatch => {
    console.log("Test enroll from 1 authActions.js");
    console.log("Test enroll from 1 authActions.js " + productType);
    axios
        .post("/api/users/enroll", {userData, productType})
        .then(res => {
            console.log("Test enroll from 2 authActions.js");
            dispatch(setUserEnrolling());
            console.log("Test enroll from  3 authActions.js");

        })
        //.catch(err => console.log(err));
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Add Balance
export const addBalance = (userData, addBalance) => dispatch => {
    console.log("Test add balance from 1 authActions.js " + addBalance);
    axios
        .post("/api/users/addBalance", {userData, addBalance})
        .then(res => {
            console.log("Test addBalance from 2 authActions.js");
            console.log(res);
            dispatch(setAddingBalance());
            console.log("Test addBalance from  3 authActions.js");
        })
        //.catch(err => console.log(err));
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const getUserData = (userData, userID) => async (dispatch) => {
    console.log("Test getProducts from 1 authActions.js ");
    console.log(userData);
    console.log(userID);
    await axios
        .get("/api/users/getUserData/" + userID)
        .then(res => {

            console.log("Test getUserData from 2 authActions.js");
            console.log(res.data.balance);
            console.log(res.data.products);
            console.log(res.data.documents);
            //this.setState({ ["balance"]: res.data.balance});
            //this.displayMessage("Congratulations");
            //this.props.history.push("/dashboard/");

            dispatch(setGettingUserData(res.data.balance, res.data.products, res.data.documents));
            // const promises = res.data(item => {
            //
            //     const balance= item.balance
            // });
            console.log("Test getUserData from 3 authActions.js");

            return (res.data.balance, res.data.products, res.data.documents);
        })

        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Add Document
export const addDocument = (userData, document) => dispatch => {
    console.log("Test addDocument from 1 authActions.js ");
    console.log(document);
    axios
        .post("/api/users/addDocument", {userData, document})
        .then(res => {
            console.log("Test addDocument from 2 authActions.js");
            console.log(res);
            dispatch(setAddingDocument());
            console.log("Test addDocument from  3 authActions.js");
            return;
        })

        //.catch(err => console.log(err));
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// User loading
export const setUserEnrolling = () => {
    return {
        type: ENROLL
    };
};


// adding balance
export const setAddingBalance = () => {
    return {
        type: ADD_BALANCE
    };
};

// adding balance
export const setAddingDocument = () => {
    return {
        type: ADD_DOCUMENT
    };
};


// getting balance
export const setGettingUserData = (balance, products, documents) => {
    return {
        type: GET_USER_DATA,
        balance: balance,
        products: products,
        documents: documents
    };
};

