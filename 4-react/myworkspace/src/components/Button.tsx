// Button 컴포넌트 생성
// <button ... JSX 엘리먼트를 반환하는 컴포넌트
// 속성: 
// color: 글자 색
// backgroundColor: 배경색
// text: 버튼의 택스트

import React from "react";

interface ButtonProp{
  // color: "white" | "black";
  // backgroundColor: "red" | "green" | "blue";
  variant: "primary" | "secondary";
  text: string;
};

const Button : React.FC<ButtonProp> = ({variant, text}) => {
  // return <button style ={{color} {backgroundColor}}>{text}</button>
  return <button style ={{backgroundColor: variant == "primary" ? "blue" : "gray"}}>
    {text.toUpperCase()}
  </button>
};

export default Button;