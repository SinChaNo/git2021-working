import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Progress = () => {
  const progress = useSelector((state: RootState) => state.progress);

  return (
    <>
    {/* 너비값은 컨텐츠 너비, 높이값은 자식 높이 */}
    {/* spinner, progress 이런 것들은 사용자의 입력 방지 */}
    {progress.status && (
      <div 
        className="position-fixed" 
        style={{width: "100%", height: "100%", left: "Calc(50% - 1rem)", top: "Calc(50% - 1rem)", zIndex: 9500}}
      >
        <div 
          className="spinner-border text-primary" 
          role="status"
          style= {{ left: "Calc(50% - 1rem)", top: "Calc(50% - 1rem)", zIndex: 9900}}
        >
          <span 
            className="visually-hidden"
          >
            Loading...
          </span>
        </div>
      </div>    
    )}
    </>
  )
}

export default Progress;