import { faLocationArrow, faSearch } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { API_KEY } from '../config/weatherAPI.config';
import useGeoLocation from '../hooks/useGeoLocation'
import { setCurrentWeather, setForcastWeather, setTempUnit } from '../redux/actionCreators/currentWeatherActionCreator';
import HttpService from '../services/httpService';
import { changeTempUnit, convertCToF, convertFToC, convertKToC } from '../utils/utils';
import CurrentWeather from './current-weather';
import CurrentWeatherDetails from './current-weather-details';
import DisplayCard from './displayCard';
import InputComponent from './inputField'
import LoadingSpinner from './loading-spinner';
import WeekWeatherComponent from './week-weather-component';

const HomeScreen = (props) => {
    const [location, setLocation, onSuccess, onError] = useGeoLocation();

    const [locationError, setLocationError] = useState(false);
    const [errorResp, setErrorResp] = useState(false);
    useEffect(() => {
        console.log(location);
        if (location.loaded === true && location.coordinates.lat !== "" && location.coordinates.lat !== undefined && location.coordinates.lat !== null) {
            console.log(location);
            HttpService.getCurrentWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${API_KEY}`).then(data => {
                data.data = changeTempUnit(convertKToC, data.data);
                console.log(data);
                props.setCurrentWeather(data.data);
            }).catch(error => {
                setErrorResp(true);
            })
            HttpService.getCurrentWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${API_KEY}`).then(data => {
                data.data = changeTempUnit(convertKToC, data.data);
                console.log(data);
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                data.data.list = data.data.list.reduce((a, e) => {
                    const day = days[new Date(e.dt * 1000).getDay()];
                    if (_.isEmpty(a[day])) {
                        a[day] = [];
                        a[day].push(e);
                    } else {
                        a[day].push(e);
                    }
                    return a;
                }, {})
                console.log(data.data);
                props.setForcast(data.data);
            }).catch(error => {
                setErrorResp(true);
            })
        } else if (location.loaded === true && location.coordinates.lat === "") {
            console.log(location);
            setLocationError(true);
        }
    }, [location])


    const submitCity = (value) => {

        try {
            HttpService.getCurrentWeather(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`).then(data => {
                data.data.main.temp = convertKToC(data.data.main.temp);
                data.data.main.temp_max = convertKToC(data.data.main.temp_max);
                data.data.main.temp_min = convertKToC(data.data.main.temp_min);
                data.data.main.feels_like = convertKToC(data.data.main.feels_like);
                props.setCurrentWeather(data.data);
            }).catch(error => {
                console.log(error);
                setErrorResp(true);
            })
            HttpService.getCurrentWeather(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${API_KEY}`).then(data => {
                data.data.list = data.data.list.map(e => {
                    e.main.temp = convertKToC(e.main.temp);
                    e.main.temp_max = convertKToC(e.main.temp_max);
                    e.main.temp_min = convertKToC(e.main.temp_min);
                    e.main.feels_like = convertKToC(e.main.feels_like);
                    return e;
                })
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                data.data.list = data.data.list.reduce((a, e) => {
                    const day = days[new Date(e.dt * 1000).getDay()];
                    if (_.isEmpty(a[day])) {
                        a[day] = [];
                        a[day].push(e);
                    } else {
                        a[day].push(e);
                    }
                    return a;
                }, {})
                console.log(data.data);
                props.setForcast(data.data);
            }).catch(error => {
                console.log(error);
                setErrorResp(true);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const currentWeatherRenderData = {
        component: <CurrentWeather />,
        style: {
            width: "100%",
            padding: "1rem",
            backgroundColor: "transparent",
        }
    }
    const weeklyWeatherDetailsRenderData = {
        component: <WeekWeatherComponent />,
        style: {
            width: "100%",
            height: "100%",
            padding: "2rem",
            backgroundColor: "rgba(255, 255, 255, .03)",
            position: "relative",
            top: "6rem",
        }
    }

    useEffect(() => {
        console.log(locationError);
    }, [locationError])

    const removePrompt = () => {
        setLocationError(false);
        const timeoutID = setTimeout(() => {
            console.log(location)

            if (location.loaded === true && location.coordinates.lat === "") {
                setLocationError(true);
                console.log("clicked")
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
                } else {
                    onError({
                        code: 0,
                        message: "GeoLocation not supported.",
                    })
                }
            }
        }, 4000)
        if (location.loaded === true && location.coordinates.lat !== "") {
            clearTimeout(timeoutID);
        }
    }

    const prompt = (message, removeCallBack) => {
        return <div>
            <div className='modal-dark-background' onClick={removeCallBack}></div>
            <div style={{ backgroundColor: "white", padding: "3rem", fontSize: "1.75rem", fontWeight: "800", position: 'absolute', left: "50%", top: "50%", transform: "translate(-50%)", borderRadius: "2rem" }}>
                {message}
            </div>
        </div>
    }
    console.log(location);
    return (
        <div className='home-screen-container'>
            <div className='home-screen-header'>
                <div className='search-component-wrapper'>
                    <div className='header-location' style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ color: "white", fontSize: "1.6rem", fontWeight: "600" }}>Temperature unit : &deg; C</div>
                        <div style={{ color: "white", fontSize: "1.6rem", fontWeight: "600" }}><FontAwesomeIcon icon={faLocationArrow} style={{ fontSize: '1.2rem', marginRight: '.4rem' }} />{!_.isEmpty(props.currentWeather) ? props.currentWeather.name : <LoadingSpinner />}</div>
                    </div>

                    <div style={{ display: 'flex', gap: "1rem" }}>
                        <InputComponent submit={submitCity} />
                    </div>
                </div>
            </div>
            <div className='home-weather-section'>
                <div className='width-66'>
                    <DisplayCard renderData={currentWeatherRenderData} />
                </div>
                <div className='width-30'>
                    <DisplayCard renderData={weeklyWeatherDetailsRenderData} />
                </div>
            </div>
            {
                locationError ? 
                    prompt("Please! Provide the location access from Settings.", removePrompt)
                    : null
            }
            {
                errorResp ?
                    prompt("Error in Fetching Data for this city!", () => setErrorResp(false))
                    :null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    location: state.locationReducer.location,
    currentWeather: state.currentWeatherReducer.currentWeather,
    forcast: state.forcastReducer.forcast,
    tempUnit: state.forcastReducer.tempUnit,
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentWeather: (payload) => dispatch(setCurrentWeather(payload)),
    setForcast: (payload) => dispatch(setForcastWeather(payload)),
    setTempUnit: (payload) => dispatch(setTempUnit(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)