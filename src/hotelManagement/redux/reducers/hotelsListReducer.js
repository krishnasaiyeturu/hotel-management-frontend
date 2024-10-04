// hotelReducer.js

const initialState = {
  allHotels: [],
  activeHotel: {
    _id: null,
    name: null,
  },
};

export const hotelsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_HOTELS":
      return {
        ...state,
        allHotels: action.payload,
        activeHotel: {
          _id: action.payload.length > 0 ? action.payload[0]._id : null, // Set the first hotel's ID as default
          name: action.payload.length > 0 ? action.payload[0].name : null, // Set the first hotel's name as default
        },
      };
    case "SET_ACTIVE_HOTEL":
      return {
        ...state,
        activeHotel: {
          _id: action.payload._id,
          name: action.payload.name,
        },
      };
    default:
      return state;
  }
};
