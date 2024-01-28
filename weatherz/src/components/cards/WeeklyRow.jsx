import { useState, useEffect } from "react";
import axios from "axios";
import { alertError } from "../alerts/SweetAlert";
import { DailyCardSkeleton } from "../skeleton/CardSkeleton";
import DailyCard from "./DailyCard";

export default function WeeklyRow(latitude, longitude) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true); // state loading data
  const [error, setError] = useState(null); // state error

  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  // get geolokasi dari perangkat user
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchForecastData(
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
  const fetchForecastData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      // masukan data hasil ekstraksi ke state ForecastData
      setForecastData(getDailyForecast(response.data.list));
      console.log(response.data.list);
      setError(null);
      setLoading(false);
    } catch (error) {
      setForecastData(null);
      setLoading(false);
      setError("Failed to fetch forecast data");
    }
  };

  // ekstrak hanya data cuaca perhari yang diambil
  const getDailyForecast = (forecastList) => {
    // Buat objek untuk menyimpan ramalan cuaca per hari
    const dailyForecast = {};

    // Dapatkan tanggal hari ini
    const today = new Date();
    const todayDateString = today.toDateString();

    forecastList.forEach((item) => {
      // Ubah timestamp menjadi objek tanggal
      const forecastDate = new Date(item.dt * 1000);
      // Ambil tanggal sebagai kunci
      const dateKey = forecastDate.toDateString();

      // Jika belum ada ramalan cuaca untuk tanggal ini dan bukan hari ini, tambahkan ke dalam objek dailyForecast
      if (!dailyForecast[dateKey] && dateKey !== todayDateString) {
        dailyForecast[dateKey] = item;
      }
    });

    // Ubah objek dailyForecast menjadi array ramalan cuaca per hari
    return Object.values(dailyForecast);
  };

  useEffect(() => {
    // get lokasi user saat halaman pertama dirender
    getLocation();
  }, []);

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
        <DailyCard forecastData={forecastData} />
      )}
      {error && <p>{error}</p>}
    </>
  );
}
