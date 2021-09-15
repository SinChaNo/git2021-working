import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removePhoto } from "./photoSlice";

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const PhotoItem = useSelector((state: RootState) => state.photo.data.get(+id));

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style ={{width: "40vw"}} className = "mx-auto">
      <h2 className="text-center">Photo Detail</h2>
      <table className = "table">
        <tbody>
          <tr>
            <th>Title</th>
            <td>{PhotoItem?.title}</td>
          </tr>
          <tr>
            <th>Image</th>
            <td>
              <img src={PhotoItem?.photoUrl} alt={PhotoItem?.title} />
            </td>
          </tr>
          <tr>
            <th>Commit</th>
            <td>{PhotoItem?.description}</td>
          </tr>
        </tbody>
      </table>
      <div className = "d-flex justify-content-end">
        <button 
          className="btn btn-secondary me-1"
          onClick ={() => {
            history.push("/photo");
          }} 
        >
          <i className="bi bi-list" />
        </button>
        <button 
          className="btn btn-primary me-1"
          onClick = {() => {
            history.push(`/photo/edit/${id}`)
          }} 
        >
          <i className="bi bi-pencil"/>
        </button>
        <button 
          className="btn btn-warning" 
          onClick = {() => {
            dispatch(removePhoto(+id));
            history.push("/photo");
          }}
        >
          <i className="bi bi-trash"/>
        </button>
        
      </div>
    </div>
  );
};

export default PhotoDetail;