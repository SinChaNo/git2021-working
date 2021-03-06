import { useEffect, useRef, useState } from "react"

import produce from "immer";
import api from "./contactApi";

interface ContactState {
  id: number;
  name: string;
  phone: string;
  email: string;
  isEdit: boolean;
}

const Contact = () => {
  const [contactList, setContactList] = useState<ContactState[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const trRef = useRef<HTMLTableRowElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);


  const fetchData = async () => {
    const res = await api.fetch();

    const contact = res.data.map((item) => ({
      id : item.id,
      name : item.name,
      email : item.email,
    })) as ContactState[]

      setContactList(contact);
      setLoading(false);

    console.log("--2. fetch completed--");
  };

  useEffect(() => {
    console.log("---1.mounted---");
    //ES8 style async-await
    fetchData();
  }, []);

  const add = async () => {
    if (!nameRef.current?.value || !phoneRef.current?.value || !emailRef.current?.value){
      setIsError(true);
      return;
    }
    try{
      const result = await api.add({
        name : nameRef.current?.value,
        phone : phoneRef.current?.value,
        email : emailRef.current?.value,
      });
      console.log("---result---")
      console.log(result);
  
      // --state change--
      const contact: ContactState = {
        id: result.data.id,
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        isEdit: false,
      }
  
      setContactList(
        produce((draft) => {
          draft.unshift(contact);
        })
      )
  
      formRef.current?.reset();
      setIsError(false);
    }catch(e:any){
      console.log("addErr");
      console.log(e.response);
      const message = (e as Error).message;
      setIsError(true);
      setErrMessage(message);
    }
    
  }

  const del = async (id: number, index: number) => {
    const result = await api.remove(id);
    console.log(result.status);
    setContactList(
      produce((draft) => {
        draft.splice(index, 1);//save?????? ???????????? ?????? ??? ?????? ??????
      })
    );
  }

  const edit = (id: number, mod: boolean) => {
    setContactList(
      produce((draft) => {
        const item = draft.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    )
  }

  const save = async(id: number, index: number) => {
    const input = tableRef.current?.querySelectorAll("tr")[index + 1];
    const name = input?.querySelectorAll("input")[0];
    const phone = input?.querySelectorAll("input")[1];
    const email = input?.querySelectorAll("input")[2];
    if(!name || !phone || !email) return;
    const result = await api.edit(id,
        {
          name: name.value,
          phone: phone.value,
          email: email.value,
        }
      )
    setContactList(
      produce((draft) => {
        const item = draft.find((item) => item.id === id);
        if(item) {
          item.name = result.data.name;
          item.phone = result.data.phone;
          item.email = result.data.email;
        }
      })
    ); //setContactList
  }; //save

  return (
    <>
      <h1 className ="text-center">Contact</h1>
  
      <form className="d-flex" action="" ref = {formRef} >
        <input type="text" className="mx-auto px-3" placeholder="??????" id ="name" ref ={nameRef}/>
        <input type="text" className="mx-auto px-3" placeholder="?????????" id ="phone" ref ={phoneRef}/>
        <input type="text" className="mx-auto px-3" placeholder="?????????" id ="email" ref ={emailRef}/>
        <button 
          id="add-btn" 
          type="button" 
          className="btn btn-primary mx-auto px-3"
          onClick = {() => {
            add();
          }}
        >
          ????????????
        </button>
      </form>
      {isError && (
        alert(`???????????????!`)
      )}
      <table 
        id="table"
        ref= {tableRef}
        className="table table-striped table-hover text-center top-10 my-5"
      >
        <thead>
          <tr>
            <th>no.</th>
            <th>??????</th>
            <th>?????????</th>
            <th>?????????</th>
            <th>??????</th>
          </tr>
        </thead>
        <tbody id="contactList" ref = {tbodyRef}>
          {/* ????????? ????????? ??? */}
          {isLoading && (
            <li className="list-group-item text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </li>
          )}
          {!isLoading && contactList.length === 0 && (
            <li className ="list">???????????? ????????????.</li>
          )}
          {contactList.map((item, index) =>  (
            <tr key = {item.id} ref = {trRef}>
              {!item.isEdit && (
                <td>#{item.id}</td>
                )}
              {!item.isEdit && (
                <td>{item.name}</td>
                )}
              {!item.isEdit && (
                <td>{item.phone}</td>
                )}
              {!item.isEdit && (
                <td>{item.email}</td>
              )}
              {item.isEdit && (
                <td>#{item.id}</td>
                )}
              {item.isEdit && (
                <td >
                  <input 
                    type="text" 
                    className="mx-auto px-1"
                    placeholder="??????" id ="name" 
                    defaultValue = {item.name}
                  />
                </td>
              )}
              {item.isEdit && (
                <td >
                  <input 
                    type="text" 
                    className="mx-auto px-1" 
                    placeholder="?????????" 
                    id ="phone" 
                    defaultValue = {item.phone}
                  />
                </td>
              )}
              {item.isEdit && (
                <td >
                  <input 
                    type="text" 
                    className="mx-auto px-1" 
                    placeholder="?????????" 
                    id ="email" 
                    defaultValue = {item.email}
                  />
                </td>
              )}
              <td>
                {!item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      edit(item.id, true);
                    }}
                  >
                    ??????
                  </button>
                )}
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      save(item.id, index);
                      edit(item.id, false);
                    }}
                  >
                    ??????
                  </button>
                )}
                {!item.isEdit &&(
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      del(item.id, index);
                    }}
                  >
                  ??????
                  </button>
                )}
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      edit(item.id, false);
                    }}
                  >
                    ??????
                  </button>
                )}
              </td>
            </tr>
          ))}
          {/* ???????????? ??? */}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </>
  )
}

export default Contact;
