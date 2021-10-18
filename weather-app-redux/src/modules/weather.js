import { call, put, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

import axios from "axios";

//액션 정의
const GET_WEATHER_PENDING = "GET_WEATHER_PENDING";
const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";

//액션 생성자

export const getWeatherSuccess = (result) => ({
  type: GET_WEATHER_SUCCESS,
  payload: result,
});

export const getWeatherPending = () => ({
  type: GET_WEATHER_PENDING,
});

function countdown(secs) {
  return eventChannel((emitter) => {
    const iv = setInterval(async () => {
      secs -= 1;
      if (secs > 0) {
        const result = await axios.get(
          "http://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&APPID=e75a0a68adc50371c5898d8d43931062"
        );
        emitter(result);
      } else {
        emitter(END);
      }
    }, 1000);
    return () => {
      clearInterval(iv);
    };
  });
}

export function* weatherSaga() {
  const channel = yield call(countdown, 10);

  while (true) {
    const { data } = yield take(channel);
    const result = {
      area: data.name,
      lowTemp: Math.floor(data.main.temp_min),
      highTemp: Math.floor(data.main.temp_max),
    };
    yield put(getWeatherSuccess(result));
  }
}

//초기값
const INITIAL_STATE = {
  data: [],
};

//export

export default function getWeather(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
