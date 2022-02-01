import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../custom_modules/navbar";
import Footer from "../custom_modules/footer";
import Link from "next/link";
import { useEthers } from "@usedapp/core";

const NftArticle = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const title = "NFTs";
  const textArray = ["Create", "Deploy", "Explore"];
  const [text, setText] = useState(textArray[0]);
  const srcArray = [
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600",
    "https://lh3.googleusercontent.com/NTVJXGApcSVsfYZFHcCZFERcO94zLZqMf05iDyhP7b5FClwvMWMBxkQ28pHy0O_iEUFJqO2BTXM-UqNZVyz9Vlo_v09Wmc3UjRrMvg=w600",
    "https://lh3.googleusercontent.com/RRrDcbDgvg9kXiPWirdL5x72_LJnjX5KaLIkCQBo7kmWHglsaBJuVdsgjPcNvjh0zoklOjD-t-xiFM9VTlyz57atb3rqfFF7vmZZrWE=w600",
    "https://lh3.googleusercontent.com/eIhk029TEWgBb5vhVUJIa1h1iLj11VJSlUCoEDz5zC7drNmGjcxPAU6GbXCxwoLdExqhVOwaMdWLgAHHLmOkdrrs3mDNXxjP5kes4w=w600",
  ];
  const [src, setSrc] = useState(srcArray[0]);

  useEffect(() => {
    const textToBeSet = () => {
      if (textArray.indexOf(text) == textArray.length - 1) {
        return textArray[0];
      } else {
        return textArray[textArray.indexOf(text) + 1];
      }
    };
    const srcToBeSet = () => {
      if (srcArray.indexOf(src) == srcArray.length - 1) {
        return srcArray[0];
      } else {
        return srcArray[srcArray.indexOf(src) + 1];
      }
    };
    setTimeout(() => setText(textToBeSet), 800);
    setTimeout(() => setSrc(srcToBeSet), 10000);
  }, [text]);
  return (
    <section className="section">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h3>Smartest way to enter the world of NFTs</h3>
        <Link href="/nft">
          <button className="btn">Get Started</button>
        </Link>
      </div>

      <div className="illustration">
        <img src={src} alt="NFT" />
      </div>
    </section>
  );
};

const LotteryArticle = () => {
  const title = "Crypto Lottery";
  const text = "Play and Win upto 10 ETH !!";

  return (
    <section className="section">
      <div className="illustration">
        <img src="/favicon.ico" alt="NFT" />
      </div>

      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h3>World's first truly Automated lottery.</h3>
        <Link href="/lottery">
          <button className="btn">Play</button>
        </Link>
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
        <NftArticle />
        <LotteryArticle />
      </div>
      <Footer />
    </>
  );
};

export default Article;
