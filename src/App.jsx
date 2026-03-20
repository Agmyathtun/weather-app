// import { useState } from "react";
// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

//   const fetchWeather = async () => {
//     if (!city.trim()) {
//       setError("Please enter a city name.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setWeather(null);
//     try {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("City not found");
//       }
//       const data = await response.json();
//       setWeather(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeather();
//   };
//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       setLoading(true);
//       setError(null);
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           try {
//             const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
//             const response = await fetch(url);
//             if (!response.ok) {
//               throw new Error("Unable to fetch weather for current location");
//             }
//             const data = await response.json();
//             setWeather(data);
//             setCity(data.name);
//           } catch (err) {
//             setError(err.message);
//           } finally {
//             setLoading(false);
//           }
//         },
        
//         (err) => {
//           setError("Unable to get current location");
//           setLoading(false);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   }
//   return (
//     <div style={{
//       textAlign: 'center', padding: '50px', background: darkMode ? '#0d1117' : '#f0f0f0', minHeight: '100vh', color: darkMode ? '#c9d1d9' : '#333',
//       transition: 'all 0.3s ease'
//     }}>
//       <h1 style={{color:darkMode ? 'white' : '#333'}}>Weather App</h1>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           right: '20px',
//           padding: '10px',
//           background: darkMode ? '#333' : '#ddd',
//           color: darkMode ? 'white' : 'black',
//           border: 'none',
//           borderRadius: '50%',
//           cursor: 'pointer',
//           fontSize: '24px',
//           zIndex:10
//         }}
//       >
//         {darkMode ? '☀️' : '🌙'}

//       </button>
//       <p>Enter a city to see the current weather</p>
//       <form onSubmit={handleSubmit} style={{margin:'30px 0'}}>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name (e.g., Bangkok)"
//           style={{
//             padding: '12px',
//             fontSize: '18px',
//             width: '300px',
//             borderRadius: '6px 0 0 6px',
//             border: darkMode ? '1px solid #444' : '1px solid #ccc',
//             outline: 'none',
//             background: darkMode ? '#0d1117' : '#f0f0f0',
//             color: darkMode ? '#c9d1d9' : '#333',
//           }}
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             padding: '12px 24px',
//             fontSize: '18px',
//             background: loading ? '#ccc' : '#238636',
//             color: 'white',
//             border: 'none',
//             borderRadius: '0 6px 6px 0',
//             cursor: loading ? 'not-allowed' : 'pointer'
//           }}
//         >
//           {loading ? 'Loading...' : 'Search'}
//         </button>
//         </form>
//         <button
//           type="button"
//           onClick={getCurrentLocation}
//           disabled={loading}
//           style={{
//             padding: '12px 24px',
//             marginLeft: '10px',
//             background: loading ? '#ccc' : '#4a5568',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: loading ? 'not-allowed' : 'pointer'
//           }}
//         >
//           Current Location
//         </button>
//       {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}
      
//       {weather && (
//         <div style={{
//           background: darkMode ? '#161b22' : '#ffffff',
//           padding: '30px',
//           borderRadius: '12px',
//           maxWidth: '500px',
//           margin:'30px auto',
//           boxShadow:'0 4px 12px rgba(0,0,0,0.5)',
//           transition:'background 0.3s ease'
//         }}>
//           <h2 style={{ marginBottom: '10px', color: darkMode ? 'white' : '#333' }}>{weather.name}, {weather.sys.country}</h2>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
//             <img
//               src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//               alt={weather.weather[0].description}
//               style={{width:'80px', height:'80px'}}
//             />
//             <p style={{ fontSize: '48px', margin: '10px 0' }}>
//             {Math.round(weather.main.temp)}°C
//             </p>
//           </div>
          
//           <p style={{ fontSize: '24px'}}>
//             {weather.weather[0].description}
//           </p>

//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
//             <strong>Feels like:</strong>
//             {Math.round(weather.main.feels_like)}°C
//           <strong>Humidity:</strong> {weather.main.humidity}%
//           <strong>Wind:</strong> {weather.wind.speed} m/s
//           <strong>Pressure:</strong> {weather.main.pressure} hPa
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }
// export default App;
import { useState, useEffect } from "react";

function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    if (w <= 480) return "mobile";
    if (w <= 768) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      if (w <= 480) setBp("mobile");
      else if (w <= 768) setBp("tablet");
      else setBp("desktop");
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return bp;
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const bp = useBreakpoint();

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isDesktop = bp === "desktop";

  // ── Color tokens ─────────────────────────────────────────
  const color = {
    bg:       darkMode ? "#0d1117"  : "#f7f4ef",
    text:     darkMode ? "#c9d1d9"  : "#1a1a1a",
    card:     darkMode ? "#161b22"  : "#ffffff",
    statBg:   darkMode ? "#0d1117"  : "#f7f4ef",
    toggleBg: darkMode ? "#21262d"  : "#e4e0d8",
    locBg:    darkMode ? "#21262d"  : "#e4e0d8",
    inputBg:  darkMode ? "#161b22"  : "#ffffff",
    accent:   "#238636",
    error:    "#f85149",
  };

  // ── Inline style objects ──────────────────────────────────
  const s = {
    app: {
      minHeight: "100vh",
      padding: isMobile ? "24px 14px" : isTablet ? "30px 16px" : "60px 40px",
      background: color.bg,
      color: color.text,
      transition: "background 0.4s ease, color 0.4s ease",
      position: "relative",
      overflowX: "hidden",
      boxSizing: "border-box",
    },

    container: {
      maxWidth: isDesktop ? "680px" : "640px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    },

    header: {
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "space-between",
      marginBottom: isMobile ? "20px" : isTablet ? "28px" : "48px",
    },

    title: {
      fontWeight: 800,
      fontSize: isMobile ? "1.75rem" : isTablet ? "2.2rem" : "3rem",
      letterSpacing: isMobile ? "-0.03em" : "-0.02em",
      lineHeight: 1,
      color: color.text,
    },

    titleAccent: {
      color: color.accent,
    },

    subtitle: {
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      opacity: 0.55,
      marginTop: isMobile ? "3px" : "4px",
      fontWeight: 300,
    },

    toggleBtn: {
      width: isMobile ? "40px" : "48px",
      height: isMobile ? "40px" : "48px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      fontSize: isMobile ? "17px" : "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: color.toggleBg,
      transition: "background 0.3s ease, transform 0.2s ease",
      flexShrink: 0,
      marginTop: isMobile ? "4px" : 0,
    },

    searchSection: {
      marginBottom: "28px",
    },

    inputRow: {
      display: "flex",
      flexDirection: "row",
      gap: isMobile ? "8px" : "0",
      borderRadius: isMobile ? "0" : "12px",
      overflow: isMobile ? "visible" : "hidden",
      boxShadow: isMobile ? "none" : "0 2px 16px rgba(0,0,0,0.08)",
      marginBottom: "12px",
    },

    cityInput: {
      flex: 1,
      minWidth: 0,
      padding: isMobile ? "13px 14px" : "14px 18px",
      fontSize: isMobile ? "0.95rem" : "1rem",
      border: "none",
      outline: "none",
      background: color.inputBg,
      color: color.text,
      transition: "background 0.3s ease, color 0.3s ease",
      borderRadius: isMobile ? "10px" : "0",
      boxShadow: isMobile ? "0 2px 10px rgba(0,0,0,0.07)" : "none",
    },

    searchBtn: {
      flexShrink: 0,
      padding: isMobile ? "13px 16px" : "14px 24px",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      fontWeight: 600,
      background: loading ? "#888" : color.accent,
      color: "white",
      border: "none",
      borderRadius: isMobile ? "10px" : "0",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.2s ease",
      whiteSpace: "nowrap",
      letterSpacing: isMobile ? "0.01em" : "normal",
      boxShadow: isMobile ? "0 2px 10px rgba(35,134,54,0.2)" : "none",
    },

    locationBtn: {
      width: "100%",
      padding: isMobile ? "11px 16px" : "12px 20px",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontWeight: 500,
      border: "none",
      borderRadius: "10px",
      cursor: loading ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      background: color.locBg,
      color: color.text,
      opacity: loading ? 0.6 : 1,
      transition: "background 0.2s ease, transform 0.15s ease",
    },

    errorMsg: {
      background: "rgba(248,81,73,0.1)",
      border: "1px solid rgba(248,81,73,0.3)",
      color: color.error,
      padding: "12px 16px",
      borderRadius: "10px",
      fontSize: "0.9rem",
      marginBottom: "20px",
    },

    weatherCard: {
      borderRadius: isMobile ? "16px" : isTablet ? "18px" : "20px",
      padding: isMobile ? "20px 16px" : isTablet ? "24px" : "40px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      background: color.card,
      transition: "background 0.3s ease",
      animation: "slideUp 0.4s ease",
    },

    locationName: {
      fontWeight: 700,
      fontSize: isMobile ? "1.3rem" : isTablet ? "1.5rem" : "1.9rem",
      marginBottom: isMobile ? "14px" : "20px",
      letterSpacing: isMobile ? "-0.02em" : "-0.01em",
      color: color.text,
    },

    tempRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: isMobile ? "10px" : isTablet ? "12px" : "16px",
      marginBottom: isMobile ? "8px" : "12px",
    },

    weatherIcon: {
      width: isMobile ? "56px" : isTablet ? "60px" : "72px",
      height: isMobile ? "56px" : isTablet ? "60px" : "72px",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
    },

    tempValue: {
      fontWeight: 800,
      fontSize: isMobile ? "3rem" : isTablet ? "3.5rem" : "4.5rem",
      letterSpacing: isMobile ? "-0.05em" : "-0.04em",
      lineHeight: 1,
      color: color.text,
    },

    weatherDesc: {
      fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.2rem",
      opacity: 0.65,
      textTransform: "capitalize",
      marginBottom: isMobile ? "18px" : "28px",
      fontWeight: 300,
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "1fr 1fr",
      gap: isMobile ? "8px" : "12px",
    },

    statItem: {
      borderRadius: isMobile ? "10px" : "12px",
      padding: isMobile ? "12px 10px" : "16px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      background: color.statBg,
      transition: "background 0.3s ease",
    },

    statLabel: {
      fontSize: isMobile ? "0.7rem" : "0.75rem",
      textTransform: "uppercase",
      letterSpacing: isMobile ? "0.06em" : "0.08em",
      opacity: 0.45,
      fontWeight: 500,
    },

    statValue: {
      fontWeight: 700,
      fontSize: isMobile ? "1rem" : isTablet ? "1.1rem" : "1.35rem",
      letterSpacing: "-0.01em",
      color: color.text,
    },

    loadingState: {
      textAlign: "center",
      padding: "40px",
      opacity: 0.5,
      fontSize: "0.9rem",
    },
  };

  // ── Handlers ─────────────────────────────────────────────
  const fetchWeather = async () => {
    if (!city.trim()) { setError("Please enter a city name."); return; }
    setLoading(true); setError(null); setWeather(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      setWeather(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); fetchWeather(); };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) { setError("Geolocation is not supported by this browser."); return; }
    setLoading(true); setError(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Unable to fetch weather for current location");
          const data = await res.json();
          setWeather(data); setCity(data.name);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => { setError("Unable to get current location"); setLoading(false); }
    );
  };

  // ── Render ───────────────────────────────────────────────
  return (
    <>
      {/* Minimal global styles: keyframe + reset + placeholder */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { opacity: 0.4; }
      `}</style>

      {/* Decorative background blob */}
      <div style={{
        position: "fixed", top: "-20%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(35,134,54,0.12), transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={s.app}>
        <div style={s.container}>

          {/* Header */}
          <div style={s.header}>
            <div style={{ display: "flex", flexDirection: "column", padding:'0', margin:'0', textAlign: 'left' }}>
              <h1 style={s.title}>
                Weather
              </h1>
              <p style={s.subtitle}>Real-time forecasts anywhere</p>
            </div>
            <button style={s.toggleBtn} onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Search */}
          <div style={s.searchSection}>
            <form onSubmit={handleSubmit}>
              <div style={s.inputRow}>
                <input
                  style={s.cityInput}
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name (e.g., Bangkok)"
                />
                <button style={s.searchBtn} type="submit" disabled={loading}>
                  {loading ? "Loading…" : "Search"}
                </button>
              </div>
            </form>
            <button style={s.locationBtn} type="button" onClick={getCurrentLocation} disabled={loading}>
              📍 Use Current Location
            </button>
          </div>

          {/* Error */}
          {error && <div style={s.errorMsg}>{error}</div>}

          {/* Loading */}
          {loading && !weather && (
            <div style={s.loadingState}>Fetching weather data…</div>
          )}

          {/* Weather Card */}
          {weather && (
            <div style={s.weatherCard}>
              <div style={s.locationName}>
                {weather.name}, {weather.sys.country}
              </div>

              <div style={s.tempRow}>
                <img
                  style={s.weatherIcon}
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <div style={s.tempValue}>
                  {Math.round(weather.main.temp)}°C
                </div>
              </div>

              <div style={s.weatherDesc}>
                {weather.weather[0].description}
              </div>

              <div style={s.statsGrid}>
                <div style={s.statItem}>
                  <span style={s.statLabel}>Feels Like</span>
                  <span style={s.statValue}>{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statLabel}>Humidity</span>
                  <span style={s.statValue}>{weather.main.humidity}%</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statLabel}>Wind</span>
                  <span style={s.statValue}>{weather.wind.speed} m/s</span>
                </div>
                <div style={s.statItem}>
                  <span style={s.statLabel}>Pressure</span>
                  <span style={s.statValue}>{weather.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default App;