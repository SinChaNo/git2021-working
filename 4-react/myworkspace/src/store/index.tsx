// global state
// Front-End state : UI처리 바뀌게 하는 변수
// -> 모달 팝업 상태( 보이고, 안보이고), 연락처 목록상태 ( 10개 보이고, 5개 보이고, 수정모드)
// Backend-End state : 비즈니스 로직 처리가 바뀌게 하는 데이터
// -> 주문상태(주문요청, 결제, 결제확인, 배송중, 배송완료)
// -> 승인상태( 제출, 검토중, 반려, 승인 )

// global state: profile, todo, contact ... 여러개 state가 있음
// ** 이러한 state드은 다른 컴포넌트와 state가 공유됨
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import photoReducer from "../features/photo/photoSlice";
import contactReducer from "../features/contact/ContactSlice";
import progressReducer from "../components/progress/progressSlice";
import alertReducer from "../components/alert/alertSlice";

// 최상위 SAGA
import rootSaga from "../saga";
import createSagaMiddleware from "@redux-saga/core";

// sagamiddleware
// 중간을 처리하는 소프트웨어
const sagaMiddleware = createSagaMiddleware();


// 전역상태(global state) 저장소
// 다른 컴포넌트와 state가 공유가능
export const store = configureStore({
  // 각 state 별로 처리할 reducer
  reducer: {
    profile: profileReducer,
    photo: photoReducer,
    contact: contactReducer,
    progress: progressReducer,
    alert: alertReducer,
  }, // 각, state 별로 처리할 외부 reducer 목록
  // middleware는 여러개 사용할 수 있음, [defaultMiddleware, sagaMiddleware]
  middleware: [sagaMiddleware],
  devTools: true, // 개발툴 사용 여부
});

//sagaMiddleware 실행
sagaMiddleware.run(rootSaga);

// typescript에서는 몇가지 타입 선언을 해야함

// root state 타입 정의
// 가장 최상의 state
// state.profile, state.contact .... 
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;