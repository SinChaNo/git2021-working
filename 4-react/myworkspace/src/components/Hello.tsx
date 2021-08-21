import { useRef, useState } from "react";

const Hello = () => {
  const [userName, setUserName] = useState<string | undefined>("");
  
  // 참조 객체 생성
  // useRef<참조 객체 타입>(초기값);

  // JSX Element를 참조하는 객체라면
  // JSX Element로 렌더링 되는 HTML요소의 타입을 넣어야함, 기본값은 null
  const inputRef = useRef<HTMLInputElement>(null);

  const hello = () => {
    // console.log(inputRef.current);
    // console.log(inputRef.current?.value); //current가 null이면 undefinend를 반환

    // current 객체가 있으면 == 랜더링된 HTML요소가 있으면
    // current?.value == 입력박스의 입력값(String)

    // current 객체가 없으면> == 랜더링된 HTML요소가 없으면
    // current?.value == 입력박스의 값 (null)
    // const name = inputRef.current?.value;
    // setUserName(name); 
    
    setUserName(inputRef.current?.value); 

    // 값 비워주기
    inputRef.current && (inputRef.current.value ="");
  }


  return (
    <div>
      <h2>Hello</h2>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          hello();
        }}
      >인사</button>
      {
        <div>안녕하세요! [{userName}]님</div>
      }
    </div>
  )
};

export default Hello;