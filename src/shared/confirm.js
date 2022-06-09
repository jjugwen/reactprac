//confirm.js

//이메일 형식
const emailCheck = (id) => {
  let _reg =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  return _reg.test(id);
};

// 비밀번호 8자리 이상
const is_password = (pw) => {
  let _reg = /^[0-9a-zA-Z!@#$%^&.*]{8,20}$/;
  return _reg.test(pw);
};

export { emailCheck, is_password };
