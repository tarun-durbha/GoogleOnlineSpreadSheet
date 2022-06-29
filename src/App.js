import React,{useState,useCallback,useMemo,useEffect, cloneElement} from "react";
import './App.css';
import Navbar from "./Navbar.js"
import Main from "./Main.js"

function App() {

  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
