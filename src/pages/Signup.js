//회원가입 페이지
import React from "react";
import { useDispatch } from "react-redux";
import { newsignupFB } from "../redux/modules/user";
import { auth } from "../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { emailCheck, is_password } from "../shared/confirm";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 회원가입 입력 정보 Ref 객체 만들기
  const id_ref = React.useRef();
  const nickname_ref = React.useRef();
  const pw_ref = React.useRef();
  const pw2_ref = React.useRef();

  //auth.createUserWithEmailAndPassword()로 가입 시키기 -firebase가이드에 따라 (이메일 주소와 비밀번호를 사용해 앱에 가입할 수 있는 양식)
  const singupFB = async () => {
    if (emailCheck(id_ref.current.value)) {
      if (is_password(pw_ref.current.value)) {
        // console.log(pw_ref.current.value);
        // console.log(!is_password(pw_ref.current.value));
        if (pw_ref.current.value === pw2_ref.current.value) {
          const user = await createUserWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
          );
          console.log(user);
          await dispatch(
            newsignupFB({
              emailID: id_ref.current.value,
              nickname: nickname_ref.current.value,
            })
          );
          //회원가입 성공 후 알림창 띄우고, user 정보 저장되는 시간 고려해서 시간 간격 두고 Main페이지로 이동
          alert("회원가입 성공!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          window.alert("비밀번호가 같지 않습니다.");
        }
      } else {
        window.alert("비밀번호는 8자리 이상입니다!");
      }
    } else {
      window.alert("이메일 형식이 맞지 않습니다!");
    }
  };

  return (
    <>
      <Header />
      <div className="InputBox">
        <h1>회원가입</h1>
        <div className="sotitle">아이디</div>
        <input
          ref={id_ref}
          className="Input"
          placeholder="아이디는 이메일 형식(test@test.test)입니다."
        />
        <div className="sotitle">닉네임</div>
        <input
          ref={nickname_ref}
          className="Input"
          placeholder="닉네임을 입력하세요"
        />
        <div className="sotitle">비밀번호</div>
        <input
          type="password"
          ref={pw_ref}
          className="Input"
          placeholder="비밀번호는 8자리 이상만 가능합니다."
        />
        <div className="sotitle">비밀번호 확인</div>
        <input
          type="password"
          ref={pw2_ref}
          className="Input"
          placeholder="비밀번호를 다시 입력하세요"
        ></input>
        <button
          className="Buttons"
          onClick={() => {
            singupFB();
          }}
        >
          회원가입하기
        </button>
      </div>
    </>
  );
};

export default Singup;
