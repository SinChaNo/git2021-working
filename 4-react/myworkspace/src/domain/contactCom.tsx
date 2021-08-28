import produce from "immer";
import { useRef, useState } from "react";

interface ContactState {
  id: number;
  name: string | undefined;
  tel: string | undefined;
  email: string | undefined;
  isEdit?: boolean;
}

const Contact = () => {
  const [contactList, setContactList] = useState<ContactState[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const telInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const trRef = useRef<HTMLTableElement>(null);

  const add = () => {
    const contact: ContactState = {
      id: contactList.length > 0 ? contactList[0].id + 1 : 1,
      name: nameInputRef.current?.value,
      tel: telInputRef.current?.value,
      email: emailInputRef.current?.value,
    };
    setContactList(
      produce((state) => {
        state.unshift(contact);
      })
    );
    formRef.current?.reset();
  };

  const del = (id: number, index: number) => {
    setContactList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    setContactList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.isEdit = mod;
        }
      })
    );
  };

  const save = (id: number, index: number) => {
    // console.log(trRef.current);

    const input = trRef.current?.querySelectorAll("input")[index];

    setContactList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          item.name = input?.value;
          item.tel = input?.value;
          item.email = input?.value;
          item.isEdit = false;
        }
      })
    );
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4">연락처 관리</h2>
      <form className="d-flex" ref={formRef}>
        <input
          type="text"
          className="form-control me-1"
          placeholder="이름"
          ref={nameInputRef}
        />
        <input
          type="text"
          className="form-control me-1"
          placeholder="전화번호"
          ref={telInputRef}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="이메일"
          ref={emailInputRef}
        />
        <button
          type="button"
          className="btn btn-outline-primary text-nowrap"
          onClick={() => {
            add();
          }}
        >
          추가
        </button>
      </form>
      <table className="table table-striped mt-5" ref={trRef}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "20%" }}>이름</th>
            <th style={{ width: "30%" }}>전화번호</th>
            <th style={{ width: "30%" }}>이메일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((item, index) => (
            <tr key={item.id}>
              {/* 보기모드일 때 보이는 내용 */}
              {!item.isEdit && <td>{item.id}</td>}
              {!item.isEdit && <td>{item.name}</td>}
              {!item.isEdit && <td>{item.tel}</td>}
              {!item.isEdit && <td>{item.email}</td>}

                {/* 수정모드일 때 보이는 입력폼 */}
                {item.isEdit && <td className="d-flex">{item.id}</td>}
                {item.isEdit && <input type="text" defaultValue={item.name} />}
                {item.isEdit && <input type="text" defaultValue={item.tel} />}
                {item.isEdit && <input type="text" defaultValue={item.email} />}

                {/* 보기모드일 때 보이는 버튼 */}
                {!item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm me-1 text-nowrap"
                    onClick={() => {
                      edit(item.id, true);
                    }}
                  >
                    수정
                  </button>
                )}
                {!item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm remove text-nowrap"
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
                    className="btn btn-outline-secondary btn-sm me-1 text-nowrap"
                    onClick={() => {
                      save(item.id, index);
                    }}
                  >
                    저장
                  </button>
                )}
                {item.isEdit && (
                  <button
                    className="btn btn-outline-secondary btn-sm text-nowrap text-nowrap"
                    onClick={() => {
                      edit(item.id, false);
                    }}
                  >
                    취소
                  </button>
                )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;