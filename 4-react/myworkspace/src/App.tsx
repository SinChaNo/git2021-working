
/*
// JSX: Javascript 기반의 HTML 태그 형식
// 각각의 태그(element)들은 javascript 객체임
// 일반적인 html 태그 표기법과 다름

// JSX Element
// const element = (
//   <h1 className="greeting">
//     Hellom world!
//   </h1>
// );

// 실제 컴파일되는 결과
// const element = React.createElement(
//    'h1', //태그 종류
//    {className: 'greeting'}, //속성
//    'Hellom world' //컨텐트
// );

// React.createElement("div", ...)
// 가상 DOM을 생성함
// 가상 DOM == javascript 객체
// 내부적으로 가상DOM tree를 관리함

// 렌더링(rendering): 화면에 그리기
// 가상DOM을 생성하고 렌더링 시점(event loop)에 가상DOM을 HTML DOM으로 그림

// 일반DOM
// DOM을 조작할 때마다 rendering함, 성능 저하

// 가상DOM
// 렌더링 주기에 따라서 변동사항만 렌더링함

// react 관련 자료는 2020년 이후 것으로만

// Function Component
// 대문자로 시작함
// JSX Element를 반환함
// JS함수인데, JSX Element를 반환함 == Component
*/

import Header from "./components/Header";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Calculator from "./components/Calculator";
import Generator from "./components/Generator";
import AccountManager from "./components/AccountManager";
import Hello from "./components/Hello";
import CalculatorRef from "./components/CalculatorRef";
import AccountManagerRef from "./components/AccountManagerRef";

function App() {
  return (
    // main container
    <div style ={{width: "500px", margin: "0 auto"}}>
      {/* JSX 내부에서 주석 달기 */}
      <h1 style={{color: "royalblue"}}>Hello Reac With Typescript!</h1>
      {/* 컴포넌트에 속성으로 color, title을 받고 넘김 */}
      
      {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
      {/* COmponent의 속성(prop)을 넘김 */}
      {/* 속성명={속성값} */}
      <Header color = {"red"} title = {"React"}/>
      <Header color = {"blue"} title = {"Typescript"}/>
      <Header color = {"green"} title = {"Function Component"}/>

      {/* <Button color = {"white"} backgroundColor = {"green"} text = {"add"} />
      <Button color = {"white"} backgroundColor = {"red"} text = {"delete"} />
      <Button color = {"white"} backgroundColor = {"blue"} text = {"edit"} /> */}
      <Button variant = {"primary"} text = {"Done"}/>

      <Counter />
      <Calculator />
      <CalculatorRef />
      <Generator />
      <AccountManager />
      <AccountManagerRef />
      <Hello />
    </div>
  );
}

export default App;
