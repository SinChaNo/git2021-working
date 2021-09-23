import { fork } from "redux-saga/effects";
import photoSaga from "./contactSaga";

export default function* rootSaga(){
  yield fork(photoSaga);
}