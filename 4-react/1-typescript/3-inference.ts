// 타입추론
// type inference

// 첫번째 대입값에 따라서 형식을 자동으로 지정함
let firstname = "John"; // let firstname: string = "John"

function capitazlize1(str:string) {
  // IDE(integrated development evironment)에서 매개변수가 문자열인 것을 인지함
  // 해당 형식에 맞는 함수나 속성을 자동완성하여 사용할 수 있게됨.
  return str[0].toUpperCase() + str.substr(1);
}
console.log(capitazlize1('hello'));

// firstname = 1; //tyep error