//src > redux > modules > user.js
import { db, auth } from "../../shared/firebase";
import { collection, getDoc, addDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

//action
const CREATE = "user/CREATE";
const LOAD = "user/LOAD";
const LOADONE = "user/LOADONE";

//초기 상태값
const initialState = {
  list: [],
};

//action creator 액션 생성 함수
export function createUser(data) {
  return { type: CREATE, data };
}
// export const createUser = (data) => ({ type: "CREATE", data }); //화살표 함수로 만든 액션 생성 함수
export function loadUser(data) {
  return { type: LOAD, data };
}
export function loadoneUser(data) {
  return { type: LOADONE, data };
}

//middleware
export const newsignupFB = (data) => {
  return async function (dispatch) {
    // 신규 사용자 가입 데이터 firestore에 바로 저장(업데이트)
    const docRef = await addDoc(collection(db, "users"), data);
    const _user = await getDoc(docRef);
    const user_data = { id: _user.id, ..._user.data() };
    // console.log(user_data);
    dispatch(createUser(user_data));
  };
};
// 로그인 사용자 정보 alluserFB 중 로그인한 user 찾기
export const isLoginFB = () => {
  return async function (dispatch) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const emailID = user.email;
        // const nickname = user.nickname;
        // console.log(emailID);
        dispatch(loadoneUser(emailID));
      } else {
        signOut(auth);
      }
    });
  };
};

// 모든 사용자 정보 - 게시글 가져올 떄 필요하려나? 일단 함수 생성.
export const alluserFB = () => {
  return async function (dispatch) {
    const user_data = await getDocs(collection(db, "users"));
    // console.log(user_data);
    let user_list = [];

    user_data.forEach((doc) => {
      // console.log(doc.data());
      user_list.push({ id: doc.id, ...doc.data() });
    });
    // console.log(user_list);
    dispatch(loadUser(user_list));
  };
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/CREATE": {
      const new_data = [...state.list, action.data];
      // console.log(new_data);
      return { ...state, list: new_data };
    }
    case "user/LOAD": {
      // console.log(action.data);
      return { list: action.data };
    }
    case "user/LOADONE": {
      // console.log(action.data);
      return { list: action.data };
    }

    default:
      return state;
  }
}
