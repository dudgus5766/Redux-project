import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWeatherPending } from "../modules/weather";

const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.getWeather.data);

  useEffect(() => {
    dispatch(getWeatherPending());
  }, [dispatch]);

  return (
    <div>
      {weatherData.length !== 0 &&
        weatherData.map((data) => {
          return (
            <>
              <h1>{data.area}</h1>
              <h3>
                {data.lowTemp} °C / {data.highTemp} °C
              </h3>
            </>
          );
        })}
    </div>
  );
};

export default Weather;