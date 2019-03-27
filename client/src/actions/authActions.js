import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING , ENROLL, ADD_BALANCE, GET_BALANCE} from "./types";


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
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
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
export const enroll =  (userData, productType) => dispatch =>{
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
export const addBalance =  (userData, addBalance) => dispatch => {
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
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


export const getBalance =  (userData, userID) => async (dispatch) => {
    console.log("Test get balance from 1 authActions.js ");
    console.log(userData);
    console.log(userID);
    await axios
        .get("/api/users/getBalance/" + userID)
        .then(res => {

            console.log("Test get balance from 2 authActions.js");
            console.log(res.data.balance);
            //this.setState({ ["balance"]: res.data.balance});
            //this.displayMessage("Congratulations");
            //this.props.history.push("/dashboard/");
            dispatch(setGettingBalance(res.data.balance));
            // const promises = res.data(item => {
            //
            //     const balance= item.balance
            // });
            console.log("Test get balance from 3 authActions.js");

            return res.data.balance;
        })
    //.catch(err => console.log(err));
    // .catch(err =>
    //     dispatch({
    //         type: GET_ERRORS,
    //         payload: err.response.data
    //     })
    // );
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


// getting balance
export const setGettingBalance = (balance) => {
    return {
        type: GET_BALANCE,
        balance: balance
    };
};


