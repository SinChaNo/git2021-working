import axios from "axios";

interface ContactItemResponse {
  id: number,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
}

const contactApi = {
  fetch: () =>
    axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),
};

export default contactApi;