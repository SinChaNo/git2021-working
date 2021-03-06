import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string,
  phone: string,
  email: string,
  memo?: string,
  createTime: number,
  modifyTime?: number,
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
const contactPageSize = localStorage.getItem("contact_page_size");

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
        ContactItem.memo = editItem.memo;
        ContactItem.createTime = editItem.createTime;
      }
    }
  }
})

export const { addContact, removeContact, editContact } = contactSlice.actions;

export default contactSlice.reducer;