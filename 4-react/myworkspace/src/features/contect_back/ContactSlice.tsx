import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string,
  phone: string,
  email: string,
  createTime: number;
  // memo?: string,
  // createTime: number,
  // modifyTime?: number,
}

export interface ContactPage {
  data: ContactItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const contactPageSize = localStorage.getItem("photo_page_size");

const initialState : ContactState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: contactPageSize ? +contactPageSize : 2,
  totalPages: 0,
}


const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact)
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(state.data.findIndex((item) => item.id === id), 1);
    },
    editContact: (state, action: PayloadAction<ContactItem>) =>{
      const editItem = action.payload;
      const ContactItem = state.data.find(item => item.id === editItem.id);
      
      if(ContactItem){
        ContactItem.name = editItem.name;
        ContactItem.phone = editItem.phone;
        ContactItem.email = editItem.email;
        ContactItem.createTime = editItem.createTime;
        // ContactItem.memo = editItem.memo;
      }
    },

    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      state.data = contacts;
      state.isFetched = true;
    },

    initialPagedContact: (state, action: PayloadAction<ContactPage>) =>{
      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
  }
})

export const { addContact, removeContact, editContact, initialContact, initialPagedContact } = contactSlice.actions;

export default contactSlice.reducer;