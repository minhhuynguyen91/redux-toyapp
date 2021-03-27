import { takeEvery, call, put } from "redux-saga/effects";

export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}

function* workerSaga(action) {
  try {
    // pass the action payload to getData
    const payload = yield call(getData, action.payload.url);
    yield put({ type: "DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}

function getData(url) {
  return fetch(url).then(response => response.json());
}