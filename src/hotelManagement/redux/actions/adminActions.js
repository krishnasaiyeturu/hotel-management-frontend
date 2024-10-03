// import api from "../../backend";

// /* eslint-disable no-undef */
// export const userSignUp = (userData) => async (dispatch) => {
//   dispatch({
//     type: "USER_SIGN_UP",
//     payload: userData,
//   });
// };

export const adminLogIn = (adminData) => async (dispatch) => {
  // console.log(adminData.user_details)
  dispatch({
    type: "ADMIN_LOG_IN",
    payload: adminData,
  });
};

// export const getUser = () => async (dispatch, getState) => {
//   const { userDetails } = getState().user;

//   if (userDetails) {
//     return;
//   }

//   try {
//     const response = await api.post("/auth/get_user_details");
//     // console.log(response.data, "GET USER DETAILS");
//     if (response.data.status === 200) {
//       // saving user details from db
//       dispatch({
//         type: "GET_USER_DETAILS",
//         payload: response.data.user_details,
//       });
//       // saving houses data from db
//       dispatch({
//         type: "SAVE_HOUSE_DATA",
//         payload: response.data.house_data,
//       });
//     } else {
//       dispatch({ type: "USER_LOG_OUT" });
//     }
//   } catch (error) {
//     // Handle error
//     // console.log(error)
//   }
// };