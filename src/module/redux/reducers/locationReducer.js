import { SET_LOCATION } from "../actions/locationActions";

const INITIAL_STATE = {
    location: {
        loaded: false,
        coordinates: {
            lat: "",
            lng: "",
        },
    } 
}


export const locationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_LOCATION :
            return {
                location: {
                    loaded: action.payload.loaded,
                    coordinates: {
                        lat: action.payload.coordinates.lat,
                        lng: action.payload.coordinates.lng,
                    }
                }
            }
        default : 
            return state;
    }
}