import _ from 'lodash'
import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { API_KEY } from '../config/weatherAPI.config'
import useGeoLocation from '../hooks/useGeoLocation'
import { setCurrentWeather } from '../redux/actionCreators/currentWeatherActionCreator'
import HttpService from '../services/httpService'
import CurrentWeatherDetails from './current-weather-details'
import DisplayCard from './displayCard'

const CurrentWeather = (props) => {
    const currentWeatherDetailsRenderData = {
        component: <CurrentWeatherDetails />,
        style: {
            width: "100%",
            height: "fit-content",
            padding: "3rem",
            backgroundColor: "rgba(255, 255, 255, .018)",
        }
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <div className='current-weather-section'>
            <div className='greetings-wrapper'>
                <div className='greetings-name' >
                    <div className='home-greeting' style={{fontSize: "2rem", paddingLeft: ".7rem", color: "#E94C89"}}>Good Morning,</div> 
                    <div className='home-greeting' style={{color: "#E94C89"}} onClick={() => console.log("sdvhfdbjv")}>Abhishek</div>
                    <div className='sub-greeting-text'>Have a nice day!</div>
                </div>
                <div>
                    <div className='display-time'>
                        {
                            new Date(Date.now()).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                        }
                    </div>
                    <div className='sub-greeting-text'>
                        {
                            days[new Date(Date.now()).getDay()]
                        }, {
                            new Date(Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: "numeric" })
                        }
                    </div>
                </div>
            </div>
            <div style={{marginTop: "2rem"}}>
                <DisplayCard renderData={currentWeatherDetailsRenderData} />
            </div>
        </div>
    )
}


export default CurrentWeather