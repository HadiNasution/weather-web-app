import { useState } from "react";
import axios from "axios";

export default function SearchBar({ searched }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      searched(city);
      sessionStorage.setItem(city, response.data.name);
      sessionStorage.setItem(`${city}-temp`, response.data.main.temp);
      sessionStorage.setItem(`${city}-temp-max`, response.data.main.temp_max);
      sessionStorage.setItem(`${city}-temp-min`, response.data.main.temp_min);
      sessionStorage.setItem(
        `${city}-desc`,
        response.data.weather[0].description
      );
      sessionStorage.setItem(`${city}-humid`, response.data.main.humidity);
      setError(null);
    } catch (error) {
      setError("Data cuaca tidak tersedia");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="row mt-4">
      <div className="col-md">
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              className="form-control me-3"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cari tahu cuaca dikota lain..."
            />
            <button className="btn btn-success w-25" type="submit">
              Cari
            </button>
          </div>
        </form>
        {error && <h5>{error}</h5>}
      </div>
    </div>
  );
}
