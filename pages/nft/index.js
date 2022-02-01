import React from "react";
import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { Slideshow } from "../../custom_modules/slideshow";

const DeployArticle = () => {
  const title = "Deploy NFTs";
  const tagLine = "Non Fungible Tokens";
  const text = "Deploy your NFT directly on chain. We don't use lazy-minting.";

  const src =
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600";

  return (
    <section className="section">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h3>You can deploy a single NFT</h3>
        <Link href="/nft/ds">
          <button className="btn">Deploy Single</button>
        </Link>
        <h3>or a collection of NFTs.</h3>
        <Link href="/nft/dc">
          <button className="btn">Deploy Collection</button>
        </Link>
      </div>

      <div className="illustration">
        <img src={src} alt="NFT" />
      </div>
    </section>
  );
};

const ExploreArticle = () => {
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [noOfElements, setNoOfElements] = useState(1);
  const [imgWidth, setImgWidth] = useState(200);
  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.innerWidth);
      setWindowWidth(window.innerWidth);
      setNoOfElements(
        Math.max(Math.round((windowWidth * 0.8 - 20) / 200) - 2, 1)
      );
      setImgWidth((windowWidth * 0.8 - 20) / (noOfElements + 2));
      setWindowWidth(window.innerWidth);

      window.addEventListener("resize", checkSize);
    }
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [windowWidth]);

  const imgArray = [
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600",
    "https://lh3.googleusercontent.com/NTVJXGApcSVsfYZFHcCZFERcO94zLZqMf05iDyhP7b5FClwvMWMBxkQ28pHy0O_iEUFJqO2BTXM-UqNZVyz9Vlo_v09Wmc3UjRrMvg=w600",
    "https://lh3.googleusercontent.com/RRrDcbDgvg9kXiPWirdL5x72_LJnjX5KaLIkCQBo7kmWHglsaBJuVdsgjPcNvjh0zoklOjD-t-xiFM9VTlyz57atb3rqfFF7vmZZrWE=w600",
    "https://lh3.googleusercontent.com/eIhk029TEWgBb5vhVUJIa1h1iLj11VJSlUCoEDz5zC7drNmGjcxPAU6GbXCxwoLdExqhVOwaMdWLgAHHLmOkdrrs3mDNXxjP5kes4w=w600",
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600",
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600",
    "https://lh3.googleusercontent.com/RRrDcbDgvg9kXiPWirdL5x72_LJnjX5KaLIkCQBo7kmWHglsaBJuVdsgjPcNvjh0zoklOjD-t-xiFM9VTlyz57atb3rqfFF7vmZZrWE=w600",
    "https://lh3.googleusercontent.com/eIhk029TEWgBb5vhVUJIa1h1iLj11VJSlUCoEDz5zC7drNmGjcxPAU6GbXCxwoLdExqhVOwaMdWLgAHHLmOkdrrs3mDNXxjP5kes4w=w600",
    "https://lh3.googleusercontent.com/eIhk029TEWgBb5vhVUJIa1h1iLj11VJSlUCoEDz5zC7drNmGjcxPAU6GbXCxwoLdExqhVOwaMdWLgAHHLmOkdrrs3mDNXxjP5kes4w=w600",
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600",
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600",
    "https://lh3.googleusercontent.com/RRrDcbDgvg9kXiPWirdL5x72_LJnjX5KaLIkCQBo7kmWHglsaBJuVdsgjPcNvjh0zoklOjD-t-xiFM9VTlyz57atb3rqfFF7vmZZrWE=w600",
    "https://lh3.googleusercontent.com/eIhk029TEWgBb5vhVUJIa1h1iLj11VJSlUCoEDz5zC7drNmGjcxPAU6GbXCxwoLdExqhVOwaMdWLgAHHLmOkdrrs3mDNXxjP5kes4w=w600",
  ];
  const Slide = Slideshow(imgArray, noOfElements, 5, 10, imgWidth);
  const title = "Explore NFTs";
  const text = "Look at all these NFTs deployed by creative people like you. ";
  const src =
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600";

  return (
    <section className="section-vertical">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
      </div>

      <div className="illustration">{Slide}</div>
      <div className="writing">
        <button className="btn">Explore more</button>
      </div>
    </section>
  );
};

const CreateArticle = () => {
  const title = "Create Your Own";
  const tagLine = "Non Fungible Tokens";
  const text =
    "A tiny little tool box to create your own art piece and deploy as an NFT.";

  const src =
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600";

  return (
    <section className="section">
      <div className="illustration">
        <img src={src} alt="NFT" />
      </div>
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>

        <button className="btn" onClick={(e) => (window.location = "/nft")}>
          Get Started
        </button>
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
        <DeployArticle />
        <ExploreArticle />
        <CreateArticle />
      </div>
      <Footer />
    </>
  );
};

export default Article;
