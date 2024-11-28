// actions/customerActions.js

import { jwtDecode } from "jwt-decode";

// Action for customer sign-up
export const customerSignUp = (customerData) => async (dispatch) => {
  dispatch({
    type: "CUSTOMER_SIGN_UP",
    payload: customerData,
  });
};

// Action for customer login
export const customerLogIn = (customerData) => async (dispatch) => {
  dispatch({
    type: "CUSTOMER_LOG_IN",
    payload: customerData,
  });
};

// Action for getting customer details
export const getCustomerDetails = (customerDetails) => {
  return {
    type: "GET_CUSTOMER_DETAILS",
    payload: customerDetails,
  };
};

// Action for customer logout
export const customerLogOut = () => (dispatch) => {
  // Optionally remove tokens or session data if required
  localStorage.removeItem("accessToken");
  dispatch({
    type: "CUSTOMER_LOG_OUT",
  });
};

// Action to set customer data
export const setCustomerData = (customerData) => ({
  type: "SET_CUSTOMER_DATA",
  payload: customerData,
});

// Action to fetch and set customer data from the access token
export const fetchCustomerData = () => (dispatch) => {
  // Get the access token from local storage
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      // Decode the token
      const decodedToken = jwtDecode(accessToken);
      // Extract customer data from the decoded token
      const customerData = decodedToken?.user;
      // Dispatch the action to update the Redux state with customer data
      dispatch(setCustomerData(customerData));
    } catch (error) {
      console.error("Failed to decode access token:", error);
    }
  } else {
    console.log("No access token found");
  }
};
