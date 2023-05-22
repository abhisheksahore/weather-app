import { SET_CURRENT_WEATHER, SET_FORCAST, SET_TEMP_UNIT } from "../actions/currentWeatherActions"

export const setCurrentWeather = (payload) => {
    return {type: SET_CURRENT_WEATHER, payload};
}

export const setForcastWeather = (payload) => {
    console.log(payload);
    return {type: SET_FORCAST, payload}
}

export const setTempUnit = (payload) => {
    return {type: SET_TEMP_UNIT, payload}
} 