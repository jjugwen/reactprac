//게시글 목록 모듈
//redux
import { db, storage } from "../../shared/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

//action
const LOAD = "data/LOAD";
const CREATE = "data/CREATE";
const UPDATE = "data/UPDATE";
const DELETE = "data/DELETE";

//초기 상태값
const initialState = {
  list: [],
};

//action creator 액션 생성 함수
export function postLoad(post_list) {
  return { type: LOAD, post_list };
}

export function postCreate(post_list) {
  return { type: CREATE, post_list };
}

export function postUpdate(post) {
  return { type: UPDATE, post };
}

export function postDelete(post) {
  return { type: DELETE, post };
}

//middleware
//포스트 추가하기
export const addPostFB = (post) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "data"), post);
    const _post = await getDoc(docRef);
    const post_data = { id: _post.id, ..._post.data() };

    dispatch(postCreate(post_data));
  };
};

// 포스트 목록 불러오기
export const loadPostFB = () => {
  return async function (dispatch) {
    // const post_data = await getDocs(collection(db, "data"));
    const post_order = query(
      collection(db, "data"),
      orderBy("insert_dt", "desc")
    );
    const post_data = await getDocs(post_order);
    // console.log(post_data);
    let post_list = [];

    post_data.forEach((doc) => {
      // console.log(doc.data());
      post_list.push({ id: doc.id, ...doc.data() });
    });
    // console.log(post_list);
    dispatch(postLoad(post_list));
  };
};

//포스트 수정하기
export const updatePostFB = (post) => {
  return async function (dispatch, getState) {
    console.log(post);
    const docRef = doc(db, "data", post.id);
    await updateDoc(docRef, {
      layout: post.layout,
      contents: post.contents,
      image_url: post.image_url,
    });
    const _post_list = getState.data.list;
    const post_idx = _post_list.map((b) => {
      if (b.id === post.id) {
        return {
          layout: post.layout,
          contents: post.contents,
          image_url: post.image_url,
        };
      } else {
        return b;
      }
    });
    console.log(post_idx);
    dispatch(postUpdate(post));
  };
};

//포스트 삭제하기
export const deletePostFB = (post_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "data", post_id);
    await deleteDoc(docRef);

    const _post_list = getState().data.list;
    const post_idx = _post_list.findIndex((b) => {
      return b.id === post_id;
    });
    dispatch(postDelete(post_idx));
  };
};

//포스트 삭제 시 사진 firebasestorage에서 삭제
export const deleteImageFB = async (imgName) => {
  const desertRef = await ref(storage, "/images/" + imgName);
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "data/DELETE": {
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post) !== idx;
      });
      return { ...state, list: new_post_list };
    }
    case "data/UPDATE": {
      const new_post_list = [...action.post];
      return { list: new_post_list };
    }
    case "data/LOAD": {
      return { list: action.post_list };
    }
    case "data/CREATE": {
      const new_post_list = [...state.list, action.post];
      return { ...state, list: new_post_list };
    }
    default:
      return state;
  }
}
