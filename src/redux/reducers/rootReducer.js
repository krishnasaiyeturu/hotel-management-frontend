import { combineReducers } from "redux";
import handleUser from "../reducers/userReducer";
import houseReducer from "../reducers/houseReducer";
import reservationsReducer from "./reservationsReducer";
import adminRootReducer from "../../hotelManagement/redux/reducers/rootReducer";

const rootReducer = combineReducers({
    user: handleUser,
    house: houseReducer,
    reservations: reservationsReducer,
    admin: adminRootReducer,
})

export default rootReducer;