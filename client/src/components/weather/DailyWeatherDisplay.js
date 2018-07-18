// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import OwlCarousel from 'react-owl-carousel2';

// IMPORT PROJECT REFERENCES
import { DailyWeatherForecastCard } from './DailyWeatherForecastCard';


const options = {
   
};


class DailyWeatherDisplay extends Component {

    constructor(props){
        super(props);
    }

    
    render() {
        return (
            <div className="daily-weather-display" style={{backgroundColor:'#bdedff'}}>
                               
                <div className="">
                    <div ref={el => this.carousel = el} options={options}>
                        {
                            !!this.props.dailyForecasts && this.props.dailyForecasts.map((fc, i) => (
                                <DailyWeatherForecastCard forecast={fc} key={i} />
                            ))
                        }
                    </div>
                </div>
                <div className="" style={{left: 0}}>
                    
                </div>
                <div className="" style={{right: 0}}>
                    
                </div>
            </div>
        );
    }
}


DailyWeatherDisplay.propTypes = {
    dailyForecasts: PropTypes.array.isRequired
};


export { DailyWeatherDisplay };