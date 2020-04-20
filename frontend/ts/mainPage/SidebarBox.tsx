import React from "react";

export { SidebarBox };

interface SidebarBoxProps {}

interface SidebarProps {}

function Sidebar(props: SidebarProps) {
  return <div></div>;
}

function SidebarBox(props: SidebarBoxProps) {
  return (
    <div className="sidebar-box">
      <Sidebar />
    </div>
  );
}
