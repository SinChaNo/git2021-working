import axios from "axios";

// 서버로부터 받아오는 데이터 1건의 대한 타입
export interface PhotoItemResponse{
  name: any;
  phone: any;
  email: any;
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface PhotoItemRequest {
  title: string;
  description?: string;
  photoUrl: string;
  fileType: string;
  fileName: string;
}
// 서버와 데이터를 연동하는 api 처리 목록
const photoApi = {
  // axios.get<응답데이터의 타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
                                      // localhost::3000/photos
    axios.get<PhotoItemResponse[]>(`${process.env.REACT_APP_API_BASE}/photos`),

    add: (photoItem: PhotoItemRequest) =>
      axios.post<PhotoItemResponse>(
        `${process.env.REACT_APP_API_BASE}/photos`,
        photoItem
      ),
    
    // DELETE요청
    remove: (id: number) =>
      axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/photos/${id}`),
    
    // PUT 요청
    modify: (id: number, photoItem: PhotoItemRequest) =>
      axios.put<PhotoItemResponse>(
        `${process.env.REACT_APP_API_BASE}/photos/${id}`,
        photoItem
      ),
};

export default photoApi;
