import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { editContact } from "./ContactSlice";

interface ContactItemState {
  id: number;
  name: string,
  phone: string,
  email: string,
  memo?: string,
  createTime: number,
  modifyTime?: number,
}

const ContactEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();


  const ContactItem = useSelector((state: RootState) => state.contact.data.find((item) => item.id === +id));

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  // useEffect: 특정조건일 때 작동하는 코드를 작성할 수 있게하는 React Hook
  // React Hook: 클래스컴포넌트에서만 할 수 있었던 작업을 함수형 컴포넌트에서 사용할 수 있게함 
  // -> 클래스컴포넌트 state, 컴포넌트 라이프사이클을 처리할 수 있음(stateful)
  // -> 함수형컴포넌트 다른 컴포넌트로부터 받은 prop으로 호면에 렌더링만(stateless)
  
  // useEffect(이펙트를처리할 함수, [의존변수])
  // 의존변수의 값/참조가 바뀔때마다 함수가 처리됨
  // ex) props가 바뀌거나 state가 바뀔때 추가적인 처리를 함
  
  // []의전변수 목릭이 빈 배열 -> 컴포넌트 처음 마운팅(렌더링)되는 시점에 처리가 됨
  useEffect(() => {
    // 특정조건일 때 처리되는 코드를 작성
    // [] -> 컴포넌트 처리 후 바로 처리되는 코드
    console.log("---mounted---");
    fetch("http://localhost:8080/contact")
    // fetch 함수를 실행하고 네트워크 통신이 완료되면 then에 있는 함수(callback)를 실행함
    // then에 있는 callback 함수의 매개변수로 처리 결과를 남겨줌
    // body가 json이면 js object(array)로 변환
      .then((res) => res.json())
      // 응답데이터를 js object(array)로 변환이 완료되면 다음 then에 있는 함수(callback)을 실행함
      // then에 있는 callback 함수으 ㅣ매개변수로 변환된 결과를 넘겨줌
      .then((data : ContactItemState[]) => {
        console.log("--2. fetch completed--")
        console.log(data);
      })
      console.log("--3. fetch completed--")
  }, []);
  
  const handleSave = () => {
    if(ContactItem){
      const item = {...ContactItem};
      item.id = ContactItem?.id;
      item.name = nameRef.current ? nameRef.current.value : " ";
      item.phone = phoneRef.current ? phoneRef.current.value : " ";
      item.email = emailRef.current ? emailRef.current.value : " ";
      item.memo = memoRef.current ? memoRef.current.value : " ";
      item.createTime = new Date().getTime();
  
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