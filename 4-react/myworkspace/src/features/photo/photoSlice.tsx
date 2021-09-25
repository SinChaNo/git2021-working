import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 데이터 구조
export interface PhotoItem {
  id: number;
  title: string;
  description?: string;
  photoUrl: string;
  profileUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

// 백엔드 연동 고려 state 구조 설계 
interface PhotoState {
  data: PhotoItem[];            // 포토 아이템 배열
  isFetched: boolean;           // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean;     // 데이터 추가 완료의 여부
  isRemoveCompleted?: boolean;  // 데이터 삭제 완료의 여부 
  isModifyCompleted?: boolean;  // 데이터 수정 완료의 여부
}

// photo state를 목록 -> array
const initialState: PhotoState = {
  data: [],
  isFetched: false,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    // PayloadAction<payload타입>
    // payload로 item객체를 받음
    addPhoto: (state, action: PayloadAction<PhotoItem>) => {
      const photo = action.payload;
      state.data.unshift(photo);
      state.isAddCompleted = true; // 추가 되었음을 표시
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removePhoto: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true;
    },

    modifyPhoto: (state, action: PayloadAction<PhotoItem>) => {
      const modifyItem = action.payload;

      const photoItem = state.data.find((item) => item.id === modifyItem.id);

      if (photoItem) {
        photoItem.title = modifyItem.title;
        photoItem.description = modifyItem.description;
        photoItem.photoUrl = modifyItem.photoUrl;
        photoItem.fileName = modifyItem.fileName;
        photoItem.fileType = modifyItem.fileType;
      }
      // 변경되었음
      state.isModifyCompleted = true;
    },

    // payload값으로 state를 초기화하는 reducer 필요
    initialPhoto: (state, action: PayloadAction<PhotoItem[]>) => {
      const photos = action.payload;
      state.data = photos;
      state.isFetched = true;
    },
  },
});

// action creator 내보내기
export const {
  addPhoto,
  removePhoto,
  modifyPhoto,
  initialPhoto,
  initialCompleted,
} = photoSlice.actions;

export default photoSlice.reducer;
