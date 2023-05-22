import { SET_LOCATION } from "../actions/locationActions"

export const setLocationInStore = (payload) => {
    return {
        type: SET_LOCATION,
        payload,
    }
}