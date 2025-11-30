import { useState, useEffect } from 'react';
import WeatherData from './WeatherData';
import DayNavigation from './DayNavigation';
import './Dashboard.css';

export default function WeatherDashboard() {
  const [zipcode, setZipcode] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleSearch = () => {
    if (zipcode.trim()) {
      setZipcode(zipcode.trim());
      fetchForecast();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < weatherData.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  async function fetchForecast() {
        setWeatherData([]);
        setLoading(true);
        setErrorMessage("");

        const url = `https://wp.zybooks.com/weather.php?zip=${zipcode}`;
        const response = await fetch(url);
        if (response.ok) {
        const result = await response.json();
        if (result.success) {
            setWeatherData(result.forecast);
        }
        else {
            setErrorMessage(result.error);
        }
        }
        else {
        setErrorMessage("Error in the response.");
        }

        setLoading(false);
      }

  return (
    <div className="page-container">
      <div className="content-wrapper">

        {/* Header */}
        <div className="header-container">
          <h1 className="header-title">Weather Dashboard</h1>
        </div>

        {/* Zipcode Input */}
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="zipcode-input"
            onKeyDown={handleKeyPress}
          />

          <button
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>

        {errorMessage.length > 0 && <p className='error-msg'>{errorMessage}</p>}

        {/* Weather Data Display */}
        {!isLoading && errorMessage.length === 0 ? (
          <div className="weather-data-container">
              <DayNavigation
                currentDay={currentDayIndex}
                totalDays={weatherData.length}
                onPrevious={handlePreviousDay}
                onNext={handleNextDay}
              />


              {/* Display fetched weather data here */}
              <WeatherData weatherData={weatherData[currentDayIndex]} />
          </div>
        ) : (<></>)}
        
      </div>
    </div>
  );
}