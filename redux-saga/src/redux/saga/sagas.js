import { put, takeLatest } from 'redux-saga/effects';
import { LOADING, FETCHNEWS, fetchNewsSucsess } from "../actions";
import API from "../../services/api";

function* greetMessage() {
  console.log('Hi there, Good Morning!')
}

function* helloSaga() {
  console.log('Hello Sagas!')
}

// worker sagas
function* fetchNews() {
  try {
    const response = yield API.fetchNews()
    yield put(fetchNewsSucsess(response.articles))
    console.log('response: ', response)
  } catch (error) {
    console.log('Error: ', error)
  }
}

// watcher sagas
function* watcheNewsAction() {
  yield takeLatest(FETCHNEWS, fetchNews)
}

export default [
  watcheNewsAction,
  greetMessage,
  helloSaga,
]
