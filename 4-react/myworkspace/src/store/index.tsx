// global state
// Front-End state : UI처리 바뀌게 하는 변수
// -> 모달 팝업 상태( 보이고, 안보이고), 연락처 목록상태 ( 10개 보이고, 5개 보이고, 수정모드)
// Backend-End state : 비즈니스 로직 처리가 바뀌게 하는 데이터
// -> 주문상태(주문요청, 결제, 결제확인, 배송중, 배송완료)
// -> 승인상태( 제출, 검토중, 반려, 승인 )

// global state: profile, todo, contact ... 여러개 state가 있음
// ** 이러한 state드은 다른 컴포넌트와 state가 공유됨
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../domain/profile/profileSlice";
import photoReducer from "../domain/photo/photoSlice";
import contactReducer from "../domain/contact/ContactSlice";

import { enableMapSet } from "immer";
enableMapSet();


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    photo: photoReducer,
    contact: contactReducer,
  }, // 각, state 별로 처리할 외부 reducer 목록
  devTools: true, // 개발툴 사용 여부
});

// typescript에서는 몇가지 타입 선언을 해야함

// root state 타입 정의
// 가장 최상의 state
// state.profile, state.contact .... 
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;