import { useState, useEffect } from "react";
import axios from "axios";
import { weatherName } from "../../helper/weather-name";
import { weatherIcon } from "../../helper/weather-icon";
import { alertError } from "../alerts/SweetAlert";

export default function MainCard() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherDataByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          alertError(
            "Gagal mendapatkan lokasi",
            "Pastikan perizinan lokasi sudah diizinkan."
          );
          setWeatherData(null);
          setError(
            "Gagal mendapatkan data cuaca, pastikan izin lokasi sudah dicentang"
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alertError(
        "Gagal mendapatkan lokasi",
        "Browser tidak mendukung fitur geolokasi."
      );
      setWeatherData(null);
      setError("Gagal mendapatkan data cuaca");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const fetchWeatherDataByCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      console.log(response);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("Gagal mendapatkan data cuaca");
    }
  };

  return (
    <div className="card d-flex align-items-center text-center p-5">
      <div>
        {weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <div className="d-flex align-items-center justify-content-center">
              <img
                className="me-4"
                src={weatherIcon(weatherData.weather[0].description)}
                alt="illustrasi cuaca"
                width={200}
                height={200}
              />
              <div className="d-inline text-start">
                <h2>
                  {Math.round(weatherData.main.temp - 273.15)}
                  &deg;C
                </h2>
                <h5 className="fs-5">
                  <span className="text-info m-1">
                    {Math.round(weatherData.main.temp_min - 273.15)}
                    &deg;
                  </span>
                  /
                  <span className="text-danger m-1">
                    {Math.round(weatherData.main.temp_max - 273.15)}
                    &deg;
                  </span>
                </h5>
                <p>
                  Kelembapan : {weatherData.main.humidity}% <br></br>
                  {weatherName(weatherData.weather[0].description)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
