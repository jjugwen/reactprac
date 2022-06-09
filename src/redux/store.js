import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./modules/user";
import data from "./modules/data";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({
  user: user,
  data: data,
});

// 스토어 만들기
const store = legacy_createStore(rootReducer, enhancer);
// console.log("store.js", store.getState()); // 현재 store 안에 들어있는 상태를 조회

export default store;
