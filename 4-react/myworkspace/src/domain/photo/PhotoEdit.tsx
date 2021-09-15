import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import photoSlice, { PhotoItem, addPhoto, editPhoto } from "./photoSlice";

const PhotoEdit = () => {
  const { id } = useParams<{ id: string }>(); 
  const history = useHistory();

  const PhotoItem = useSelector((state: RootState) => state.photo.data.get(+id));
  const dispatch = useDispatch<AppDispatch>();

  const title = useRef<HTMLInputElement>(null);
  const desc = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null); 

  const [url, setUrl] = useState<string | undefined>(PhotoItem?.photoUrl);
  
  const changeFile = () => {
    if (file.current?.files?.length){
      const imageFile = file.current?.files[0]
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result?.toString());
      }
    } 
  }

  const save = () => {
    if (file.current?.files?.length){
      const imageFile = file.current?.files[0]
      const reader = new FileReader();
      reader.onload = () => {
        
        if (PhotoItem){
          const item: PhotoItem = {
            id: PhotoItem?.id,
            profileUrl: PhotoItem?.profileUrl,
            username: PhotoItem?.username,
            title: title.current ? title.current.value : "",
            description: desc.current?.value,
            photoUrl: reader.result ? reader.result.toString() : "",
          };
          dispatch(editPhoto(item));
          history.push("/photo");
        }
      };
      reader.readAsDataURL(imageFile);
    } 
    else {
      if (PhotoItem){
        const item: PhotoItem = {
          id: PhotoItem?.id,
          profileUrl: PhotoItem?.profileUrl,
          username: PhotoItem?.username,
          title: title.current ? title.current.value : "",
          description: desc.current?.value,
          photoUrl: PhotoItem.photoUrl,
        };
        dispatch(editPhoto(item));
        history.push("/photo"); 
      }
    }
  }  

  return (
    <div style ={{width: "40vw"}} className = "mx-auto">
      <h2 className = "text-center">Photos Create</h2>
      <form>
        <table className = "table">
          <tbody>
            <tr>
              <th>Title</th>
              <td><input className="form-control" type = "text" placeholder ="Title" ref = {title} defaultValue = {PhotoItem?.title} /></td>
            </tr>
            <tr>
              <th>Image Select</th>
              <td>
                <img src={url} width="100%" alt={PhotoItem?.title} />
                <input className="form-control" type = "file" placeholder ="Image Select" accept="image/*" ref={file} onChange = {() => {
                    changeFile();
                  }}/>
              </td>
            </tr>
            <tr>
              <th>Commit</th>
              <td>
                <textarea 
                  className="form-control" 
                  placeholder = "Commit..."
                  style={{ height: "20vh" }}
                  ref={desc}
                  defaultValue = {PhotoItem?.description}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
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
          className="btn btn-primary" 
          onClick = {() => {
            save();
          }}
        >
          <i className="bi bi-check" />
        </button>
      </div>
    </div>
  );
}

export default PhotoEdit;