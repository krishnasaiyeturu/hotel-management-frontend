import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import roomsReducer from "./roomReducer";
import { hotelsListReducer } from "./hotelsListReducer";

const adminRootReducer = combineReducers({
  admin: adminReducer,
  rooms: roomsReducer,
  hotels: hotelsListReducer,
  // house: houseReducer,
  // reservations: reservationsReducer,
})

export default adminRootReducer;