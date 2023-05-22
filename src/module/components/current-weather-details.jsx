import { faCloud, faLocationArrow } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import DisplayCard from './displayCard'
import LineGraph from './line-graph'
import LoadingSpinner from './loading-spinner'

const CurrentWeatherDetails = (props) => {

    const [dayData, setDayData] = useState({
        day: '',
        list: [],
        currentDay: true,
        currentData: {},
    });
    const [whichMap, setWhichMap] = useState('TEMP');
    const [weatherPlotData, setWeatherPlotData] = useState([]);

    const filterDataForGraph = () => {
        const mapData = dayData.list.map(e => {
            return [
                e.dt,
                whichMap === "TEMP" ? e.main.temp : whichMap === "HUMIDITY" ? e.main.humidity : whichMap === "WIND" ? e.wind.speed : 0
            ]
        })
        return mapData;
    }



    useEffect(() => {
        console.log(1)
        console.log(weatherPlotData);
        if (_.isEmpty(weatherPlotData) && !_.isEmpty(dayData.list)) {
            console.log(1.1);
            setWeatherPlotData(filterDataForGraph());
        }
    }, [weatherPlotData])


    useEffect(() => {
        console.log(2);
        if (!_.isEmpty(dayData.list)) {
            setWeatherPlotData([]);
        }
    }, [whichMap])

    useEffect(() => {
        console.log(3)
        if (!_.isEmpty(dayData.list)) {
            setWeatherPlotData([]);
        }
    }, [dayData.list])


    useEffect(() => {
        console.log(4);
        if (!_.isEmpty(props.forcast)) {
            Object.keys(props.forcast.list).forEach((e, i) => {
                if (i === 0) {
                    const currentDayTimeData = props.forcast.list[e].reduce((a, el) => {
                        if (el.dt * 1000 < Date.now()) {
                            a.push(el);
                        }
                        return a
                    }, [])
                    console.log(currentDayTimeData);
                    setDayData({
                        day: e,
                        list: props.forcast.list[e],
                        currentDay: e === new Date(Date.now()).getDay() ? true : false,
                        currentData: currentDayTimeData.length === 0 ? props.forcast.list[e][0] : currentDayTimeData[0],
                    })
                }
            })
        }
    }, [props.forcast])

    const lineGraphRenderData = {
        component: !_.isEmpty(weatherPlotData) ? <LineGraph data={weatherPlotData} name={whichMap} /> : <LoadingSpinner />,
        style: {
            width: "100%",
            height: "100%",
            padding: "1.5rem",
            backgroundColor: "rgba(255, 255, 255, .03)",
        }
    }
    const renderWeatherDaySelectionCards = (list, day) => {
        const renderweatherDaySelectionUI = () => {
            return (
                <div  style={{ color: "white", fontSize: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", cursor: "pointer" }} onClick={() => {
                    const currentDayTimeData = list.reduce((a, e) => {
                        console.log(e.dt * 1000 < Date.now());
                        console.log(e.dt * 1000);
                        console.log(Date.now());
                        if (e.dt * 1000 < Date.now()) {
                            a.push(e);
                        }
                        return a
                    }, [])
                    console.log(currentDayTimeData);
                    setDayData({
                        day,
                        list,
                        currentDay: day === new Date(Date.now()).getDay() ? true : false,
                        currentData: currentDayTimeData.length === 0 ? list[0] : currentDayTimeData[0],
                    })
                }}>
                    <div style={{ fontSize: "2rem" }}>{day.slice(0, 3)}</div>
                    <FontAwesomeIcon style={{ fontSize: "4rem" }} icon={faCloud} />
                    <div style={{ fontSize: "1.4rem", fontWeight: "600" }}>{_.get(list, [0, "main", "temp_min"])}&deg; / {_.get(list, [0, "main", "temp_max"])}&deg;</div>
                </div>
            )
        }
        const renderData = {
            component: renderweatherDaySelectionUI(),
            style: {
                width: "10rem",
                height: "13rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, .03)",
            }
        }
        return (
            <DisplayCard renderData={renderData} />
        )
    }

    console.log(dayData);
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "3rem" }}>
            <div className='upper' style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                <div className='current-temp' style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    <FontAwesomeIcon style={{ fontSize: "4rem" }} icon={faCloud} />
                    <div style={{ display: "flex" }}>
                        <div style={{ fontSize: "5rem" }}>
                            {!_.isEmpty(dayData.currentData) ? dayData.currentData.main.temp : <LoadingSpinner />}
                        </div>
                        <div style={{ fontSize: "2rem" }}>&deg; C</div>
                    </div>
                    <div>
                        <div className='label'  style={{ fontSize: "1.5rem", letterSpacing: ".1rem" }}>Pressure: {!_.isEmpty(dayData.currentData) ? dayData.currentData.main.pressure : null} hPa</div>
                        <div className='label' style={{ fontSize: "1.5rem", letterSpacing: ".1rem" }}>Humidity: {!_.isEmpty(dayData.currentData) ? dayData.currentData.main.humidity : null}%</div>
                        <div className='label' style={{ fontSize: "1.5rem", letterSpacing: ".1rem" }}>Wind: {!_.isEmpty(dayData.currentData) ? dayData.currentData.wind.speed : null} km/h</div>
                    </div>
                </div>
                <div className='label'>
                    <div className='label' style={{ fontSize: "2rem", fontWeight: "600", textAlign: "right" }}>{!_.isEmpty(dayData.currentData) ? _.startCase(dayData.currentData.weather[0].description) : null}</div>
                    <div className='label' style={{ fontSize: "2rem", fontWeight: "400", textAlign: "right" }}>{!_.isEmpty(dayData.day) ? dayData.day : <LoadingSpinner />}</div>
                </div>
            </div>
            <ul className='details-nav'>
                <li onClick={() => { setWhichMap("TEMP"); }}>Temperature</li>
                <li onClick={() => { setWhichMap("HUMIDITY"); }}>Humidity</li>
                <li onClick={() => { setWhichMap("WIND"); }}>Wind</li>
            </ul>
            <div style={{ color: "white", height: "24rem" }}>
                <DisplayCard renderData={lineGraphRenderData} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", width: "100%", flexWrap: "wrap", alignContent: "space-between" }}>
                {
                    !_.isEmpty(props.forcast) ?
                        Object.keys(props.forcast.list).map(e => {
                            return renderWeatherDaySelectionCards(props.forcast.list[e], e)
                        })
                        : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    forcast: state.forcastReducer.forcast,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeatherDetails)