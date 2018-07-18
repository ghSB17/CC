// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';

// IMPORT PROJECT REFERENCES
import { CurrentWeatherDisplay } from './CurrentWeatherDisplay';
import { DailyWeatherDisplay } from './DailyWeatherDisplay';
import { HourlyWeatherDisplay } from './HourlyWeatherDisplay';

// IMPORT PROJECT SERVICES
import { WeatherService } from '../../services/WeatherService';
import { GeolocationService } from '../../services/GeolocationService';

// INITIALIZE SERVICES
const weatherService = new WeatherService();
const geolocationService = new GeolocationService();


class WeatherDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCurrentWeather: false,
            showDailyWeather: false,
            showHourlyWeather: false
        };

        this.handleOnRefresh = this.handleOnRefresh.bind(this);
    }


    componentDidMount() {
        geolocationService
            .getCurrentPosition()
            .then(position => {
                console.log("$$$$$$$$$$")
                console.log(position)
                this.loadCurrentWeatherByPosition(position);
                this.loadDailyWeatherByPosition(position);
                this.loadHourlyWeatherByPosition(position);
            })
            .catch(error => console.log(error));      
    }


    loadCurrentWeatherByPosition(position) {
        
        if (!position) {
            throw Error('A valid position must be specified');
        }

        weatherService
            .getCurrentWeatherByPosition(position)
            .then(weather => {
                this.setState(() => ({ weather: weather, showCurrentWeather: true }));
            })
            .catch(error => console.log(error));
    }


    loadDailyWeatherByPosition(position) {
        
        if (!position) {
            throw Error('A valid position must be specified');
        }

        weatherService
            .getDailyWeatherByPosition(position)
            .then(dailyForecasts => {
                this.setState(() => ({ dailyForecasts: dailyForecasts, showDailyWeather: true }));
            })
            .catch(error => console.log(error));
    }


    loadHourlyWeatherByPosition(position) {
        
        if (!position) {
            throw Error('A valid position must be specified');
        }

        weatherService
            .getHourlyWeatherByPosition(position)
            .then(hourlyForecasts => {
                this.setState(() => ({ hourlyForecasts: hourlyForecasts, showHourlyWeather: true }));
            })
            .catch(error => console.log(error));
    }


    handleOnRefresh() {
        this.setState(() => ({
            showCurrentWeather: false,
            showDailyWeather: false,            
            
        }));

        geolocationService
            .getCurrentPosition()
            .then(position => {
                this.loadCurrentWeatherByPosition(position);
                this.loadDailyWeatherByPosition(position);
                
            })
            .catch(error => console.log(error));
    }


    showWeather() {
        return this.state.showCurrentWeather 
            && this.state.showDailyWeather 
            
    }


    showSpinner() {
        return !this.state.showCurrentWeather 
            || !this.state.showDailyWeather 
            
    }


    render() {
        return (
            <div>
                {
                    this.showWeather() &&
                    <div>
                        <CurrentWeatherDisplay weather={this.state.weather} onRefresh={this.handleOnRefresh} />
                        <DailyWeatherDisplay dailyForecasts={this.state.dailyForecasts} />
                       
                    </div>
                }
                {
                    
                }
            </div>
        );
    }
}


export { WeatherDashboard };