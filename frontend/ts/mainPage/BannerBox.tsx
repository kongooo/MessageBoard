import React from "react";

export { BannerBox };

interface BannerProps {}

interface BannerBoxProps {}

function Banner(props: BannerProps) {
  return <div></div>;
}

function BannerBox(props: BannerBoxProps) {
  return (
    <div className="banner">
      <Banner />
    </div>
  );
}
