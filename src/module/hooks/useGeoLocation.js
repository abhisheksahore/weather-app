import _ from 'lodash'
import { useEffect, useState } from 'react'
import { setLocationInStore } from '../redux/actionCreators/locationActionCreator'
import store from '../redux/store'

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {
            lat: "",
            lng: "",
        },
        error: null,
    })

    useEffect(() => {
        if (!_.isEmpty(location)) {
            console.log(location);
            // store.dispatch(setLocationInStore(location))
        }
        console.log("this is running")
    }, [location])

    const onSuccess = (location) => {
        setLocation({
            error: null,
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        })
    }
    const onError = (error) => {
        setLocation(prev => ({
            ...prev,
            loaded: true,
            error,
        }))
        console.log(error);
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            onError({
                code: 0,
                message: "GeoLocation not supported.",
            })
        }
    }, [])
    return [location, setLocation, onSuccess, onError];
}

export default useGeoLocation