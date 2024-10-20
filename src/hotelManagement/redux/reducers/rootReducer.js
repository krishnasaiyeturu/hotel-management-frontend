import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import customerReducer from "./customerReducer";
import roomsReducer from "./roomReducer";
import { hotelsListReducer } from "./hotelsListReducer";
import selectedRoomReducer from "./customerSelectedRoomTypeWithDetailsReducer";

const adminRootReducer = combineReducers({
  admin: adminReducer,
  roomsInventory: roomsReducer,
  hotels: hotelsListReducer,
  customer: customerReducer,
  customerSelectedRoomTypeWithDetails: selectedRoomReducer,
  // house: houseReducer,
  // reservations: reservationsReducer,
})

export default adminRootReducer;