import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";
import { ContactItem } from "./ContactSlice";

interface ContactItemResponse {
  id: number;
  name: string,
  phone: string,
  email: string,
  memo?: string,
  createTime: number,
  modifyTime?: number,
}

const Contacts = () => {
  const contact = useSelector((state:RootState) => state.contact);
  const history = useHistory();

  const getTimeString = (unixtime : number) => {
    const day = 24 * 60 * 60 * 1000;
  
    const dateTime = new Date(unixtime);
  
    return unixtime - new Date().getTime() >= day
      ? dateTime.toLocaleDateString()
      : dateTime.toLocaleTimeString();
  };

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
    fetch("http://localhost:8080/contacts")
    // fetch 함수를 실행하고 네트워크 통신이 완료되면 then에 있는 함수(callback)를 실행함
    // then에 있는 callback 함수의 매개변수로 처리 결과를 남겨줌
    // body가 json이면 js object(array)로 변환
      .then((res) => res.json())
      // 응답데이터를 js object(array)로 변환이 완료되면 다음 then에 있는 함수(callback)을 실행함
      // then에 있는 callback 함수으 ㅣ매개변수로 변환된 결과를 넘겨줌
      .then((data : ContactItemResponse[]) => {
        console.log("--2. fetch completed--")
        console.log(data);

        // 서버로부터 받은 데이터를 state 객체로 변환함
        setTimeout(() => {
          const contacts = data.map((item) => ({
            id : item.id,
            name : item.name,
            phone : item.phone,
            email : item.email,
            memo : item.memo,
            createTime : item.createTime,
          })) as ContactItem[]
          // setContact(contacts);
        }, 2000)
      })
      console.log("--3. fetch completed--")
  }, []);

  return (
    <>
      <h1 className="text-center">Contact</h1>
      <button 
        className="btn btn-primary float-end" 
        onClick = {() => {
          history.push("/contacts/create");
        }}
      >
        <i className="bi bi-plus" />
      </button>
      <table className="table table-hover text-center top-10 my-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {contact.data.map((item, index) =>  (
            <tr
              onClick = {() => {
                history.push(`/contacts/${item.id}`);
              }}
              key = {index}
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <span style={{ fontSize: "0.75rem" }}>
                  {getTimeString(item.createTime)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default Contacts;
