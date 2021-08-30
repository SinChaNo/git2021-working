import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FeedState } from "./FeedState";

interface ModalProp{
  item: FeedState;
  onClose: () => void;
  onSave: (editItem: FeedState) => void;
}

const FeedEditModal = ({item, onClose, onSave}: ModalProp) => {
  const profile = useSelector((state: RootState) => state.profile);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        post(reader.result?.toString(), file.type);
      };

      const post = (dataUrl: string | undefined, fileType: string | undefined) =>{
        const feed: FeedState = {
          id: item.id,
          // commit: item.commit,
          commit: textRef.current?.value,
          username: profile.username,
          profileImg: profile.image,
          createTime: item.createTime,
          dataUrl: dataUrl,
          fileType: fileType,
        };
      
      onSave(feed);
      }
    } 
    else if(textRef.current?.value) { 
      const feed: FeedState = {
        id: item.id,
        commit: textRef.current?.value,
        username: profile.username,
        profileImg: profile.image,
        createTime: item.createTime,
        dataUrl: item.dataUrl,
        fileType: item.fileType,
      };
    onSave(feed);
    }
  }

  return (
  <>
    <div
    className="modal d-block"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit</h5>
          </div>
          <div className="modal-body">
            {item.fileType &&
              (item.fileType?.includes("image") ? (
              <img
                src={item.dataUrl}
                className="card-img-top"
                alt =""
              />
              ) : (
                <video className="card mt-3" key ={item.id} controls>
                  <source src={item.dataUrl} type="video/mp4"></source>
                </video>
              ))
            }
            <input 
              type="file" 
              className="form-control" 
              id="inputGroupFile04" 
              aria-describedby="inputGroupFileAddon04" 
              aria-label="Upload"
              ref = {fileRef}
            />
            <textarea 
              className="form-control w-100"
              defaultValue={item.commit}
              placeholder="Leave a comment here" 
              id="floatingTextarea"
              style ={{height:"100px", boxSizing: "border-box"}}
              ref ={textRef}
            >
            </textarea>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
              onClick={() => {
                onClose();
              }}
            >
            Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() =>{
                save();
              }}
            >
            Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default FeedEditModal;