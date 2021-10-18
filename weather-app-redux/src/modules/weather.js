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

// API호출 함수
// function getSeoulAPI() {
//   return axios.get(
//     `http://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&APPID=e75a0a68adc50371c5898d8d43931062`
//   );
// }
// function getDaejeonAPI() {
//   return axios.get(
//     "http://api.openweathermap.org/data/2.5/weather?q=Daejeon&units=metric&APPID=e75a0a68adc50371c5898d8d43931062"
//   );
// }
// function getGwangjuAPI() {
//   return axios.get(
//     "http://api.openweathermap.org/data/2.5/weather?q=Gwangju&units=metric&APPID=e75a0a68adc50371c5898d8d43931062"
//   );
// }

// channel 사용하지 않은 채로 진행했던 saga함수
// function* getWeatherSaga() {

//     // const res1 = yield call(getSeoulAPI);
//     // const res1 = chan.data;
//     // const res2 = yield call(getDaejeonAPI);
//     // const res3 = yield call(getGwangjuAPI);
//     // yield delay(5000);

//     // const resAll = [res1, res2, res3];

//     // const result = resAll.map((res) => {
//     //   const data = res.data;
//     //   return {
//     //     area: data.name,
//     //     lowTemp: Math.floor(data.main.temp_min),
//     //     highTemp: Math.floor(data.main.temp_max),
//     //   };
//     // });
//     const result = {
//       area: data.name,
//       lowTemp: Math.floor(data.main.temp_min),
//       highTemp: Math.floor(data.main.temp_max),
//     };

//     yield put(getWeatherSuccess(result));
//   }
// }

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
