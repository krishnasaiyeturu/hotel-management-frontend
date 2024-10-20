import { CLEAR_SELECTED_ROOM, GET_SELECTED_ROOM, SET_SELECTED_ROOM } from "../actions/customerSelectedRoomTypeWithDetails";

const initialState = {
  selectedRoom: null, // Stores the selected room data
};

const selectedRoomReducer = (state = initialState, action) => {
  console.log({action})
  switch (action.type) {
    case SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.payload, // Update state with the selected room details
      };
    case CLEAR_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: null, // Clear the selected room data
      };
    case GET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: state.selectedRoom, // Return the current selected room (optional)
      };
    default:
      return state;
  }
};

export default selectedRoomReducer;
