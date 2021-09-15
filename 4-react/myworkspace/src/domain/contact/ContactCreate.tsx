import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { addContact, ContactItem } from "./ContactSlice";

const ContactCreate = () => {
  const contactData = useSelector((state:RootState) => state.contact.data);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const name = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);

  const onAdd = () => {
    console.log(name.current?.value);
    console.log(phone.current?.value);
    console.log(email.current?.value);
    console.log(memo.current?.value);

    const item: ContactItem = {
      id: contactData.length ? contactData[0].id + 1 : 1,
      name: name.current ? name.current.value : " ",
      phone: phone.current ? phone.current.value : " ",
      email: email.current ? email.current.value : " ",
      memo: memo.current ? memo.current.value : " ",
      createTime: new Date().getTime(),
    }
    dispatch(addContact(item));
    history.push("/contacts");
  }

  return(
    <div className = "d-flex justify-content-center">
      <h1>Contact Create</h1>
      <form>
        <table className="table table-hover text-center">
          <tbody>
            <tr>
              <th>Name</th>
              <td><input type="text" className="form-control" style={{ height: "5vh", width:"400px" }} ref ={name}/></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td><input type="text" className="form-control" style={{ height: "5vh", width:"400px" }} ref ={phone}/></td>
            </tr>
            <tr>
              <th>Email</th>
              <td><input type="text" className="form-control" style={{ height: "5vh", width:"400px" }} ref ={email}/></td>
            </tr>
            <tr>
              <th>Memo</th>
              <td>
                <textarea 
                  className="form-control" 
                  placeholder = "Commit..."
                  style={{ height: "10vh", width:"400px" }}
                  ref ={memo}
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
            history.push("/contacts");
          }} 
        >
          <i className="bi bi-list" />
        </button>
        <button 
          className="btn btn-primary" 
          onClick = {() => {
            onAdd();
          }}
        >
          <i className="bi bi-check" />
        </button>
      </div>
    </div>
  )
}

export default ContactCreate;