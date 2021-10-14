import { combineReducers } from "redux";
import getWeather, { weatherSaga } from "./weather";
import { all } from "redux-saga/effects";

export default combineReducers({
  getWeather,
});

export function* rootSaga() {
  yield all([weatherSaga()]);
}
