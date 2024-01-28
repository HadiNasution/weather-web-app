import { useState, useEffect } from "react";
import axios from "axios";
import { weatherName } from "../../helper/weather-name";
import { weatherIcon } from "../../helper/weather-icon";
import { weatherBackground } from "../../helper/weather-background";
import { alertError } from "../alerts/SweetAlert";
import { MainCardSkeleton } from "../skeleton/CardSkeleton";

export default function MainCard() {
  const [weatherData, setWeatherData] = useState(null); // data dari api
  const [loading, setLoading] = useState(true); // state loading data
  const [error, setError] = useState(null); // state error

  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  // get geolokasi dari perangkat user
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

  // fetch datat cuaca ke api open weather
  const fetchWeatherDataByCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      setWeatherData(null);
      setError("Gagal mendapatkan data cuaca");
      setLoading(false);
    }
  };

  // konversi nilai default (kelvin) ke celcius
  const convertKelvinToCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  useEffect(() => {
    // get lokasi user saat halaman pertama dirender
    getLocation();
  }, []);

  return (
    <div>
      {loading ? (
        <MainCardSkeleton />
      ) : (
        <div className="row">
          <div className="col-md">
            <div
              className="card d-flex align-items-center text-center p-5"
              style={{
                background:
                  "linear-gradient(355deg, rgba(229,242,255,1) 0%, rgba(145,201,255,1) 37%, rgba(29,144,255,1) 94%)",
              }}
            >
              <div className="d-inline">
                <h2 className="fs-1 fw-bold">{weatherData.name}</h2>
                <p className="fs-4">
                  {weatherName(weatherData.weather[0].description)}
                </p>
              </div>
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
                    <strong>
                      {convertKelvinToCelcius(weatherData.main.temp)}
                    </strong>
                    &deg;<span className="fs-5">C</span>
                  </h2>
                  <h5 className="fs-5">
                    <span className="text-success m-1">
                      {convertKelvinToCelcius(weatherData.main.temp_min)}
                      &deg;
                    </span>
                    /
                    <span className="text-danger m-1">
                      {convertKelvinToCelcius(weatherData.main.temp_max)}
                      &deg;
                    </span>
                  </h5>
                  <p>
                    Kelembapan :{" "}
                    <span className="fw-bold">
                      {" "}
                      {weatherData.main.humidity}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
