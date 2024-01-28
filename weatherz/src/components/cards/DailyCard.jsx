import { weatherName } from "../../helper/weather-name";
import { weatherIcon } from "../../helper/weather-icon";

export default function DailyCard({ forecastData }) {
  // konversi nilai default (kelvin) ke celcius
  const convertKelvinToCelcius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <div className="row mt-3 mb-5">
      {forecastData && Array.isArray(forecastData) ? (
        forecastData.map((day) => (
          <div className="col-md">
            <div
              className="card d-flex align-items-start text-start p-2"
              style={{
                background:
                  "linear-gradient(355deg, rgba(229,242,255,1) 0%, rgba(145,201,255,1) 37%, rgba(29,144,255,1) 94%)",
              }}
              key={day.dt}
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
                  className="me-4"
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
        <p>
          {forecastData ? "Invalid forecast data" : "Loading forecast data..."}
        </p>
      )}
    </div>
  );
}
