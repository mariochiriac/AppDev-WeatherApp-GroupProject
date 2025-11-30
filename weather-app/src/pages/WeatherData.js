import React from 'react'

export default function WeatherData({weatherData}) {
  return (
    <div>
        <p>Displaying weather data:</p>
        <ol>
               {weatherData.map((day, index) => (
                  <li key={index}>
                     High: {day.high}, Low: {day.low}, Desc: {day.desc}
                  </li>
               ))}
        </ol>
    </div>
  )
}
