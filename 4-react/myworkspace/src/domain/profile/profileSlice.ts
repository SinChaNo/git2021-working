import { createSlice } from "@reduxjs/toolkit";
import { hamster } from "../../common/data";

// redux store 에 하나의 state를 관리하고 처리할 수 있는 모듈
// slice에는 state와 reducer가 있음
// reducer는 state를 변경하는 함수

// state type
export interface ProfileState {
  image: string | undefined;
  username: string | undefined;
}

// state 초기 상태를 선언
const initialState: ProfileState = {
  image: hamster,
  username: "SinChaNo"
}

// slice를 생성
export const profileSlice = createSlice({
  name: "profile", // slice(state) 의 이름
  // initialState: initialState, -> state 초기값
  initialState, // 이 slice의 초기 값
  reducers: {}, // state 변경함수 목록
})