import { all, fork } from "redux-saga/effects";
import newsSaga from "./sagas";

const forkList = (sagas) => sagas.map(saga => fork(saga));

export default function* rootSaga() {
  yield all([
    ...forkList(newsSaga)
  ])
}