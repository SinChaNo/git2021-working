import { fork } from "redux-saga/effects";
import contactSaga from "../features/contect_back/contactSaga";
import photoSaga from "../features/photo/photoSaga";

export default function* rootSaga(){
  yield fork(contactSaga);
  yield fork(photoSaga);
}