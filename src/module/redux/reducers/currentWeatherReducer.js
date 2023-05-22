import { SET_CURRENT_WEATHER } from "../actions/currentWeatherActions";

const INITIAL_STATE = {
    currentWeather: {}
}

export const currentWeatherReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_WEATHER: 
            return {...state, currentWeather: action.payload};
        default:
            return state;
    }
}