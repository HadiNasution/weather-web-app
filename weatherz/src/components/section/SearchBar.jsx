import { useState, useEffect } from "react";
import axios from "axios";
import { weatherName } from "../../helper/weather-name";
import { weatherIcon } from "../../helper/weather-icon";

export default function SearchBar({ saved }) {
  const [savedCities, setSavedCities] = useState([]);
  const [count, setCount] = useState(0);
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hideSave, setHideSave] = useState(false);
  const API_KEY = "35ce8f528122778e74a1c0a286b1db2d";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setData(response.data);
      setLoading(false);
      setHideSave(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setHideSave(true);
      setError("Data cuaca tidak tersedia");
    }
  };

  const handleSave = () => {
    const savedCity = sessionStorage.getItem("saved-city");
    sessionStorage.setItem("saved-city", parseInt(savedCity) + 1);
    sessionStorage.setItem(`kota-${city}`, data.name);
    sessionStorage.setItem(`${city}-temp`, data.main.temp);
    sessionStorage.setItem(`${city}-temp-max`, data.main.temp_max);
    sessionStorage.setItem(`${city}-temp-min`, data.main.temp_min);
    sessionStorage.setItem(`${city}-desc`, data.weather[0].description);
    sessionStorage.setItem(`${city}-humid`, data.main.humidity);
    setCount(count + 1);
  };

  // konversi nilai default (kelvin) ke celcius
  const convertKelvinToCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  useEffect(() => {
    const savedCityKeys = Object.keys(sessionStorage).filter((key) =>
      key.startsWith("kota-")
    );
    const cities = savedCityKeys.map((key) => sessionStorage.getItem(key));
    setSavedCities(cities);
  }, [count]);

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
            <button
              className="btn btn-success w-25"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#searchedModal"
            >
              Cari
            </button>
          </div>
        </form>
        <div className="saved text-start mt-4">
          {savedCities.map((city, index) => (
            <button
              className="btn rounded-pill text-bg-light mt-1 me-2"
              key={index}
              onClick={() => saved(city)}
            >
              {city}
            </button>
          ))}
        </div>
        <div
          className="modal fade"
          id="searchedModal"
          tabIndex="-1"
          aria-labelledby="searchedModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="searchedModal">
                  Cuaca di kota {city}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="d-inline align-items-center text-center p-5">
                    {!error ? (
                      <>
                        <div className="d-inline">
                          <h2 className="fs-1 fw-bold">{data?.name}</h2>
                          <p className="fs-4">
                            {new Date().getDate()}{" "}
                            {new Date().toLocaleDateString("id-ID", {
                              weekday: "long",
                            })}{" "}
                            • {weatherName(data?.weather[0]?.description)}
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            className="ill me-4"
                            src={weatherIcon(data?.weather[0]?.description)}
                            alt="illustrasi cuaca"
                            width={200}
                            height={200}
                          />
                          <div className="d-inline text-start">
                            <h2>
                              <strong>
                                {convertKelvinToCelcius(data?.main?.temp)}
                              </strong>
                              &deg;<span className="fs-5">C</span>
                            </h2>
                            <h5 className="fs-5">
                              <span className="text-info m-1">
                                {convertKelvinToCelcius(data?.main?.temp_min)}
                                &deg;
                              </span>
                              /
                              <span className="text-danger m-1">
                                {convertKelvinToCelcius(data?.main?.temp_max)}
                                &deg;
                              </span>
                            </h5>
                            <p>
                              Kelembapan :{" "}
                              <span className="fw-bold">
                                {" "}
                                {data?.main?.humidity}%
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <h5>{error}</h5>
                    )}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  hidden={hideSave}
                  onClick={handleSave}
                  className="btn btn-primary w-100"
                >
                  Simpan Kota
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
