import React from 'react'
import './WeatherData.css'

export default function WeatherData({ weatherData }) {
  return (
    <div className="forecast-container">
        {weatherData.map((day, index) => (
          <div key={index}>
            <div className="forecast-card">

              {/* Weather Icon */}
              <div className="icon-wrapper">
                
              </div>

              {/* High / Low Temp */}
              <div className="temp-container">
                <div className="temp-box">
                  <div className="temp-label">High</div>
                  <div className="temp-value">{day.high}°</div>
                </div>

                <div className="temp-divider"></div>

                <div className="temp-box">
                  <div className="temp-label">Low</div>
                  <div className="temp-value">{day.low}°</div>
                </div>
              </div>

              {/* Description */}
              <div className="weather-description">{day.desc}</div>
            </div>
          </div>
        ))}
    </div>
  )
}
