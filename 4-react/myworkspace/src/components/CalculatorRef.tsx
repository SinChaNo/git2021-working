import { useRef, useState } from "react";

interface calculatorProp{
  a : number;
  b : number;
  c : string;
}



const CalculatorRef = () =>{
  const inputRefA = useRef<HTMLInputElement>(null);
  const inputRefB = useRef<HTMLInputElement>(null);
  const inputRefC = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState(0);
  const calculate = () => {
    const a = inputRefA.current?.value;
    const b = inputRefB.current?.value;
    const c = inputRefC.current?.value;

    console.log(`${a}${c}${b}`);
    setResult(eval(`${a}${c}${b}`));
  }

  return (
    <div>
      <h2>calculator</h2>
      <div>
        <input type="text" ref={inputRefA} />
        <input type="text" ref={inputRefC} />
        <input type="text" ref={inputRefB} />
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

export default CalculatorRef;