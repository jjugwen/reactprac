// App.js

import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// 액션생성함수 가져오기
import { loadBucketFB } from "./redux/modules/bucket";

import Main from "./Main";
import Word from "./Word";
import Edit from "./Edit";

function App() {
  const [list, setList] = React.useState([]);

  // firestore 저장 데이터 불러오기
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadBucketFB());
  });

  return (
    <div className="App">
      <Route path="/" exact>
        <Main list={list} />
      </Route>
      <Route path="/word/:idx" componet={Word}>
        <Word />
      </Route>
      <Route path="/edit/:idx" exact componet={Edit}>
        <Edit />
      </Route>
    </div>
  );
}

export default App;
