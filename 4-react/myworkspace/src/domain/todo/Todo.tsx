import { useRef, useState } from "react";
import Alert from "../../components/Alert";
import { useSelector } from "react-redux";
import { TodoState } from "../type"
import { RootState } from "../../store";
import produce from "immer";

// 1건에 대한 타입


const getTimeString = (unixtime: number) => {
  // 1 sec: 1000
  // 1 min: 60 * 1000
  // 1 hous: 60 * 60 * 1000
  // 1 dat: 24 * 60 * 60 * 1000

  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Todo = () => {
  // profile state 를 가져옴 + state가 변경되면 컴포넌트를 업데이트 함
  const profile = useSelector((state: RootState) => state.profile)
  // todo 여러건에 대한 state
  // 참고) new Date().getTime() -> unix time 생성됨
  const [todoList, setTodoList] = useState<TodoState[]>([
    { 
      id: 2, 
      memo: "Typescript", 
      username: profile.username,
      createTime: new Date().getTime() 
    },
    { 
      id: 1, 
      memo: "React State 연습", 
      username: profile.username,
      createTime: new Date().getTime() 
    },
  ]);

  // 빈 값 여부 state
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    // 이벤트 객체가 있을 때는 입력박스에서 엔터 입력
    if (e) {
      if (e.code !== "Enter") return;
    }

    // 입력값이 없으면 에러 메시지 표시
    if (!inputRef.current?.value) {
      setIsError(true);
      return;
    }

    const todo: TodoState = {
      id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      // optional chaning
      memo: inputRef.current?.value,
      username: profile.username,
      createTime: new Date().getTime(),
    };

    setTodoList(
      produce((draft) => {
        draft.unshift(todo);
      })
    );

    // 입력값 초기화
    formRef.current?.reset();
    // 에러 메시지 제거
    setIsError(false);
  };

  const del = (id: number, index: number) => {
    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외하고 새로운 배열로 리턴함.
    setTodoList(
      produce((draft) => {
        draft.splice(index, 1)
      })
    );
  };

  const editItem = useRef<TodoState>({
    id: 0,
    memo: "",
    username: profile.username,
    createTime: 0,
  });

  const edit = (item: TodoState) => {
    // 해당 id에 해당하는 item만 edit 모드로 변경함
    // 해당 item의 속성을 변경한 후 변경된 item을 반환
    // map 함수는 새로운 배열을 반환하는 함수, 배열길이는 기존 배열 길이와 같음
    editItem.current = item;
    setIsEdit(true);
  };

  const save = (id: number, index: number) => {
    console.log(ulRef.current);

    // ul 밑에 있는 입력박스중에서 index번째 입력박스만 선택
    const input = ulRef.current?.querySelectorAll("input")[index];
    setTodoList(
      todoList.map((item) => {
        // 해당 id의 item의 값을 변경
        if (item.id === id) {
          item.memo = input?.value;
          item.modifyTime = new Date().getTime();
          item.isEdit = false;
        }

        return item;
      })
    );
  };

  return (
    <>
      <h2 className="text-center my-5">할 일 관리</h2>
      {/* profile 정보 확인용 */}
      <div>
        <img
          src={profile.image}
          width={150}
          height={100}
          alt={profile.username}
        />
        <span>{profile.username}</span>
      </div>
      <form
        className="d-flex"
        ref={formRef}
        /* 
          event.preventDefault(); 
          - 기본이벤트 작업을 처리하지 않음 
          - submit form
        */
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="할 일 ..."
          ref={inputRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      {isError && (
        <Alert
          message={"내용을 입력해주세요."}
          variant={"danger"}
          // 닫기 버튼을 클릭할 때 처리하는 함수를 넘김
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
      <ul id="ul-list" className="list-group list-group-flush mt-3" ref={ulRef}>
        {todoList.length === 0 && (
          <li className="list-group-item">데이터가 없습니다.</li>
        )}
        {/* 데이터와 UI요소 바인딩 */}
        {todoList.map((item, index) => (
          <li className="list-group-item d-flex" key={item.id}>
            <div className="w-100">
              {/* 보기모드일 때 보이는 내용 */}
              {!item.isEdit && <span className="me-1">{item.memo}</span>}
              {!item.isEdit && (
              <span style={{ fontSize: "0.75rem" }}>
                - {item.username}, {getTimeString(item.createTime)}
              </span>
              )}
              {/* 수정모드일 때 보이는 입력폼 */}
              {item.isEdit && (
                <input type="text" className="w-100" defaultValue={item.memo} />
              )}
            </div>
            {/* 보기모드일 때 보이는 버튼 */}
            {!item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                onClick={() => {
                  edit(item);
                }}
              >
                수정
              </button>
            )}
            {!item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  del(item.id, index);
                }}
              >
                삭제
              </button>
            )}
            {/* 수정모드일 때 보이는 버튼 */}
            {item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                onClick={() => {
                  save(item.id, index);
                }}
              >
                저장
              </button>
            )}
            {item.isEdit && (
              <button
                className="btn btn-outline-secondary btn-sm text-nowrap"
                onClick={() => {
                  edit(item);
                }}
              >
                취소
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;