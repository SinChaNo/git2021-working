// Counter 컴포넌트
// state(상태)

import { useState } from "react";

const Counter = () => {
  // const [state명, state변경 함수명] = useState(초깃값)
  const [count, setCount] = useState(0);

  const increase = () =>{
    setCount(count +1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button
          onClick={() => {
            increase();
          }}
        >
          COUNT
        </button>
        <span>{count}</span>
      </div>
    </div>
  );
};

export default Counter;