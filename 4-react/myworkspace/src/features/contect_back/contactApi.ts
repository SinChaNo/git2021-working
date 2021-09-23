import axios from "axios";

export interface ContactResponse {
  id: number;
  name: string;
  phone: string; 
  email: string; 
}
export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
}

const contactApi = {
  fetch: () =>
    axios.get<ContactResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),
  
  add: (contactItem: ContactRequest) =>
    axios.post<ContactResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts`,contactItem
    ),
  
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),

  edit: (id:number, contactItem: ContactRequest) =>
    axios.put<ContactResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts/${id}`,contactItem
    ),
};

export default contactApi;