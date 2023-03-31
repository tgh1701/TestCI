import { useRef, useState } from "react";
import "./index.css";
import { ListIcon } from "./icon";
const Api_key = "3f1c674e6ea497d25ef4311e8c3ac383";

const WeatherApp = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          ListIcon.filter((weather) => weather.type === data.weather[0].main)
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="weather-app">
      <div className="weather-app-container">
        <div className="search-bar">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="search-bar-input"
          />
          <div onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/751/751381.png"
              alt="Search Icon"
              className="search-bar-icon"
            />
          </div>
        </div>
        <div className={`weather-details ${showWeather ? "show" : ""}`}>
          {loading ? (
            <div className="load">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="Loading Icon"
                className="load-icon"
              />
            </div>
          ) : (
            showWeather && (
              <div className="weather-info">
                {apiData && (
                  <p className="location">
                    {apiData?.name + ", " + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt={showWeather[0]?.description}
                  className="weather-image"
                />

                <p className="weather-type">{showWeather[0]?.type}</p>
                {apiData && (
                  <>
                    <div className="temperature">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1843/1843544.png"
                        alt="Icon"
                        className="temperature-icon"
                      />
                      <p className="temperature-value">
                        {apiData?.main?.temp}&#176;C
                      </p>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/727/727790.png"
                        alt="Humidity Icon"
                        className="temperature-icon"
                      />
                      <p className="temperature-value">
                        {apiData?.main?.humidity}%
                      </p>

                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2299/2299296.png"
                        alt="Icon"
                        className="temperature-icon"
                      />
                      <p className="temperature-value">
                        {apiData?.main?.pressure}hPa
                      </p>

                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2011/2011448.png"
                        alt="Icon"
                        className="temperature-icon"
                      />
                      <p className="temperature-value">
                        {apiData?.wind?.speed}kph
                      </p>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
