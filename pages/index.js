import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../custom_modules/navbar";
import Footer from "../custom_modules/footer";
import Link from "next/link";
import { useEthers } from "@usedapp/core";
import { Router, useRouter } from "next/dist/client/router";
import BASE_URL from "../apiConfig";

const NftArticle = () => {
  const title = "NFTs";
  const textArray = ["Create", "Deploy", "Explore"];
  const [text, setText] = useState(textArray[0]);
  const srcArray = useRef({ image: "/NFT.png", metadata: ["/"] });
  const [src, setSrc] = useState({ ...srcArray.current[0] });
  const textIndex = useRef(0);
  const srcIndex = useRef(0);
  const router = useRouter();

  useEffect(() => {
    let textAnim = setInterval(() => {
      textIndex.current = textIndex.current === 2 ? 0 : textIndex.current + 1;
      setText(textArray[textIndex.current]);
    }, 800);

    let ImgAnim = setInterval(() => {
      srcIndex.current =
        srcIndex.current === srcArray.current.length - 1
          ? 0
          : srcIndex.current + 1;
      setSrc({
        image: srcArray.current[srcIndex.current]["image"],
        metadata: srcArray.current[srcIndex.current]["metadata"][0],
      });
    }, 2000);
    poppulateRandomImages();
    return () => {
      clearInterval(textAnim);
      clearInterval(ImgAnim);
    };
  }, []);

  const poppulateRandomImages = async () => {
    let randomImageArray = await getRandomImages(5);
    try {
      srcArray.current = [...randomImageArray];
    } catch {
      srcArray.current = srcArray.current;
    }
  };

  const goToAssetMeta = (metaURLBase) => {
    console.log(metaURLBase);
    let metaURL = metaURLBase.split("https://")[1];
    let metaURL1 = metaURL.replaceAll("/", "slasheternity");
    let metaURL2 = metaURL1.replaceAll("?", "questionmarketernity");
    let metaURL3 = metaURL2.replaceAll(".", "doteternity");
    router.push("/assets/meta/" + metaURL3);
  };
  return (
    <section className="section">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h3>Smartest way to enter the world of NFTs</h3>
        <Link href="/nft" passHref>
          <button className="btn">Get Started</button>
        </Link>
      </div>

      <div className="illustration">
        <img
          src={src["image"]}
          alt="NFT"
          onClick={() => {
            goToAssetMeta(src["metadata"]);
          }}
        />
      </div>
    </section>
  );
};

const LotteryArticle = () => {
  const title = "Crypto Lottery";
  const text = "Play and Win upto 10 ETH !!";

  return (
    <section className="section">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h3>World&apos;s first truly Automated lottery.</h3>
        <Link href="/lottery" passHref>
          <button className="btn">Play</button>
        </Link>
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
          width: "100vw",
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

const getRandomNFTs = async (arrayNumber) => {
  let randomNFTs = await fetch(
    BASE_URL + "nft/getRandomNFT?number=" + arrayNumber
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return "Server error";
    });
  return randomNFTs;
};

const getRandomImages = async (arrayNumber) => {
  let imageArray = [];
  let randomNFTs = await getRandomNFTs(arrayNumber);
  if (randomNFTs !== "Server error") {
    if (randomNFTs["response"] === "Success") {
      for (let i = 0; i < arrayNumber; i++) {
        let randomImage = await fetch(randomNFTs["nft" + i]["metadataURL"])
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return data;
          })
          .catch((error) => {
            return "Server error";
          });
        if (randomImage !== "Server error") {
          imageArray.push({
            image: randomImage["image"],
            metadata: [randomNFTs["nft" + i]["metadataURL"]],
          });
        }
      }
      if (imageArray.length > 0) {
        return imageArray;
      }
    }
  }
};
