import React from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";

const Header = (props) => {
  const navigate = useNavigate();

  //로그인했을 때 다른 헤더 보이기
  const [is_login, setIsLogin] = React.useState(false);
  // console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  if (is_login) {
    return (
      <div className="Header">
        <button
          style={{
            marginRight: "1%",
            border: "none",
            backgroundColor: "yellowgreen",
            height: "2.5em",
            width: "6em",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          🔙 HOME
        </button>
        <button
          style={{
            marginRight: "1%",
            border: "none",
            backgroundColor: "yellowgreen",
            height: "2.5em",
            width: "7.5em",
          }}
          onClick={() => {
            navigate("/add");
          }}
        >
          ✍🏼 게시글 작성
        </button>
        <button
          style={{
            border: "none",
            backgroundColor: "yellowgreen",
            height: "2.5em",
            width: "6em",
          }}
          onClick={() => {
            signOut(auth);
          }}
        >
          👋🏼 로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="Header">
      <button
        style={{
          marginRight: "1%",
          border: "none",
          backgroundColor: "yellowgreen",
          height: "2.5em",
          width: "6em",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        🔙 HOME
      </button>
      <button
        style={{
          marginRight: "1%",
          border: "none",
          backgroundColor: "yellowgreen",
          height: "2.5em",
          width: "6em",
        }}
        onClick={() => {
          navigate(`/login`);
        }}
      >
        로그인
      </button>
      <button
        style={{
          border: "none",
          backgroundColor: "yellowgreen",
          height: "2.5em",
          width: "6em",
        }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Header;
