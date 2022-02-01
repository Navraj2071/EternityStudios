import React from "react";
import Navbar from "../../../custom_modules/navbar";
import Footer from "../../../custom_modules/footer";
import { useState } from "react";
import { useEffect } from "react";
import { Slideshow } from "../../../custom_modules/slideshow";

const DeployArticle = () => {
  const title = "Deploy Single NFT";

  const text =
    "Your file will be uploaded to an IPFS server and it's metadata will be stored on chain.";

  const src =
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600";

  return (
    <section className="section">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h3>Upload your file here.</h3>
        <button className="btn">Upload</button>
        <h3 style={{ color: "green" }}>Upload successful.</h3>
        <h3>Fill in the metadata and deploy your file as an NFT.</h3>
        <button className="btn">Deploy NFT</button>
      </div>

      <div className="illustration">
        <img src={src} alt="NFT" />
        <h3>Metadata</h3>
        <h3>Metadata</h3>
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
  const title = "Your NFTs";
  const text = "Wow these look gorgeous. ";
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
      </div>
      <Footer />
    </>
  );
};

export default Article;
