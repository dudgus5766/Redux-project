import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
import { getWeatherPending } from "../modules/weather";

const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.getWeather.data);

  // useEffect(() => {
  //   dispatch(getWeatherPending());
  // }, [dispatch]);

  const getWeatherBtn = (e) => {
    const val = e.target.value;
    dispatch(getWeatherPending(val));
  };

  return (
    <div>
      {/* {weatherData.length !== 0 &&
        weatherData.map((data) => {
          return (
            <>
              <h1>{data.area}</h1>
              <h3>
                {data.lowTemp} °C / {data.highTemp} °C
              </h3>
            </>
          );
        })} */}

      <h1>{weatherData.area}</h1>
      <h3>
        {weatherData.lowTemp} °C / {weatherData.highTemp} °C
      </h3>

      <button onClick={getWeatherBtn} value="Seoul">
        서울 날씨보기
      </button>
      <button onClick={getWeatherBtn} value="Daejeon">
        대전 날씨보기
      </button>
      <button onClick={getWeatherBtn} value="Gwangju">
        광주 날씨보기
      </button>
    </div>
  );
};

export default Weather;
