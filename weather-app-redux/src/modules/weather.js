import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//액션 정의
const GET_WEATHER_PENDING = "GET_WEATHER_PENDING";
const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";

//액션 생성자

export const getWeatherSuccess = (result) => ({
  type: GET_WEATHER_SUCCESS,
  payload: result,
});

export const getWeatherPending = (val) => ({
  type: GET_WEATHER_PENDING,
  payload: val,
});

// API호출 함수
function getSeoulAPI(action) {
  console.log(action);
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${action}&units=metric&APPID=e75a0a68adc50371c5898d8d43931062`
  );
}
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

function* getWeatherSaga(action) {
  const res1 = yield call(getSeoulAPI, action.payload);
  // const res2 = yield call(getDaejeonAPI, action.payload);
  // const res3 = yield call(getGwangjuAPI, action.payload);

  console.log(res1);
  const data = res1.data;
  // const resAll = [res1, res2, res3];
  // const result = resAll.map((res) => {
  //   const data = res.data;
  //   return {
  //     area: data.name,
  //     lowTemp: Math.floor(data.main.temp_min),
  //     highTemp: Math.floor(data.main.temp_max),
  //   };
  // });

  const result = {
    area: data.name,
    lowTemp: Math.floor(data.main.temp_min),
    highTemp: Math.floor(data.main.temp_max),
  };

  // map 돌리기 전
  // const result = [
  //   {
  //     area: res1.data.name,
  //     lowTemp: res1.data.main.temp_min,
  //     highTemp: res1.data.main.temp_max,
  //   },
  //   {
  //     area: res2.data.name,
  //     lowTemp: res2.data.main.temp_min,
  //     highTemp: res2.data.main.temp_max,
  //   },
  //   {
  //     area: res3.data.name,
  //     lowTemp: res3.data.main.temp_min,
  //     highTemp: res3.data.main.temp_max,
  //   },
  // ];

  yield put(getWeatherSuccess(result));
}

export function* weatherSaga() {
  yield takeEvery("GET_WEATHER_PENDING", getWeatherSaga);
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
