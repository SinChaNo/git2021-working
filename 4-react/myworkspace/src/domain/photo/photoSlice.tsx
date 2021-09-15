import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";
import { catImg, hamster, penguin } from "../../common/data/"

export interface PhotoItem {
  id: number;
  title: string;
  description?: string;
  photoUrl: string;
  profileUrl: string;
  username: string;
}

interface PhotoState {
  data: Map<number, PhotoItem>;
  isFetched: boolean;
}

const initialState : PhotoState = {
  data: new Map([
    [
      5,
      {
        id: 5,
        title: "햄스터?",
        description: "사실은 고양이",
        photoUrl: penguin,
        profileUrl: catImg,
        username: "SinChaNo",
      },
    ],
    [
      4,
      {
        id: 4,
        title: "햄스터?",
        description: "사실은 고양이",
        photoUrl: hamster,
        profileUrl: catImg,
        username: "SinChaNo",
      },
    ],
    [
      3,
      {
        id: 3,
        title: "햄스터?",
        description: "사실은 고양이",
        photoUrl: hamster,
        profileUrl: catImg,
        username: "SinChaNo",
      },
    ],
    [
      2,
      {
        id: 2,
        title: "햄스터?",
        description: "사실은 고양이",
        photoUrl: penguin,
        profileUrl: catImg,
        username: "SinChaNo",
      },
    ],
    [
      1,
      {
        id: 1,
        title: "햄스터?",
        description: "사실은 고양이",
        photoUrl: hamster,
        profileUrl: catImg,
        username: "SinChaNo",
      },
    ],
  ]),
  isFetched: false,

}

const photoSlice = createSlice({
  name:"photo",
  initialState,
  reducers: {
    addPhoto: (state, action:PayloadAction<PhotoItem>) => {
      const photo = action.payload;
      state.data.set(photo.id, photo);
    },
    removePhoto: (state, action:PayloadAction<number>) => {
      const id = action.payload;
      state.data.delete(id)
    },
    editPhoto: (state, action:PayloadAction<PhotoItem>) => {
      const photo = action.payload;
      state.data.set(photo.id, photo);
    }
  },
});

export const {addPhoto, removePhoto, editPhoto} = photoSlice.actions;

export default photoSlice.reducer;