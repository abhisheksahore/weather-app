import { SET_FORCAST, SET_TEMP_UNIT } from "../actions/currentWeatherActions";

const INITIAL_STATE = {
    forcast: {},
    tempUnit: "C",
}

export const forcastReducer = (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case SET_FORCAST: 
            return {
                ...state,
                forcast: action.payload,
            }
        case SET_TEMP_UNIT: 
        return {
            ...state,
            tempUnit: action.payload,
        }
        default: 
            return state;
    }
}