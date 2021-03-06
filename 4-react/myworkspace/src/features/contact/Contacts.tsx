import produce from "immer";
import { useEffect, useRef, useState } from "react"
// import { ContactItem } from "./ContactSlice";

interface ContactState {
  id: number,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  isEdit: boolean;
}

interface ContactItems {
  id: number,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  isEdit: boolean;
}

interface ContactItemResponse {
  id: number,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
}


const Contact = () => {
  const [contactList, setContactList] = useState<ContactState[]>([]);
  const [isError, setIsError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const trRef = useRef<HTMLTableRowElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    console.log("---------mounted---------");
    fetch("http://localhost:8080/contacts")
    .then((res) => res.json())
    .then((data : ContactItemResponse[]) =>{
      console.log("----2.fetch completed----");
      console.log(data);
      setTimeout(() => {
        const contacts = data.map((item) => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          email: item.email,
        }))as ContactItems[]
        setContactList(contacts);
      });
    })
  }, []);

  const add = () => {
    if (!nameRef.current?.value || !phoneRef.current?.value || !emailRef.current?.value){
      setIsError(true);
    }

    const contact: ContactState = {
      id: contactList.length > 0 ? contactList[0].id + 1 : 1,
      name: nameRef.current?.value,
      phone: phoneRef.current?.value,
      email: emailRef.current?.value,
      isEdit: false,
    }

    setContactList(
      produce((draft) => {
        draft.unshift(contact);
      })
    )

    formRef.current?.reset();
    setIsError(false);

  }

  const del = (id: number, index: number) => {
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

  const save = (id: number, index: number) => {
    console.log(`"index:" ${index}`);
    console.log(tableRef.current?.querySelectorAll("tr")[index + 1]);
    // const input1 = trRef.current?.querySelectorAll("td")[index + 1].querySelector("input");
    // const input2 = trRef.current?.querySelectorAll("td")[index + 2].querySelector("input");
    // const input3 = trRef.current?.querySelectorAll("td")[index + 3].querySelector("input");
    // const input1 = tableRef.current?.querySelectorAll("tr")[index + 1].querySelectorAll("input");
    const input = tableRef.current?.querySelectorAll("tr")[index + 1];
    const name = input?.querySelectorAll("input")[0];
    const phone = input?.querySelectorAll("input")[1];
    const email = input?.querySelectorAll("input")[2];
    setContactList(
      produce((draft) => {
        const item = draft.find((item) => item.id === id);
        if (item) {
          item.name = name?.value;
          item.phone = phone?.value;
          item.email = email?.value;
          item.isEdit = false;
          console.log(name);
          console.log(phone);
          console.log(email);
          console.log(id, index);
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
          {}
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
