import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api, { ContactRequest, ContactResponse } from "./contactApi";
import ContactReducer, { addContact, ContactItem, initialContact }  from "./ContactSlice";

export const requestAddContact = createAction<ContactItem>(
  `${ContactReducer.name}/requestAddContact`
)

export const requestFetchContact = createAction(
  `${ContactReducer.name}/requestFetchContact`
)

function* addData(action: PayloadAction<ContactItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  const contactPayload = action.payload;

  const contactRequest: ContactRequest ={
    name: contactPayload.name,
    phone: contactPayload.phone,
    email: contactPayload.email
  };

  const result: AxiosResponse<ContactResponse> = yield call(
    api.add,
    contactRequest
  );

  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    phone: result.data.phone,
    email: result.data.email,
    createTime: result.data.createdTime,
  };

  yield put(addContact(contactItem));
}

function* fetchData() {
  yield console.log("--fetchData--");

  const result: AxiosResponse<ContactResponse[]> = yield call(api.fetch);

  const contacts = result.data.map((item) =>
    ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      createTime: item.createdTime,
    } as ContactItem)
  );
  yield put(initialContact(contacts));
}

export default function* contactSaga() {
  yield takeEvery(requestAddContact, addData);
  yield takeLatest(requestFetchContact, fetchData);
}