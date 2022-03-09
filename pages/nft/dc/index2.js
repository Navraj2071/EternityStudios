import React from "react";
import Navbar from "../../../custom_modules/navbar";
import Footer from "../../../custom_modules/footer";
import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";

const DeployArticle = () => {
  const { account, chainId } = useEthers();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionWarning, setConnectionWarning] = useState("");
  const [canCreate, setCanCreate] = useState(true);
  const [imageUpload, setImageUpload] = useState(false);
  const title = "NFT Collection";
  const text = "Metadata will be stored on ipfs";
  const uploadForm = [
    ["Name", "Collection name"],
    ["Description", "Provide a detailed description of your collection."],
    ["Total Supply", "Number of nfts in your collection"],
  ];
  const traitForm = [
    ["Trait type", "Provide a trait for your NFTs", "Max Value", 100],
  ];
  const [traitState, setTraitState] = useState(traitForm);

  useEffect(() => {
    if (account !== undefined) {
      setIsConnected(true);
      setConnectionWarning("");
    } else {
      setCanCreate(false);
      setImageUpload(false);
    }
  });

  const addTrait = () => {
    setTraitState((traitState) => [
      ...traitState,
      ["Trait type", "Provide a trait for your NFTs", "Max Value", 100],
    ]);
  };

  const removeTrait = () => {
    let temp = traitState.filter(
      (trait, index) => index < traitState.length - 1
    );
    setTraitState(temp);
  };

  const UploadSection = () => {
    if (canCreate && !imageUpload) {
      return (
        <>
          <h2>Create New Collection.</h2>
          {uploadForm.map((item) => {
            return (
              <>
                <div className="myform">
                  <label htmlFor={item[0]}>{item[0]}</label>
                  <input
                    id={item[0]}
                    name={item[0]}
                    type="text"
                    placeholder={item[1]}
                  />
                </div>
              </>
            );
          })}
          {traitState.map((item) => {
            return (
              <>
                <div
                  className="myform"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <div className="traitform">
                    <label htmlFor={item[0]}>{item[0]}</label>
                    <input
                      id={item[0]}
                      name={item[0]}
                      type="text"
                      placeholder={item[1]}
                    />
                  </div>
                  <div className="traitform">
                    <label htmlFor={item[2]}>{item[2]}</label>
                    <input
                      id={item[2]}
                      name={item[2]}
                      type="number"
                      placeholder={item[3]}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <div className="listChanger">
            <button disabled={traitState.length === 1} onClick={removeTrait}>
              -
            </button>
            <button onClick={addTrait}>+</button>
          </div>

          <button className="btn" onClick={setImageUpload(true)}>
            Next
          </button>
        </>
      );
    } else if (canCreate && imageUpload) {
      return <>Balle Balle</>;
    }
  };
  const createButton = () => {
    if (isConnected) {
      setConnectionWarning("");
      setCanCreate(true);
    } else {
      setCanCreate(false);
      setConnectionWarning("Hey Buddy! Please connect your wallet.");
    }
  };
  return (
    <section className="section-vertical">
      <div className="writing">
        <h1>{title}</h1>
        <h2>{text}</h2>
        <h4 style={{ color: "blue" }}>{connectionWarning}</h4>
        {canCreate ? (
          <UploadSection />
        ) : (
          <button className="btn" onClick={createButton}>
            Create Collection
          </button>
        )}
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
      </div>
      <Footer />
    </>
  );
};

export default Article;
