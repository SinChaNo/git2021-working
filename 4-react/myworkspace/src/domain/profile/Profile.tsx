import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { saveProfile } from "./profileSlice";

import style from "./Profile.module.scss";

const Profile = () => {
  // local(component) state 
  // const [profile, setProfile] = useState<ProfileState>({
  //   image: hamster,
  //   username: "SinChaNo"
  // });

  // global(redux) state
  // root state에서 profile state를 꺼내옴
  const profile = useSelector((state: RootState) => state.profile );

  const dispatch = useDispatch<AppDispatch>();

  const [isShow, setIsShow] = useState(false); // profile view details control
  const [isEdit, setIsEdit] = useState(false); // edit mode control
  const [url, setUrl] = useState<string | undefined>(profile.image); // image URL

  const inputRef = useRef<HTMLInputElement>(null);

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // setProfile({image: url, username: inputRef.current?.value });
    // dispatch(
      //   type: "profile/saveProfile",
      //   paylord: { image: url, username: inputRef.current?.value }
      // );
    dispatch(saveProfile({ image: url, username: inputRef.current?.value }));
    setIsEdit(false);
  };

  return (
    <>
      {/* Profile area */}
      <div className="dropdown-5">
        {/* app-bar profile */}
        <div
          style={{ cursor:"pointer"}}
          className="d-flex me-5"
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          <div
            className = {`${style.thumb} me-1`}
            style = {{backgroundImage: `url(${profile.image})`}}
          ></div>
          <span className = {`${style.username} text-light`}>
            {profile.username}
          </span>
        </div>
        {/* profile  view details*/}
        {isShow && (
          <div
            className = "dropdown-menu d-flex flex-column align-items-center me-5"
            style = {{right: "-30px"}}
          >
            {/* view mode */}
            {!isEdit && (
              <>
                <div
                  className = {`${style["thumb-large"]} `}
                  style = {{backgroundImage: `url(${profile.image})`}}
                ></div>
                <p>{profile.username}</p>
              </>
            )}
            {/* edit mode */}
            {isEdit && (
              <>
                <div
                  className = {`${style["thumb-large"]}`}
                  style = {{ backgroundImage: `url(${url})` }}
                ></div>
                <input 
                  type="file"
                  className = "form-control form-control-sm me-1"
                  accept = "image/png, image/jpeg"
                  onChange = {(e) => {
                    changeImage(e);
                  }}
                />
                <input 
                  type="text" 
                  defaultValue = {profile.username}
                  ref={inputRef}
                />
              </>
            )}

            {/* bottom link button */}
            <div className = "d-flex">
              {/* view mode */}
              {!isEdit && (
                <>
                  <a 
                    href = "#!"
                    className = "link-secondary fs-6 text-nowrap me-2"
                    onClick = {(e) => {
                      e.preventDefault();
                      setIsEdit(true);
                    }}
                  >
                    edit
                  </a>
                  <a 
                    href = "#!"
                    className = "link-secondary fs-6 text-nowrap "
                    onClick = {(e) => {
                      e.preventDefault();
                      setIsShow(!isShow);
                    }}
                  >
                    close
                  </a>
                </>
              )}

              {/* edit mode */}
              {isEdit && (
                <>
                  <a 
                    href="#!"
                    className = "link-secondary fs-6 text-nowrap me-2"
                    onClick = {(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >
                    save
                  </a>
                  <a 
                    href=""
                    className = "link-secondary fs-6 text-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      setUrl(profile.image);
                      setIsEdit(false);
                    }}
                  >
                    cancel
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;