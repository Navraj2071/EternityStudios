import React from "react";
import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";

const LotteryArticle = () => {
  const title = "Crypto Lottery";

  const text = "Coming Soon....";

  const src =
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600";

  return (
    <section className="section-vertical">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
      </div>

      <div className="illustration">
        <img src={src} alt="NFT" />
      </div>
    </section>
  );
};

const Article = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          width: "80vw",
          margin: "auto",
        }}
      >
        <LotteryArticle />
      </div>
      <Footer />
    </>
  );
};

export default Article;
