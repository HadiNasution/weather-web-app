import { useState, useEffect } from "react";
import axios from "axios";
import { DailyCardSkeleton } from "../skeleton/CardSkeleton";
import { weatherName } from "../../helper/weather-name";
import { weatherIcon } from "../../helper/weather-icon";
import { convertKelvinToCelcius } from "../../helper/tempConverter";

export default function DailyCard() {
  const [forecastData, setForecastData] = useState(null); // data perkiraan cuaca perhari
  const [loading, setLoading] = useState(true); // flag untuk load skeleton
  const [error, setError] = useState(null); // flag untuk error handling
  const [defaultLatitude, setDefaultLatitude] = useState(0); // koordinat dari MainCard
  const [defaultLongitude, setDefaultLongitude] = useState(0);

  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  // fetch data perkiraan cuaca (+5 hari)
  const fetchForecastData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        // endpoint forecast
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      // masukan data hasil ekstraksi ke state ForecastData
      setForecastData(getDailyForecast(response.data.list));
      // handle flag
      setError(null);
      setLoading(false);
    } catch (error) {
      setForecastData(null);
      setLoading(false);
      setError("Failed to fetch forecast data");
    }
  };

  useEffect(() => {
    // get koordinat saat halaman pertama dirender
    setDefaultLatitude(sessionStorage.getItem("default-latitude"));
    setDefaultLongitude(sessionStorage.getItem("default-longitude"));
    // dan fetch data based on koordinat
    fetchForecastData(defaultLatitude, defaultLongitude);
  }, []);

  // ekstrak hanya data cuaca perhari yang diambil
  const getDailyForecast = (forecastList) => {
    // objek untuk menyimpan ramalan cuaca per hari
    const dailyForecast = {};

    // tanggal hari ini
    const today = new Date();
    const todayDateString = today.toDateString();

    forecastList.forEach((item) => {
      // ubah timestamp menjadi objek tanggal
      const forecastDate = new Date(item.dt * 1000);
      // get tanggal sebagai kunci
      const dateKey = forecastDate.toDateString();

      // jika belum ada ramalan cuaca untuk tanggal ini dan bukan hari ini, tambahkan ke dalam objek dailyForecast
      if (!dailyForecast[dateKey] && dateKey !== todayDateString) {
        dailyForecast[dateKey] = item;
      }
    });

    // ubah objek dailyForecast menjadi array ramalan cuaca per hari
    return Object.values(dailyForecast);
  };

  return (
    <>
      {loading ? (
        <div className="row">
          <div className="col-md">
            <DailyCardSkeleton />
          </div>
          <div className="col-md">
            <DailyCardSkeleton />
          </div>
          <div className="col-md">
            <DailyCardSkeleton />
          </div>
          <div className="col-md">
            <DailyCardSkeleton />
          </div>
          <div className="col-md">
            <DailyCardSkeleton />
          </div>
        </div>
      ) : (
        <div className="row mt-4 mb-5">
          {forecastData && Array.isArray(forecastData) ? (
            forecastData.map((day) => (
              <div className="col-md mt-2" key={day.dt}>
                <div
                  className="card d-flex align-items-start text-start p-3"
                  id="daily-card"
                >
                  <div className="d-inline">
                    <h2 className="fs-3 fw-bold">
                      {new Date(day.dt * 1000).toLocaleDateString("id-ID", {
                        weekday: "long",
                      })}
                    </h2>
                    <p className="fs-4">
                      {weatherName(day.weather[0].description)}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="ill me-4"
                      src={weatherIcon(day.weather[0].description)}
                      alt="illustrasi cuaca"
                      width={80}
                      height={80}
                    />
                    <div className="d-inline text-start">
                      <h2>
                        <strong>{convertKelvinToCelcius(day.main.temp)}</strong>
                        &deg;<span className="fs-5">C</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>{forecastData ? "Gagal mendapatkan data" : "Loading data..."}</p>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
