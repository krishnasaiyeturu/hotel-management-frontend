import axios from "axios";

// export const API = "http://localhost:4000/";
// export const API = 'motel-backend.vercel.app';
export const API = import.meta.env.VITE_BACKEND_API;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});
// / Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // Set the access token in the Authorization header if it exists
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Directly return the response object in case of a successful response
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = JSON.parse(localStorage.getItem("accessToken"));

//     // Set the access token in the Authorization header
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     // Directly return the response object in case of a successful response
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is a 401 (Unauthorized) and the request has not been retried yet
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");

//         if (refreshToken) {
//           const response = await axios.post(`${API}/auth/refresh_token`, {
//             refreshToken,
//           });

//           const newAccessToken = response.data.accessToken;

//           // Save the new access token in local storage
//           localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

//           // Update the original request's Authorization header
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//           // Retry the original request with the new token
//           return api(originalRequest);
//         } else {
//           console.error("No refresh token available");
//         }
//       } catch (refreshError) {
//         console.error("Failed to refresh access token:", refreshError);
//         // Redirect to login or take appropriate action if refreshing fails
//         throw refreshError;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
