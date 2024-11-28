import toast from "react-hot-toast";
import api, { API } from "../../../backend";

// Action Types
export const GET_ALL_HOTELS = 'GET_ALL_HOTELS';

// Action creator for setting active hotel
export const setActiveHotel = (hotel) => ({
  type: "SET_ACTIVE_HOTEL",
  payload: hotel,
});

// Action Creator for fetching all hotels
export const getAllHotels = () => async (dispatch) => {
  try {
    const response = await api.get(`${API}admin/hotels`);
    if (!response) {
      throw new Error('Failed to fetch all hotels');
    }
    dispatch({
      type: GET_ALL_HOTELS,
      payload: response.data, // Data from the API response
    });
  } catch (error) {
    toast.error(error.response.data.message || "Error  Fetching all hotels list !")

  }
};
