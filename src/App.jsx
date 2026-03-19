import { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Unable to fetch weather for current location");
            }
            const data = await response.json();
            setWeather(data);
            setCity(data.name);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        
        (err) => {
          setError("Unable to get current location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }
  return (
    <div style={{
      textAlign: 'center', padding: '50px', background: darkMode ? '#0d1117' : '#f0f0f0', minHeight: '100vh', color: darkMode ? '#c9d1d9' : '#333',
      transition: 'all 0.3s ease'
    }}>
      <h1 style={{color:darkMode ? 'white' : '#333'}}>Weather App</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px',
          background: darkMode ? '#333' : '#ddd',
          color: darkMode ? 'white' : 'black',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '24px',
          zIndex:10
        }}
      >
        {darkMode ? '☀️' : '🌙'}

      </button>
      <p>Enter a city to see the current weather</p>
      <form onSubmit={handleSubmit} style={{margin:'30px 0'}}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., Bangkok)"
          style={{
            padding: '12px',
            fontSize: '18px',
            width: '300px',
            borderRadius: '6px 0 0 6px',
            border: darkMode ? '1px solid #444' : '1px solid #ccc',
            outline: 'none',
            background: darkMode ? '#0d1117' : '#f0f0f0',
            color: darkMode ? '#c9d1d9' : '#333',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '18px',
            background: loading ? '#ccc' : '#238636',
            color: 'white',
            border: 'none',
            borderRadius: '0 6px 6px 0',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
        </form>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          style={{
            padding: '12px 24px',
            marginLeft: '10px',
            background: loading ? '#ccc' : '#4a5568',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Current Location
        </button>
      {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}
      
      {weather && (
        <div style={{
          background: darkMode ? '#161b22' : '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          maxWidth: '500px',
          margin:'30px auto',
          boxShadow:'0 4px 12px rgba(0,0,0,0.5)',
          transition:'background 0.3s ease'
        }}>
          <h2 style={{ marginBottom: '10px', color: darkMode ? 'white' : '#333' }}>{weather.name}, {weather.sys.country}</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              style={{width:'80px', height:'80px'}}
            />
            <p style={{ fontSize: '48px', margin: '10px 0' }}>
            {Math.round(weather.main.temp)}°C
            </p>
          </div>
          
          <p style={{ fontSize: '24px'}}>
            {weather.weather[0].description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
            <strong>Feels like:</strong>
            {Math.round(weather.main.feels_like)}°C
          <strong>Humidity:</strong> {weather.main.humidity}%
          <strong>Wind:</strong> {weather.wind.speed} m/s
          <strong>Pressure:</strong> {weather.main.pressure} hPa
          </div>
        </div>
      )}

    </div>
  )
}
export default App;