//함수의 매개변수

// 소프트웨어 공학 - 변수명 : 타입
// c++ - 변수명 : 타입

// Java - 타입 변수명(int num)
// c# - 타입 변수명(int num)

// 변수명: type
// funtion 함수명 (매개변수1: 타입, 매개변수2: 타입):함수의 반환타입
function sum(a : number, b : number):number{
  return a + b;
}

console.log(sum(1, 2));

// 첫번쨰 글자를 대문자로 변환하는 함수
function capitazlize(str:string) {
  // IDE(integrated development evironment)에서 매개변수가 문자열인 것을 인지함
  // 해당 형식에 맞는 함수나 속성을 자동완성하여 사용할 수 있게됨.
  return str[0].toUpperCase() + str.substr(1);
}

console.log(capitazlize('hello'));