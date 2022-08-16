import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//웹 브라우저가 가지고 있는 주소 관련 정보를 props로 넘겨주는 'BrowserRouter(브라우저라우터)'
import { BrowserRouter } from "react-router-dom";

// 리덕스를 주입할 프로바이더 불러오기
import { Provider } from "react-redux";
// 연결할 스토어 가지고 오기
import store from "./redux/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
