import { useEffect, useRef, useState } from "react"

import produce from "immer";
import api from "./contactApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContact } from "../../saga/contactSaga";
import Alert from "../../components/Alert";
interface ContactState {
  id: number;
  name: string;
  phone: string;
  email: string;
  isEdit: boolean;
  createdTime: number;
}

const ContactInlineEdit = () => {
  const [contactList, setContactList] = useState<ContactState[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState("");
  const state = useSelector((state: RootState) => state.contact);
  const dispatch = useDispatch<AppDispatch>();

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const trRef = useRef<HTMLTableRowElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);


  useEffect(() => {
    if(!state.isFetched){
      dispatch(requestFetchContact());
    }
  }, [dispatch, state.isFetched])

  const fetchData = async () => {
    const res = await api.fetch();

    const contact = res.data.map((item) => ({
      id : item.id,
      name : item.name,
      phone : item.phone,
      email : item.email,
      createdTime: item.createdTime,
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
        createdTime: new Date().getTime(),
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
        draft.splice(index, 1);//save에서 응용할수 있을 것 같은 느낌
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
      <h1 className ="text-center">Contact Inline Back</h1>
  
      <form className="d-flex" action="" ref = {formRef} >
        <input type="text" className="mx-auto px-3" placeholder="이름" id ="name" ref ={nameRef}/>
        <input type="text" className="mx-auto px-3" placeholder="연락처" id ="phone" ref ={phoneRef}/>
        <input type="text" className="mx-auto px-3" placeholder="이메일" id ="email" ref ={emailRef}/>
        <button 
          id="add-btn" 
          type="button" 
          className="btn btn-primary mx-auto px-3"
          onClick = {() => {
            add();
          }}
        >
          추가하기
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            dispatch(requestFetchContact());
          }}
        >
          <i className="bi bi-arrow-clockwise"></i>
          새로고침
        </button>
      </form>
      
      {isError && (
        <Alert
        message={errMessage}
        variant={"danger"}
        // 닫기 버튼을 클릭할 때 처리하는 함수를 넘김
        onClose={() => {
          setIsError(false);
        }}
      />
      )}
      <table 
        id="table"
        ref= {tableRef}
        className="table table-striped table-hover text-center top-10 my-5"
      >
        <thead>
          <tr>
            <th>no.</th>
            <th>이름</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody id="contactList" ref = {tbodyRef}>
          {/* 컨텐츠 만드는 곳 */}
          {isLoading && (
            <li className="list-group-item text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </li>
          )}
          {!isLoading && contactList.length === 0 && (
            <li className ="list">데이터가 없습니다.</li>
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
                    placeholder="이름" id ="name" 
                    defaultValue = {item.name}
                  />
                </td>
              )}
              {item.isEdit && (
                <td >
                  <input 
                    type="text" 
                    className="mx-auto px-1" 
                    placeholder="연락처" 
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
                    placeholder="이메일" 
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
                    수정
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
                    저장
                  </button>
                )}
                {!item.isEdit &&(
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      del(item.id, index);
                    }}
                  >
                  삭제
                  </button>
                )}
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap"
                    onClick={() => {
                      edit(item.id, false);
                    }}
                  >
                    취소
                  </button>
                )}
              </td>
            </tr>
          ))}
          {/* 만드는거 끝 */}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </>
  )
}

export default ContactInlineEdit;
