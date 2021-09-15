import { useRef, useState } from "react";
import produce from "immer";
import FeedEditModal from "./FeedEditmodal";
import { AlertProp1 } from "../type"
import { FeedState } from "./FeedState";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import style from "../profile/Profile.module.scss"

const getTimeString = (unixtime : number) => {
  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Alert = ({onClose}: AlertProp1) =>{
  
  return (
    <div className="alert alert-danger d-flex align-items-center alert-dismissible" role="alert">
      <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"/>
      <div>
        <strong>미기입 항목</strong>이 있습니다! 작성해주세요
        <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="alert" 
          aria-label="Close"
          onClick = {onClose}
        />
      </div>
    </div>   
  );
}

const Feed = () => {
  const profile = useSelector((state: RootState) => state.profile);

  const [feedList, setFeedList] = useState<FeedState[]>([
    {
      id: 2, 
      commit: "틀어", 
      createTime: new Date().getTime(),
      username: profile.username,
      profileImg: profile.image,
    },
    {
      id: 1, 
      commit: "아무거나", 
      createTime: new Date().getDate(),
      username: profile.username,
      profileImg: profile.image,
    },
  ]);
  
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const post = (dataUrl: string | undefined, fileType: string | undefined) =>{
    const feed : FeedState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      commit: textRef.current?.value,
      username: profile.username,
      profileImg: profile.image,
      createTime: new Date().getTime(),
      dataUrl: dataUrl,
      fileType: fileType,
    };
    // setFeedList([feed, ...feedList]);
    
    //current state = > draft state 
    setFeedList(
      produce((draft) => {
        draft.unshift(feed);
      })
    );
    formRef.current?.reset();
    setIsError(false);
  }
  
  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (!textRef.current?.value && !fileRef.current?.value){
      setIsError(true);
      return;
    }else {setIsError(false);}

    if (fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        post(reader.result?.toString(), file.type);
      };
    } else {
      post(undefined, undefined);
    }
    
  };


  const del = (id : number, index: number) => {
    // setFeedList(feedList.filter(itme => itme.id !== id));
    // setFeedList(
    //   produce((draft) => {
    //     const item = draft.find((item) => item.id === id);
    //     if (item) {
    //       draft.splice(draft.indexOf(item), 1)
    //     }
    //   })
    // )

    setFeedList(
      produce((draft) => {
        draft.splice(index, 1);
      })
    )
  };

  const editItem = useRef<FeedState>({
    id: 0,
    commit: "",
    username:"",
    createTime: 0,
    dataUrl: "",
    fileType: "",
    profileImg: "",
  })

  const edit = (item: FeedState) =>{
    editItem.current = item;
    setIsEdit(true);
  };

  const save = (editItem: FeedState) => {
    setFeedList(
      produce((draft) => {
        const item = draft.find((item) => item.id === editItem.id);
        if (item) {
          item.dataUrl = editItem.dataUrl;
          item.fileType = editItem.fileType;
          item.commit = editItem.commit;
          item.profileImg = editItem.profileImg;
          item.username = editItem.username;
        }
      })
    )
    setIsEdit(false);
  };

  return (
    <>
      <h1>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="70" 
          height="30" 
          fill="currentColor" 
          className="bi bi-camera"
          viewBox="0 0 5 14" 
        >
        <path
          d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" 
        />
        <path
          d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" 
        /></svg>
      ChanHo_Feed  
      </h1>
      {isEdit && (
        <FeedEditModal
          item = {editItem.current}
          onClose = {() => {
            setIsEdit(false)
          }}
          onSave={(editItem) => {
            save(editItem);
          }}
        />
      )}
      <form className ="w-100" ref={formRef} onSubmit = {e => e.preventDefault()}>
        {/* profile 정보 확인용 */}
        <div>
          <img
            src={profile.image}
            width={50}
            height={50}
            alt={profile.username}
          />
          <span>{profile.username}</span>
        </div>
        <div className="form-floating ">
          <textarea 
            className="form-control w-100"
            placeholder="Leave a comment here" 
            id="floatingTextarea"
            style ={{height:"100px", boxSizing: "border-box"}}
            ref ={textRef}
          >
          </textarea>
          <label htmlFor="floatingTextarea">Comments</label>
        </div>
        <div 
          className="input-group"
        >
          <input 
            type="file" 
            className="form-control" 
            id="inputGroupFile04" 
            aria-describedby="inputGroupFileAddon04" 
            aria-label="Upload"
            ref = {fileRef}
            onKeyUp={(e) => {
              add(e);
            }}
          />
          <button 
            className="btn btn-outline-primary" 
            type="button" 
            id="inputGroupFileAddon04"
            onClick={() => {
              add(null);
            }}
          >
          Add
          </button>
        </div>
      </form>
      {isError && (
        <Alert 
        onClose={() => {
          setIsError(false);
        }}/>
      )}
      <div id = "feed-list">
        {
          feedList.map((item, index) =>(
      
            <div id="card" className="card mt-3" key ={item.id}>
              <div className="card-header">
                  <img
                    src={item.profileImg}
                    className = {`${style.thumb} me-1`}
                    width={150}
                    height={100}
                    alt={item.username}
                  />
                  <span className = {`${style.username}`}>{item.username}</span>
                </div>
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
                <div className="card-body">
                  <p className="card-text ">{item.commit}</p>
                  <span style={{ fontSize: "0.75rem" }}>
                    - {item.username}, {getTimeString(item.createTime)}
                  </span>
                  <a 
                    href="#!" 
                    className="link-secondary fs-6 text-nowrap position-absolute bottom-1 end-0" style={{textDecoration: "none"}}
                    onClick = { () => {
                      edit(item);
                    }}
                  >
                  수정하기
                  </a>
                  <a 
                    href="#!" 
                    className="link-secondary fs-6 text-nowrap position-absolute bottom-0 end-0" style={{textDecoration: "none"}}
                    onClick = { (e) => {
                      e.preventDefault();
                      del(item.id, index);
                    }}
                  >
                  삭제하기
                  </a>
                  <a 
                    href="#!"
                    className="link-secondary fs-6 text-nowrap position-absolute bottom-0 end-0" style={{textDecoration: "none"}}
                    onClick = { (e) => {
                      del(item.id, index);
                    }}
                  >
                  삭제하기
                  </a>
                </div>
            </div>

          ))
        }
      </div>
    </>
  )
}

export default Feed;