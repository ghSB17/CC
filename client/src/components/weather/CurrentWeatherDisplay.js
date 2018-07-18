// IMPORT PACKAGE REFERENCES
import React from 'react';
import PropTypes from 'prop-types';


const getUpdateTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padEnd(2, '0');
    return `${hours}:${minutes}`;
};

const CurrentWeatherDisplay = (props) => {
    
    const { weather } = props;
    
    return (
        <div className="current-weather-display" style={{position: 'relative', backgroundColor:'#addfff'}}>
            <div className="weather-location">{weather.location.name}</div>
            <div className="weather-min-max-temp">{weather.temperature.maximum}&deg; | {weather.temperature.minimum}&deg;</div>
            <div className="weather-current">                
                <span className="weather-temp">{parseInt(weather.temperature.current)} &deg;&nbsp;<sup>F</sup></span>
            </div>
            <div className="weather-condition">
                <img className="weather-icon" src={weather.icon} style={{width: 'auto'}}/>
                <span className="weather-description">{weather.condition}</span>
            </div>            
            
        </div>
    );
};


CurrentWeatherDisplay.propTypes = {
    onRefresh: PropTypes.func.isRequired,
    weather: PropTypes.object.isRequired
};


export { CurrentWeatherDisplay };