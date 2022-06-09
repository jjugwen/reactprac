//로그인 페이지

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../elements/Button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../shared/firebase";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = () => {
  // 버튼 누르면 페이지 이동위한 route 버전 6의 navigate
  const navigate = useNavigate();
  // 버튼 비활성화 (useState 후 각 input에 id 지정(첫번째 값)하고 onChange로 수정 타깃)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //ref
  const id_ref = useRef(null);
  const pw_ref = useRef(null);

  const loginFB = async () => {
    // console.log(id_ref.current.value, pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user); //UserCredentialImpl {user: UserImpl, providerId: null, _tokenResponse: {…}, operationType: 'signIn'}
    // console.log(user.user.email);
    const user_docs = await getDocs(
      query(collection(db, "users"), where("emailID", "==", true))
    );
    // // console.log(user_docs); //Ph {_firestore: Vc, _userDataWriter: nl, _snapshot: xu, metadata: Ah, query: mc}
    user_docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <>
      <Header />

      <div className="InputBox">
        <h1>로그인</h1>
        <div className="sotitle">아이디(이메일)</div>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          ref={id_ref}
          className="Input"
          placeholder="아이디를 입력하세요"
        ></input>
        <div className="sotitle">비밀번호</div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          ref={pw_ref}
          className="Input"
          placeholder="비밀번호를 입력하세요"
        ></input>
        <Button
          _disabled={!email || !password ? true : false}
          _onclick={() => {
            loginFB();
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }}
        >
          로그인하기
        </Button>
      </div>
    </>
  );
};

export default Login;
