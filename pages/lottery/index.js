import React from "react";
import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";

const LotteryArticle = () => {
  const title = "Crypto Lottery";

  const text = "Coming Soon....";

  return (
    <section className="section-vertical">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
      </div>

      <div className="illustration">
        <img src="/Lottery.png" alt="NFT" />
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
