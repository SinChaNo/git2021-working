import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestRemovePhoto } from "./photoSaga";

const PhotoDetail = () => {
  // 매개변수들을 객체화할 형식을 제너릭으로 넣어줌
  const { id } = useParams<{ id: string }>();
  
  // 타입 단언을 하지 않으면 추론에 의하여 PhotoItem | undefined
  // 타입 단언을 하면 반환 형식을 정의할 수 있음 
  const photoItem = useSelector((state: RootState) => state.photo.data.find((item) => item.id === +id));

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.photo.isRemoveCompleted
  );

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    isRemoveCompleted && history.push("/photos");
  }, [isRemoveCompleted, history]);

  const handDeleteClick = () => {
    dispatch(requestRemovePhoto(+id));
  }

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Photo Detail</h2>
      {!photoItem && <div className="text-center my-5">데이터가 없습니다.</div>}
      {photoItem && (
        <table className="table">
          <tbody>
            <tr>
              <th>제목</th>
              <td>{photoItem.title}</td>
            </tr>
            <tr>
              <th>설명</th>
              <td>{photoItem.description}</td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                <img
                  src={photoItem.photoUrl}
                  alt={photoItem.title}
                  width={"100%"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="d-flex">
        <div style={{ width: "50%" }}>
          <button
            className="btn btn-secondary me-1"
            onClick={() => {
              history.push("/photos");
            }}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i>
            목록
          </button>
        </div>
        <div style={{ width: "50%" }} className="d-flex justify-content-end">
          <button
            className="btn btn-primary me-1"
            onClick={() => {
              history.push(`/photos/edit/${id}`);
            }}
          >
            <i className="bi bi-pencil me-1" />
            수정
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handDeleteClick();
            }}
          >
            <i className="bi bi-trash me-1" />
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;