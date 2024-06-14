import React from "react";
import { Nav } from "./components/Nav/Nav";
import logo from "./assets/wb.svg";
import { Main } from "./components/Main/Main";

function App() {
  return (
    <>
      <img className="logo" src={logo} alt="logo"></img>
      <Nav />
      <Main />
    </>
  );
}

export default App;
