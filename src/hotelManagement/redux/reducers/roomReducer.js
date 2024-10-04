import {
  GET_ALL_ROOMS,
  CREATE_ROOM,
  GET_ROOM_BY_ID,
  EDIT_ROOM,
  GET_ROOMS_COUNT, } from "../actions/roomsActions";

const initialState = {
  rooms: [],
  roomDetailsById: null,
  roomsCount: null
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case GET_ROOMS_COUNT:
      return {
        ...state,
        roomsCount: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case GET_ROOM_BY_ID:
      return {
        ...state,
        roomDetailsById: action.payload,
      };
    case EDIT_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.id ? action.payload : room
        ),
      };
    default:
      return state;
  }
};

export default roomsReducer;
