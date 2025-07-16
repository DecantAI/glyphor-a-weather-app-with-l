Here's a simple React application using hooks to fetch weather data from OpenWeatherMap API.

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=<Your_API_Key>`
      );
      setWeather(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search location"
        />
        <button type="submit">Search</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <h3>{Math.round(weather.main.temp - 273.15)}°C</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

This is a basic example and does not include some of the more complex features you might want for a full-featured weather app, such as a detailed forecast or geolocation. Additionally, you will need to replace `<Your_API_Key>` with your actual OpenWeatherMap API key. Make sure to add error handling for failed API requests.

Please note that the API call to OpenWeatherMap is over HTTP, not HTTPS. This is okay for a basic example, but for a production application, you should use HTTPS to ensure the security of your application. 

Finally, the styling isn't included in this example, but you could add your own CSS or use a CSS-in-JS library like styled-components to make your app look great.