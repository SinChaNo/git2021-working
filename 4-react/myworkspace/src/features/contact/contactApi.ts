import axios from "axios";

interface ContacteResponse {
  id: number;
  name: string;
  phone: string; 
  email: string; 
}
interface ContactRequest {
  name: string;
  phone: string;
  email: string;
}

const contactApi = {
  fetch: () =>
    axios.get<ContacteResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),
  
  add: (contactItem: ContactRequest) =>
    axios.post<ContacteResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts`,contactItem
    ),
  
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),

  edit: (id:number, contactItem: ContactRequest) =>
    axios.put<ContacteResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts/${id}`,contactItem
    ),
};

export default contactApi;