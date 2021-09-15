import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removeContact } from "./ContactSlice";

const ContactDetail = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const ContactItem = useSelector((state: RootState) => state.contact.data.find((item) => item.id === +id));
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style ={{width: "40vw"}} className = "mx-auto">
      <h1 className="text-center">Contact Detail</h1>
      <table style ={{width: "40vw"}} className = "table table-hover text-center">
        <tbody>
          <tr>
            <th>id</th>
            <td>{ContactItem?.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{ContactItem?.name}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{ContactItem?.phone}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{ContactItem?.email}</td>
          </tr>
          <tr>
            <th>Memo</th>
            <td>{ContactItem?.memo}</td>
          </tr>
        </tbody>
      </table>
      <div className = "d-flex justify-content-center">
        <button 
          className="btn btn-secondary me-1"
          onClick ={() => {
            history.push("/contacts");
          }} 
        >
          <i className="bi bi-list me-1" />
          List
        </button>
        <button 
          className="btn btn-primary me-1"
          onClick = {() => {
            history.push(`/contacts/edit/${id}`)
          }} 
        >
          <i className="bi bi-pencil me-1"/>
          Edit
        </button>
        <button 
          className="btn btn-warning" 
          onClick = {() => {
            dispatch(removeContact(+id));
            history.push("/contacts");
          }}
        >
          <i className="bi bi-trash me-1"/>
          Delete
        </button>
        
      </div>
    </div>
  )
  
}

export default ContactDetail;