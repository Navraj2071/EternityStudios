import React from "react";
import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const DeployArticle = () => {
  const title = "Deploy NFTs";
  const text = "Easy Peasy Lemon Squeezy.";

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
  const router = useRouter();

  const title = "Explore NFTs";
  const text = "Look at all these NFTs deployed by creative people like you. ";
  const sampleNFT = {
    image:
      'https://lh3.googleusercontent.com/HnOFidKUA9OcvZj1GUtFxexnpYDX0g9s6alBXCJHxidPt3HS67NYMY5hCIaGbw7BGLzoHk5GAr-zWKR0EZMSgT09vdMoYmHusX0b=w600"',
    metadata: "",
  };
  const [NFTarray, setNFTarray] = useState([sampleNFT]);

  const getRandomNFTs = async () => {
    let NFTarray = [];
    let randomNFT = await fetch(
      "http://localhost:8000/nft/getRandomNFT?number=10"
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
    if (randomNFT !== "Server error") {
      for (let i = 0; i < 10; i++) {
        let randomImage = await fetch(randomNFT["nft" + i]["metadataURL"])
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
          NFTarray.push({
            image: randomImage["image"],
            metadata: randomNFT["nft" + i]["metadataURL"],
          });
        } else {
          NFTarray.push(sampleNFT);
        }
      }
      setNFTarray([...NFTarray]);
    }
  };
  const getRandomKey = (starterString) => {
    let randomKey = Math.floor(Math.random() * 1000, 3) + starterString;
    return randomKey;
  };

  const goToAssetMeta = (metaURLBase) => {
    let metaURL = metaURLBase.split("https://")[1];
    let metaURL1 = metaURL.replaceAll("/", "slasheternity");
    let metaURL2 = metaURL1.replaceAll("?", "questionmarketernity");
    let metaURL3 = metaURL2.replaceAll(".", "doteternity");
    router.push("/assets/meta/" + metaURL3);
  };

  useEffect(() => {
    getRandomNFTs();
  }, []);
  return (
    <section className="section-vertical">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
      </div>
      <div className="cardholder">
        {NFTarray.map((nft) => {
          return (
            <React.Fragment key={getRandomKey(nft["image"])}>
              <div
                className="card"
                onClick={() => {
                  goToAssetMeta(nft["metadata"]);
                }}
              >
                <img src={nft["image"]} alt="" />
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="writing">
        <button
          className="btn"
          onClick={() => {
            router.push("/nft/explore");
          }}
        >
          Explore more
        </button>
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

  const router = useRouter();
  return (
    <section className="section">
      <div className="illustration">
        <img src={src} alt="NFT" />
      </div>
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>

        <button className="btn" onClick={() => router.push("/nft/create")}>
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
          width: "100vw",
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
