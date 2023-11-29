import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScoreComponent  from "./api/scores";
// 컴포넌트를 페이지에 렌더링
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ScoreComponent />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);