import React from 'react'
import './WeatherData.css'

export default function WeatherData({ weatherData }) {
  
  const getWeatherIcon = (temp) => {
    const desc = temp.toLowerCase();

    // rain.svg
    // mostly sunny.svg
    // sunny.svg
    // partly cloudy.svg
    // cloudy.svg

    return <img
          src={`/images/${desc}.svg`}
          alt={desc}
          className='icon-wrapper'
        ></img>;
  }  

  return (
    <div className="forecast-card">

      {/* Weather Icon */}
      {getWeatherIcon(weatherData.desc)}

      {/* High / Low Temp */}
      <div className="temp-container">
        <div className="temp-box">
          <div className="temp-label">High</div>
          <div className="temp-value">{weatherData.high}°</div>
        </div>

        <div className="temp-divider"></div>

        <div className="temp-box">
          <div className="temp-label">Low</div>
          <div className="temp-value">{weatherData.low}°</div>
        </div>
      </div>

      {/* Description */}
      <div className="weather-description">{weatherData.desc}</div>
    </div>
  )
}
