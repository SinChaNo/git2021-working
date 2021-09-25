import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { editContact } from "./ContactSlice";



const ContactEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();


  const ContactItem = useSelector((state: RootState) => state.contact.data.find((item) => item.id === +id));

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);

 
  
  const handleSave = () => {
    if(ContactItem){
      const item = {...ContactItem};
      item.id = ContactItem?.id;
      item.name = nameRef.current ? nameRef.current.value : " ";
      item.phone = phoneRef.current ? phoneRef.current.value : " ";
      item.email = emailRef.current ? emailRef.current.value : " ";
      item.createTime = new Date().getTime();
      // item.memo = memoRef.current ? memoRef.current.value : " ";
  
      dispatch(editContact(item));
      history.push(`/contacts/${ContactItem.id}`);
    }

  }
 
  return (
    <div style ={{width: "40vw"}} className = "mx-auto">
      <h1 className="text-center">Contact Edit</h1>
      <form className ="d-flex">
        <table style ={{width: "40vw"}} className = "table table-hover text-center">
          <tbody>
            <tr>
              <th>Name</th>
              <td><input type="text" defaultValue={ContactItem?.name} className="form-control"  ref ={nameRef}/></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td><input type="text" defaultValue={ContactItem?.phone} className="form-control"  ref ={phoneRef}/></td>
            </tr>
            <tr>
              <th>Email</th>
              <td><input type="text" defaultValue={ContactItem?.email} className="form-control"  ref ={emailRef}/></td>
            </tr>
            <tr>
              <th>Memo</th>
              <td>
                <textarea 
                  className="form-control" 
                  placeholder = "Commit..."
                  defaultValue={ContactItem?.memo}
                  style={{ height: "10vh"}}
                  ref ={memoRef}
                ></textarea>  
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className = "d-flex justify-content-center">
        <button 
          className="btn btn-secondary me-1"
          onClick ={() => {
            history.push("/contacts");
          }} 
        >
          <i className="bi bi-list  me-1" />
          List
        </button>
        <button 
          className="btn btn-primary" 
          onClick = {() => {
            handleSave();
          }}
        >
          <i className="bi bi-check  me-1" />
          Save
        </button>
      </div>
  </div>
    
  )
}

export default ContactEdit;