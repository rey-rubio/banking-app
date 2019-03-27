import {SET_CURRENT_USER, USER_LOADING, ENROLL, ADD_BALANCE, GET_BALANCE} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  enrolling: false,
  addingBalance: false,
  gettingBalance: false
};

export default function(state = initialState, action) {

    console.log("Test 1 authReducer.js");
    console.log(action);

    console.log("Test 2 authReducer.js");
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("Test login from authReducer.js");
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
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
        enrolling: true
      };
    case ADD_BALANCE:
      console.log("Test addBalance from authReducer.js");
      return {
        ...state,
        addingBalance: true
      };
    case GET_BALANCE:
      console.log("Test getBalance from authReducer.js");
      return {
        ...state,
        gettingBalance: true,
        balance: action.balance
      };
    default:
      return state;
  }

}
