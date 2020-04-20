import "../css/layout.scss";
import "../css/publish.scss";
import "../css/selfAdapt.scss";

import React from "react";
import ReactDOM from "react-dom";

import { SidebarBox } from "./mainPage/SidebarBox";
import { BannerBox } from "./mainPage/BannerBox";
import { MesBox } from "./boardBox/MesBox";

interface BoxProps {}

function Box(props: BoxProps) {
  return (
    <div className="box">
      <BannerBox />
      <div className="main">
        <SidebarBox />
        <MesBox />
      </div>
    </div>
  );
}

ReactDOM.render(<Box />, document.getElementById("root"));
