export const SET_SELECTED_ROOM = "SET_SELECTED_ROOM";
export const CLEAR_SELECTED_ROOM = "CLEAR_SELECTED_ROOM";
export const GET_SELECTED_ROOM = "GET_SELECTED_ROOM";


// Set selected room data
export const setSelectedRoom = (roomDetails) => ({
  type: SET_SELECTED_ROOM,
  payload: roomDetails,
});

// Clear selected room data (for example, after booking is completed)
export const clearSelectedRoom = () => ({
  type: CLEAR_SELECTED_ROOM,
});

export const getSelectedRoom = () => ({
  type: GET_SELECTED_ROOM,
});