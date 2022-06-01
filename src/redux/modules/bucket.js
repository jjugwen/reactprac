//src > redux > modules > bucket.js

import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 액션 타입 정하기
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const DELETE = "bucket/DELETE";

// 초기 상태값
const initialState = {
  list: [],
};

// 액션 생성 함수
export function loadBucket(word_list) {
  return { type: LOAD, word_list };
}

export function createBucket(bucket) {
  return { type: CREATE, bucket };
}

export function updateBucket(bucket_idx) {
  return { type: UPDATE, bucket_idx };
}

export function deleteBucket(bucket_idx) {
  return { type: DELETE, bucket_idx };
}

//미들웨어s
export const loadBucketFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "word"));
    // console.log(word_data);
    let word_list = [];

    word_data.forEach((doc) => {
      // console.log(doc.data());
      word_list.push({ id: doc.id, ...doc.data() });
    });
    // console.log(word_list);
    dispatch(loadBucket(word_list));
  };
};

export const addBucketFB = (word) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "word"), word);
    const _bucket = await getDoc(docRef);
    const word_data = { id: _bucket.id, ..._bucket.data() };
    // console.log(word_data);

    dispatch(createBucket(word_data));
  };
};

// 파이어베이스랑 통신하는 부분
export const updateBucketFB = (f) => {
  return async function (dispatch, getState) {
    console.log(f);
    //파이어베이스에서 수정할 document 가져오기
    const docRef = doc(db, "word", f.id);

    //수정
    await updateDoc(docRef, {
      word: f.word,
      explain: f.explain,
      example: f.example,
    });

    //getState()를 사용해서 스토어의 데이터 가져오기
    const _word_list = getState().bucket.list;
    console.log(_word_list);
    //findIndex로 몇 번째에 있는 지 찾기
    const word_index = _word_list.findIndex((b) => {
      // updateBucketFB의 파라미터로 넘겨받은 아이디와 아이디가 똑같은 요소는 몇 번째에 있는 지 찾기
      return b.id === f.id;
    });

    dispatch(updateBucket(word_index));
  };
};

export const deleteBucketFB = (word_id) => {
  return async function (dispatch, getState) {
    if (!word_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const _word_list = getState().bucket.list; //bucket을 word로 써놔서 바로 바뀌지 않았던!
    const word_idx = _word_list.findIndex((b) => {
      return b.id === word_id;
    });
    dispatch(deleteBucket(word_idx));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.word_list };
    }

    case "bucket/CREATE": {
      const new_word_list = [...state.list, action.bucket];
      return { ...state, list: new_word_list };
    }

    case "bucket/UPDATE": {
      const new_word_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_idx) === idx) {
          return {
            ...l,
            id: action.bucket_idx.id,
            word: action.bucket_idx.word,
            explain: action.bucket_idx.explain,
            example: action.bucket_idx.example,
          };
        } else {
          return l;
        }
      });
      console.log({ list: new_word_list });
      return { ...state, list: new_word_list };
    }

    case "bucket/DELETE": {
      const new_word_list = state.list.filter((l, idx) => {
        return parseInt(action.bucket_idx) !== idx;
      });

      return { ...state, list: new_word_list };
    }

    default:
      return state;
  }
}
