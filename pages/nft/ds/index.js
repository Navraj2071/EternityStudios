import React from "react";
import Navbar from "../../../custom_modules/navbar";
import Footer from "../../../custom_modules/footer";
import { useState } from "react";
import { useEffect } from "react";
import { Slideshow } from "../../../custom_modules/slideshow";
import UploadSection from "../../../custom_modules/uploadCustom";
import BASE_URL from "../../../apiConfig";

const DeployArticle = () => {
  const title = "Deploy Single NFT";

  const text =
    "Your file will be uploaded to an IPFS server and it's metadata will be stored on chain.";

  const src =
    "https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600";

  return (
    <>
      <section className="section" style={{ flexDirection: "column" }}>
        <div className="writing">
          <h1>{title}</h1>
          <h2>{text}</h2>
        </div>
        <UploadSection />
      </section>
    </>
  );
};

const Article = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          margin: "auto",
        }}
      >
        <DeployArticle />
      </div>
      <Footer />
    </>
  );
};

export default Article;
