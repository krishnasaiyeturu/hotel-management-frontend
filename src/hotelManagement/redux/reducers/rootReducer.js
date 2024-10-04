import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import roomsReducer from "./roomReducer";
import { hotelsListReducer } from "./hotelsListReducer";

const adminRootReducer = combineReducers({
  admin: adminReducer,
  roomsInventory: roomsReducer,
  hotels: hotelsListReducer,
  // house: houseReducer,
  // reservations: reservationsReducer,
})

export default adminRootReducer;