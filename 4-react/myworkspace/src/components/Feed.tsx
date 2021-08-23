import { useRef, useState } from "react";

interface FeedState {
  id: number;
  commit: string | undefined;
  createTime: number;
  modifyTime?: number;
  fileType?: string | undefined;
  dataUrl?: string | undefined;
}
interface AlertProp {
  onClose?: () => void
}


const getTimeString = (unixtime : number) => {
  const dateTime = new Date(unixtime);

  return ` ${dateTime.toLocaleTimeString()}`;
}

const Alert = ({onClose}: AlertProp) =>{
  
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
  const [feedList, setFeedList] = useState<FeedState[]>([
    {id: 2, commit: "틀어", createTime: new Date().getTime()},
    {id: 1, commit: "아무거나", createTime: new Date().getDate()},
  ]);

  const [isError, setIsError] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const post = (dataUrl: string | undefined, fileType: string | undefined) =>{
    const feed : FeedState = {
      id: feedList.length > 0 ? feedList[0].id + 1 : 1,
      commit: textRef.current?.value,
      createTime: new Date().getTime(),
      dataUrl: dataUrl,
      fileType: fileType, 
    };
    setFeedList([feed, ...feedList]);
    formRef.current?.reset();
    setIsError(false);
  }
  
  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }

    if (!textRef.current?.value){
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


  const del = (id : number) => {
    setFeedList(feedList.filter(itme => itme.id !== id));
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
      <form className ="w-100" ref={formRef} onSubmit = {e => e.preventDefault()}>
        <div className="form-floating ">
          <textarea 
            className="form-control w-100"
            placeholder="Leave a comment here" 
            id="floatingTextarea"
            style ={{height:"100px"}}
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
          feedList.map((item) =>(
            <div id="card" className="card mt-3" key ={item.id}>
              {item.fileType &&
                (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top"
                />
                ) : (
                  <video className="card mt-3" key ={item.id} controls>
                    <source src={item.dataUrl} type="video/mp4"></source>
                  </video>
                ))
              }
                <div className="card-body">
                  <p className="card-text ">{item.commit}</p>
                  <span style ={{fontSize: "0.75rem"}}>
                    - {" "}{getTimeString(item.modifyTime ? item.modifyTime : item.createTime)}
                  </span>
                  <a 
                    href="#!" 
                    className="position-absolute bottom-0 end-0" style={{textDecoration: "none"}}
                    onClick = { () => {
                      del(item.id);
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