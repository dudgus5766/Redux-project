import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWeatherPending } from "../modules/weather";

const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.getWeather.data);

  console.log(weatherData);

  useEffect(() => {
    dispatch(getWeatherPending());
  }, [dispatch]);

  // 버튼으로 받아오기
  // const getWeatherBtn = (e) => {
  //   const val = e.target.value;
  //   dispatch(getWeatherPending(val));
  // };

  return (
    <div>
      <h1>{weatherData.area}</h1>
      <h3>
        {weatherData.lowTemp} °C / {weatherData.highTemp} °C
      </h3>
      {/* 
      버튼별로 보여주기
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
      </button> */}
    </div>
  );
};

export default Weather;
