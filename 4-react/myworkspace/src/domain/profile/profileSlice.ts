import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    // 함수명: (기존 state변수명, action 변수명) => {state 변경처리}
    saveProfile: (state, action: PayloadAction<ProfileState>) => {
      const profile = action.payload;
      state.image = profile.image;
      state.username = profile.username;
    },
  }, // state 변경함수 목록
})

// action = {type: "...", payload: {...}}
// action.type: 처리할 액션의 종류를 나타내는 문자열
// action.payload: 처리할 데이터

// action creator는 action 객체를 생성하는 함수
// saveProfile(paylord) => {type: "profile/saveProfile", payload}
export const { saveProfile } = profileSlice.actions;


// slice.reducer
// == state 변경함수를 여러개를 가지고 있는 객체
// == reducer를 여러개를 가지고 있는 객체
export default profileSlice.reducer;