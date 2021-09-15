import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

const Photo = () => {
  const photo = useSelector((state:RootState) => state.photo);
  const history = useHistory();

  return (
    <div>
      <h2 className ="text-center my-5">Photos</h2>
      <div className = "d-flex justify-content-end mb-3">
        <button 
          className="btn btn-primary" 
          onClick = {() => {
            history.push("/photo/create");
          }}
        >
          <i className="bi bi-plus" />
        </button>
      </div>
      <div className = "d-flex flex-wrap">
        {Array.from(photo.data.values())
          .sort((a, b) => b.id - a.id)
          .map((item, index) => (
          <div
            key = {`photo-item-${index}`} 
            className="card" 
            style={{
              width: "calc(100%/4 - 3rem ) ", 
              marginLeft: index % 4 === 0 ? "0" : "1rem",
              marginTop: index > 3 ? "1rem" : "0",
            }}
          >
            <div className="card-header">
              <img 
                width={24}
                height={16}
                src = {item.profileUrl}
              />
              <span>{item.username}</span>
            </div>
            <img 
              src={item.photoUrl}
              className="card-img-top" 
              alt={item.title}
              onClick = {() => {
                history.push(`/photo/${item.id}`);
              }}
            />
            <div 
              className="card-body"
              style = {{cursor: "pointer"}}
              onClick = {() => {
                history.push(`/photo/${item.id}`);
              }}
            >
              <h5 className="card-title">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Photo;