import { faCloud } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Cloud from './art/cloud'
import Sun from './art/sun'
import DisplayCard from './displayCard'
import LoadingSpinner from './loading-spinner'

const WeekWeatherComponent = (props) => {

    const childComponentStyle = {
        width: "15rem",
        height: "15rem",
    }

    const returnArt = () => {
        if (!_.isEmpty(props.currentWeather)) {
            if (props.currentWeather.weather[0].description.includes("cloud") || props.currentWeather.weather[0].description.includes("rain"))  {
                return <Cloud /> 
            } else {
                return <Sun style={childComponentStyle} />
            }
        } 
        return <LoadingSpinner />
    }

    const showSunnyWeatherImage = {
        component: returnArt(),
        style: {
            backgroundColor: "transparent",
            position: "relative",
            bottom: "8rem",
            right: "3rem",
        },
    }

    console.log(props.currentWeather);

    const renderTodaysWeather = (type, value, unit) => {
        const renderDataComponent = () => {
            return (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", gap: "1rem"}}>
                    <div>{!_.isEmpty(props.currentWeather)? <><span style={{fontSize: "2.5rem"}}>{value}</span> <span style={{fontSize: "1.5rem", marginLeft: ".1rem"}}>{unit}</span></> : <LoadingSpinner /> }</div>
                    <div style={{opacity: ".5", fontSize: "1.3rem", fontWeight: "600", letterSpacing: ".1rem"}}>{_.startCase(type)}</div>
                </div>
            )
        }
        const renderData = {
            component: renderDataComponent(),
            style: {
                width: "11rem",
                height: "11rem",
                // backgroundColor: "#0A153D",
                backgroundColor: "rgba(255, 255, 255, .03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }
        }
        return (
            <DisplayCard renderData={renderData}/>
        )
    }
    console.log(_.get(props.currentWeather, ["sys", "sunrise"]));
    console.log(new Date(_.get(props.currentWeather, ["sys", "sunrise"]) * 1000));
    return (
        <div className='week-weather-section'>
            <DisplayCard renderData={showSunnyWeatherImage} />
            <div style={{fontSize: "8rem", color: "white", textAlign: "center"}}>{!_.isEmpty(props.currentWeather)? _.get(props.currentWeather, ["main", "temp"]): <LoadingSpinner />}&deg;</div>
            <div className='weather-label'>{_.startCase(_.get(props.currentWeather, ['weather', 0, 'description']))}</div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "3rem", gap: "2rem"}}>
                {renderTodaysWeather('humidity', _.get(props.currentWeather, ["main", "humidity"]), "%")}
                {renderTodaysWeather('pressure', _.get(props.currentWeather, ["main", "pressure"]), "hPa")}
                {renderTodaysWeather('wind', _.get(props.currentWeather, ["wind", "speed"]), "m/s")}
                {renderTodaysWeather('visibility', (_.get(props.currentWeather, ["visibility"]) / 1000), "km/h")}
                {renderTodaysWeather('sunrise', new Date(_.get(props.currentWeather, ["sys", "sunrise"]) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))}
                {renderTodaysWeather('sunset', new Date(_.get(props.currentWeather, ["sys", "sunset"]) * 1000).toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit", hour12: false}))}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    currentWeather: state.currentWeatherReducer.currentWeather,
})

export default connect(mapStateToProps, undefined)(WeekWeatherComponent)