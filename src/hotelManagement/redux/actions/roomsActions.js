// roomsActions.js
import api from "../../../backend";

// Action Types
export const GET_ALL_ROOMS = "GET_ALL_ROOMS";
export const CREATE_ROOM = "CREATE_ROOM";
export const GET_ROOM_BY_ID = "GET_ROOM_BY_ID";
export const EDIT_ROOM = "EDIT_ROOM";

// Action Creators
export const getAllRooms = () => async (dispatch) => {
  try {
    const response = await api.get("/rooms"); // Update endpoint as needed
    dispatch({ type: GET_ALL_ROOMS, payload: response.data });
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    // Handle error if needed (e.g., dispatch an error action)
  }
};

export const createRoom = (roomData) => async (dispatch) => {
  try {
    const response = await api.post("/room", roomData); // Update endpoint as needed
    dispatch({ type: CREATE_ROOM, payload: response.data });
  } catch (error) {
    console.error("Error creating room:", error);
    // Handle error if needed
  }
};

export const getRoomById = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/rooms/${id}`); // Update endpoint as needed
    dispatch({ type: GET_ROOM_BY_ID, payload: response.data });
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    // Handle error if needed
  }
};

export const editRoom = (id, roomData) => async (dispatch) => {
  try {
    const response = await api.put(`/rooms/${id}`, roomData); // Update endpoint as needed
    dispatch({ type: EDIT_ROOM, payload: response.data });
  } catch (error) {
    console.error("Error editing room:", error);
    // Handle error if needed
  }
};
