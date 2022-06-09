//App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Add from "../pages/Add";
import Detail from "../pages/Detail";
import Edit from "../pages/Edit";
import { Grid } from "../elements";

function App() {
  return (
    <React.Fragment>
      <Grid isRoot>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add/" element={<Add />} />
            <Route path="/edit/:idx" element={<Edit />} />
            <Route path="/detail/:idx" exact element={<Detail />} />
          </Routes>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default App;
