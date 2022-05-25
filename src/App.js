
import React from 'react';
import './App.css';
import { Route } from "react-router-dom";

import Home from "./Home";
import Review from "./Review";


function App() {
  return (
    <div className='App'>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/review/:weekdays" exact componet={Review}>
        <Review />
      </Route>
    </div>
  );
}


export default App;