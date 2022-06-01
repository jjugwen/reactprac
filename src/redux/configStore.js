//src > redux > configStore.js
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/bucket";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({ bucket });

// 스토어를 만듭니다.
const store = legacy_createStore(rootReducer, enhancer);

export default store;
