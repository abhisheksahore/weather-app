import { combineReducers } from "redux";
import { currentWeatherReducer } from "./reducers/currentWeatherReducer";
import { forcastReducer } from "./reducers/forcastReducer";
import { locationReducer } from "./reducers/locationReducer";

export default combineReducers({
    locationReducer: locationReducer,
    currentWeatherReducer: currentWeatherReducer,
    forcastReducer: forcastReducer,
})