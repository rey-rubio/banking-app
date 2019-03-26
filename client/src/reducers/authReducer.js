import { SET_CURRENT_USER, USER_LOADING, ENROLL} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  enrolling: false
};

export default function(state = initialState, action) {
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
    default:
      return state;
  }
}
