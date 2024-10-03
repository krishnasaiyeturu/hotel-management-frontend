const initialState = {
  adminDetails: null,
  responseMessage: '',

}

const adminReducer = (state = initialState, { type, payload }) => {
  console.log({payload: payload})
  switch (type) {
    // case "USER_SIGN_UP":
    //   return {
    //     ...state,
    //     adminDetails: payload.user_details,
    //     loginResponse: payload.success,
    //     responseMessage: payload.info
    //   };
    case "ADMIN_LOG_IN":
      return {
        ...state,
        adminDetails: payload,
      };
    // case "USER_LOG_OUT": {
    //   localStorage.removeItem("accessToken");
    //   localStorage.removeItem("refreshToken");
    //   return {
    //     adminDetails: null,
    //     loginResponse: 0,
    //     responseMessage: ""
    //   }
    // }
    // case "GET_USER_DETAILS":
    //   return {
    //     adminDetails: payload
    //   }

    // case "CHANGE_USER_ROLE":
    //   return {
    //     adminDetails: payload.updatedUserDetails,

    //   }

    default:
      return state
  }
}

export default adminReducer;