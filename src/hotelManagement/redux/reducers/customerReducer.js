// customerReducer.js
const initialState = {
  customerDetails: null,
  responseMessage: '',
  loading: false,
};

const customerReducer = (state = initialState, { type, payload }) => {
  console.log({ payload });
  switch (type) {
    // Handle customer sign-up
    case "CUSTOMER_SIGN_UP":
      return {
        ...state,
        customerDetails: payload,
        responseMessage: payload.message,
        loading: false,
      };

    // Handle customer sign-in
    case "CUSTOMER_SIGN_IN":
      return {
        ...state,
        customerDetails: payload,
        responseMessage: payload.message,
        loading: false,
      };

    // Get customer details (after successful login)
    case "GET_CUSTOMER_DETAILS":
      return {
        ...state,
        customerDetails: payload,
        loading: false,
      };

    // Handle customer logout
    case "CUSTOMER_LOG_OUT":
      return {
        ...state,
        customerDetails: null,
        responseMessage: 'Logged out successfully',
        loading: false,
      };

    // Handle setting customer data
    case "SET_CUSTOMER_DATA":
      return {
        ...state,
        customerDetails: payload,
        loading: false,
      };

    // Handle loading state when making requests
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    // Handle errors
    case "ERROR":
      return {
        ...state,
        responseMessage: payload.message,
        loading: false,
      };

    default:
      return state;
  }
};

export default customerReducer;
