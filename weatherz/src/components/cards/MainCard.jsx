import { useState, useEffect } from "react";
import axios from "axios";
import { weatherName } from "../../helper/weather-name";
import { weatherIcon } from "../../helper/weather-icon";
import { alertError } from "../alerts/SweetAlert";
import { MainCardSkeleton } from "../skeleton/CardSkeleton";

export default function MainCard({ citySaved }) {
  const [weatherData, setWeatherData] = useState(null); // data dari api
  const [city, setCity] = useState(null);
  const [name, setName] = useState(null);
  const [temp, setTemp] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [desc, setDesc] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [loading, setLoading] = useState(true); // state loading data
  const [error, setError] = useState(null); // state error

  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  // get geolokasi dari perangkat user
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // jika koordinat berhasil didapatkan, maka fetch data
          fetchWeatherDataByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          // simpan koordinat untuk child lain
          sessionStorage.setItem("default-latitude", position.coords.latitude);
          sessionStorage.setItem(
            "default-longitude",
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
      sessionStorage.setItem("saved-city", 1);
      sessionStorage.setItem(
        `kota-default`,
        `${response.data.name} (Lokasi saat ini)`
      );
      sessionStorage.setItem(`default-temp`, response.data.main.temp);
      sessionStorage.setItem(`default-temp-max`, response.data.main.temp_max);
      sessionStorage.setItem(`default-temp-min`, response.data.main.temp_min);
      sessionStorage.setItem(
        `default-desc`,
        response.data.weather[0].description
      );
      sessionStorage.setItem(`default-humid`, response.data.main.humidity);
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
    if (citySaved) {
      const lowercaseCity = citySaved.toLowerCase();
      setCity(lowercaseCity);
      setName(sessionStorage.getItem(`kota-${lowercaseCity}`));
      setTemp(sessionStorage.getItem(`${lowercaseCity}-temp`));
      setTempMax(sessionStorage.getItem(`${lowercaseCity}-temp-max`));
      setTempMin(sessionStorage.getItem(`${lowercaseCity}-temp-min`));
      setDesc(sessionStorage.getItem(`${lowercaseCity}-desc`));
      setHumidity(sessionStorage.getItem(`${lowercaseCity}-humid`));
      if (city !== lowercaseCity) {
        setCity(lowercaseCity);
      }
    }
  }, [city, citySaved]);

  return (
    <div>
      {loading ? (
        <MainCardSkeleton />
      ) : (
        <div className="row mt-2">
          <div className="col-md">
            <div className="card d-flex align-items-center text-center p-5">
              <div className="d-inline">
                <h2 className="fs-1 fw-bold">{name || weatherData.name}</h2>
                <p className="fs-4">
                  {new Date().getDate()}{" "}
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                  })}{" "}
                  • {weatherName(desc || weatherData.weather[0].description)}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="ill me-4"
                  src={weatherIcon(desc || weatherData.weather[0].description)}
                  alt="illustrasi cuaca"
                  width={200}
                  height={200}
                />
                <div className="d-inline text-start">
                  <h2>
                    <strong>
                      {convertKelvinToCelcius(temp || weatherData.main.temp)}
                    </strong>
                    &deg;<span className="fs-5">C</span>
                  </h2>
                  <h5 className="fs-5">
                    <span className="text-success m-1">
                      {convertKelvinToCelcius(
                        tempMin || weatherData.main.temp_min
                      )}
                      &deg;
                    </span>
                    /
                    <span className="text-danger m-1">
                      {convertKelvinToCelcius(
                        tempMax || weatherData.main.temp_max
                      )}
                      &deg;
                    </span>
                  </h5>
                  <p>
                    Kelembapan :{" "}
                    <span className="fw-bold">
                      {" "}
                      {humidity || weatherData.main.humidity}%
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
