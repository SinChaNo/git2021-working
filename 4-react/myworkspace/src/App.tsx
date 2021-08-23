/*
// JSX: Javascript 기반의 HTML 태그 형식
// 각각의 태그(element)들은 javascript 객체임
// 일반적인 html 태그 표기법과 다름

// JSX Element
// const element = (
// <h1 className="greeting">
  // Hellom world!
  // </h1>
// );

// 실제 컴파일되는 결과
// const element = React.createElement(
// 'h1', //태그 종류
// {className: 'greeting'}, //속성
// 'Hellom world' //컨텐트
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
import "./App.scss"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

const Counter = lazy(() => import("./components/Counter"));
const Calculator = lazy(() => import("./components/Calculator"));
const Generator = lazy(() => import("./components/Generator"));
const AccountManager = lazy(() => import("./components/AccountManager"));
const Hello = lazy(() => import("./components/Hello"));
const CalculatorRef = lazy(() => import("./components/CalculatorRef"));
const AccountManagerRef = lazy(() => import("./components/AccountManagerRef"));
const Components = lazy(() => import("./components/Componenets"));
const BootStrap = lazy(() => import("./components/Bootstrap"));
const Todo = lazy(() => import("./components/Todo"))
// import Feed from "./components/Feed";
const Feed = lazy(() => import("./components/Feed"))



function App() {
  return (
    <Router>
      {/* // main container */}
      <div style={{width: "800px", height: "100vh", marginTop:"20px"}} className="mx-auto">
        <nav style={{width: "200px"}} className="position-fixed">
        <Navigation />  
        </nav>
        <main style={{marginLeft:"200px"}}>
          <Suspense fallback={<div>Loding...</div>}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/components" component={Components} />
              <Route path="/counter" component={Counter} />
              <Route path="/claculator" component={Calculator} />
              <Route path="/generator" component={Generator} />
              <Route path="/account-manager" component={AccountManager} />
              <Route path="/bootstrap" component={BootStrap} />
              <Route path="/todo" component={Todo} />
              <Route path="/Feed" component={Feed} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;