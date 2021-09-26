import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { requestFetchPhotos } from "./photoSaga";
import { AppDispatch, RootState } from "../../store";
// 시간을 보기 편하게 바꾸는 부분
const getTimeString = (unixtime: number) => {
  // 1초: 1000
  // 1분: 60 * 1000
  // 1시간: 60 * 60 * 1000
  // 1일: 24 * 60 * 60 * 1000
  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
  // 현재시간보다 24시간 이전이면 날짜를 보여줌
    ? dateTime.toLocaleDateString()
  // 현재시간보다 24시간 미만이면 시간을 보여줌
    : dateTime.toLocaleTimeString();
};

//photo
const Photo = () => {
  // photo state 전체를 가져옴
  const photoState = useSelector((state:RootState) => state.photo);
  // 주소창에 정보를 담거나 이동할때 사용
  const history = useHistory();
  // 디스패치
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    // photo 에 데이터가 fetch 되어있는지 확인
    if(!photoState.isFetched) {
      // fetch가 안되어있으면 데이터 받아오기
      dispatch(requestFetchPhotos());
    }
  }, [dispatch, photoState.isFetched])

  //보여지는 부분
  return(
    <div>
      <h2 className="text-center">My Photos</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            //서버에서 데이터를 받아오는 action
            dispatch(requestFetchPhotos());
          }}
        >
          <i className="bi bi-arrow-clockwise"></i>
          새로고침
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/photos/create");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {/* state 데이터 배열에 map함수로 출력 */}
        {photoState.data.map((item, index) => (
          <div
            key={`photo-item-${index}`}
            className="card"
            style={{
              width: "calc((100% - 3rem) / 4)",
              marginLeft: index % 4 === 0 ? "0" : "1rem",
              marginTop: index > 3 ? "1rem" : "0",
            }}
          >
            {/* 컨텐트 wrapper -- 시작 */}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                // id값을 물고 이동해야함
                history.push(`/photos/detail/${item.id}`);
              }}
            >
              <img
                src={item.photoUrl}
                className="card-img-top"
                alt={item.title}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <h6 className="text-muted">
                  {getTimeString(item.createdTime)}
                </h6>
              </div>
            </div>
            {/* 컨텐트 wrapper -- 끝 */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Photo;