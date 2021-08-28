// 계좌관리

import { useRef, useState } from "react";

// 버튼: 입금버튼, 출금버튼
// 버튼 클릭시에 입금 금액 또는 출금 금액을 입력 받을 수 있음.

// 목록: 입금, 출금액 목록을 ul > li로 표시한다.
// 입금 금액은 <li> 입금: 금액 (녹색)</li> 으로 표시
// 출금 금액은 <li> 출금: -금액 (빨간색)</li> 으로 표시

// 잔액: 잔액을 입금, 출금 버튼 우측에 표시한다.

// 거래 

const ListItem = ({money} : {money:number}) => {
  return (
    <li style ={{color: money < 0 ? "red" : "blue"}}>
      {money < 0 ? "출금: " : "입금: "}
      {money}

    </li>
  );
}

const AccountManagerRef = () => {
  const inputMoneyRef = useRef<HTMLInputElement>(null);
  
  const [logs, setLogs] = useState<number[]> ([]);
  
  const transaction = (mod: "deposit" | "withdrawal") => {
    // withdrawal 일시 입금금액 아닐시 출금금액 을 msg 에 값을 대입
    const msg = mod === "deposit" ? "입금금액" : "출금금액";
    const input = inputMoneyRef.current?.value;

    let money = 0;
    // input으로 받은 값이
    if (input) {
      // 입금일 시 input에 양수를 아닐시 음수를 대입
      money = mod === "deposit" ? +input : -input;
    }

    // 입출금 이력 state에 입력값을 추가
    if (mod == "deposit"){
      // 입금일 시
      setLogs([money, ...logs]);
      // 출금일 시
    }else {
      // 출금의 가능 유무 확인
      if (check(logs, money)){
        // 입출금 이력 state에 값을 추가
        setLogs([money, ...logs])
      } else {
      alert("잔액이 부족합니다.");
      }
    }
  };

  const check = (logs: number[], money : number) => {
    let sum = 0;
    if (logs.length > 0) {
      sum = logs.reduce((acc, log) => acc + log);
    }

    return sum + money >= 0;
  }
  


  return (
    <div>
      <h2>AccountManager</h2>
      <input type="text" ref = {inputMoneyRef}/>
      <button
        onClick={() => {
          transaction("deposit");
        }}
      >
        입금</button>
      <button
        onClick={() =>{
          transaction("withdrawal");
        }}
      >
        출금</button><br />
      {
        logs.length > 0 && (
          <span>잔액 : {logs.reduce((acc, log) => acc + log)}</span>
        )
      }
      <ul>
        {
          // 입출금 내역을 표시하는 부분
          // 반복적으로 표시되는 요소/컴포넌트에는 key 속성이 필수
          logs.map((money, index) => (
            <ListItem key = {index} money = {money} />
          ))
        }

      </ul>
    </div>
  );
}

export default AccountManagerRef;