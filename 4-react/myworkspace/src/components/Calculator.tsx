import { useState } from "react";

interface calculatorProp{
  a : number;
  b : number;
  ad : string;
}

const Calculator = () =>{
  const [result, setResult] = useState(0);
  const calculate = () => {
    const a = prompt('첫번쨰 숫자');
    const b = prompt('두번쨰 숫자');
    const ab = prompt('연산자(+, -, *, /)');

    console.log(`${a}${ab}${b}`);
    setResult(eval(`${a}${ab}${b}`));
  }

  return (
    <div>
      <h2>calculator</h2>
      <div>
        <button
          onClick ={() => {
            calculate();
          }}
        >
          Start
        </button>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Calculator;