import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import React from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ChainId, useEthers } from "@usedapp/core";
import Web3 from "web3";
import BASE_URL from "../../apiConfig";
var Contract = require("web3-eth-contract");
const chainIdNumber = { 1: "Mainnet", 4: "Rinkeby" };

const getCollectionData = async (queryurl) => {
  if (typeof queryurl == "string") {
    const collectionData = await fetch(
      BASE_URL + "nft/getCollection?collectionid=" + queryurl
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
    return collectionData;
  }
};

const CollectionPage = ({ collectionData }) => {
  const router = useRouter();
  const { account, chainId, activateBrowserWallet, deactivate } = useEthers();

  if (collectionData["response"] === "Server error") {
    return (
      <>
        <Navbar />
        <h2 style={{minHeight: '80vh'}}>Something went wrong with the server. Please try again.</h2>
        <Footer />
      </>
    );
  }

  if (collectionData["response"] === "Collection doesn't exist") {
    return (
      <>
        <Navbar />
        <h2 style={{minHeight: '80vh'}}>The requested collection doesn't exist.</h2>
        <button className="btn" onClick={() => router.push("/nft/dc")}>
          Create Collection
        </button>
        <Footer />
      </>
    );
  }

  const [img4, setImg4] = useState("");
  const [remainingTime, setremainingTime] = useState("");
  const [mint, setMint] = useState(false);
  const [anyNFTavailable, setanyNFTavailable] = useState(false);
  const [metadataArray, setMetadataArray] = useState([]);
  const [connectionWarning, setConnectionWarning] = useState("");
  const [collectionContract, setCollectionContract] = useState(
    collectionData["collectionContract"]
  );
  const [loadingStatus, setLoadingStatus] = useState(
    "First minter gets the rarest token."
  );
  const [paymentStatus, setPaymentStatus] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const [mintStatus, setMintStatus] = useState("");
  const [mintButtonDisabled, setMintButtonDisabled] = useState(false);
  Contract.setProvider(Web3.givenProvider);

  const getRandomImage = async () => {
    let randIndex =
      Math.floor(Math.random() * 1000) % collectionData["collectionSupply"];
    let randURL = String(
      JSON.parse(collectionData["collectionMetadata"])[
        "nft" + String(randIndex)
      ]
    );
    const imgSrc = await fetch(randURL);
    const data = await imgSrc.json();
    const imageURL = data["image"];
    return imageURL;
  };

  const setImages = async () => {
    let img4 = await getRandomImage();

    setImg4(img4);
  };

  const getNFTdata = async (metadataURL) => {
    let jsonData = await fetch(metadataURL);
    let jsonDataparsed = await jsonData.json();
    return jsonDataparsed;
  };

  const poppulatemetadata = async () => {
    console.log("Poppulating...");
    metadataArray = [];
    for (let i = 0; i < collectionData["collectionSupply"]; i++) {
      let metadataURL = JSON.parse(collectionData["collectionMetadata"])[
        "nft" + i
      ];
      let metadata = await getNFTdata(metadataURL);
      let extraPropsURL =
        BASE_URL + "nft/getNFT?request_type=withMetadata&metadataURL=" +
        metadataURL;
      let extraProps = await getNFTdata(extraPropsURL);
      metadata["on_sale"] = extraProps["on_sale"];
      metadata["is_minted"] = extraProps["is_minted"];
      metadata["price"] = extraProps["price"];
      metadata["owner"] = extraProps["owner"];
      metadata["metadataURL"] = metadataURL;
      metadataArray.push(metadata);
    }
    console.log(metadataArray);
    let numberOfavailableNFTS = 0;
    metadataArray.map((item) => {
      if (item["on_sale"] === true) {
        numberOfavailableNFTS++;
        console.log(numberOfavailableNFTS);
      }
    });
    if (numberOfavailableNFTS > 0) {
      setanyNFTavailable(true);
    }
    setMetadataArray([...metadataArray]);
  };

  const getRandomKey = (starterString) => {
    let randomKey =
      Math.floor(Math.random() * 10000, 4).toString() +
      starterString.toString();
    return randomKey;
  };

  const NFTdata = () => {
    return (
      <React.Fragment>
        <div style={{ minHeight: "60vh", padding: "50px" }}>
          <div className="cardholder">
            {metadataArray.map((nft) => {
              return (
                <React.Fragment key={getRandomKey(nft["name"])}>
                  <div
                    className="card"
                    key={nft["name"] + nft["owner"]}
                    onClick={() => {
                      let metaURL = JSON.parse(
                        collectionData["collectionMetadata"]
                      )["nft" + metadataArray.indexOf(nft)].split(
                        "https://"
                      )[1];
                      let metaURL1 = metaURL.replaceAll("/", "slasheternity");
                      let metaURL2 = metaURL1.replaceAll(
                        "?",
                        "questionmarketernity"
                      );
                      let metaURL3 = metaURL2.replaceAll(".", "doteternity");
                      router.push("/assets/meta/" + metaURL3);
                    }}
                  >
                    <img src={nft["image"]} alt="" />
                    <div>
                      <h5>{nft["name"]}</h5>
                      <h6>{nft["description"]}</h6>
                      {nft["traits"].map((trait) => {
                        return (
                          <div
                            key={
                              nft["name"] + trait["trait_type"] + Math.random()
                            }
                          >
                            <h6>
                              {trait["trait_type"]} : {trait["value"]}
                            </h6>
                          </div>
                        );
                      })}
                      <h5>{!nft["is_minted"] && mint ? "Available" : ""}</h5>
                      <h5>{nft["is_minted"] && mint ? "Sold out" : ""}</h5>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  };

  useEffect(async () => {
    if (account !== undefined) {
      setConnectionWarning("");
    }    
      setImages();
      poppulatemetadata();
    
    let timerInterval = setInterval(() => {
      setremainingTime(() => {
        let today = new Date(new Date().toUTCString().slice(0, -3));
        let launchDate = new Date(
          collectionData["collectionLaunchDate"] +
            " " +
            collectionData["collectionLaunchTime"]
        );
        if (launchDate < today) {
          setMint(true);
          clearInterval(timerInterval);
          return 0;
        }
        let timeLeft = launchDate - today;
        let TimeLeftInDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let TimeLeftInHours = Math.floor(
          (timeLeft - TimeLeftInDays * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let TimeLeftInMinutes = Math.floor(
          (timeLeft -
            TimeLeftInDays * (1000 * 60 * 60 * 24) -
            TimeLeftInHours * (1000 * 60 * 60)) /
            (1000 * 60)
        );

        let TimeLeftInSeconds = Math.floor(
          (timeLeft -
            TimeLeftInDays * (1000 * 60 * 60 * 24) -
            TimeLeftInHours * (1000 * 60 * 60) -
            TimeLeftInMinutes * (1000 * 60)) /
            1000
        );
        if (TimeLeftInDays > 0) {
          return TimeLeftInDays + "days left...";
        } else {
          return (
            TimeLeftInHours +
            ":" +
            (TimeLeftInMinutes < 10
              ? "0" + TimeLeftInMinutes
              : TimeLeftInMinutes) +
            ":" +
            (TimeLeftInSeconds < 10
              ? "0" + TimeLeftInSeconds
              : TimeLeftInSeconds) +
            ""
          );
        }
      });
    }, 1000);
  }, [account, chainId]);

  const getGas = async (tokenURI) => {
    setLoadingStatus("Estimating Gas...");
    let formData = new FormData();
    formData.append("chain_id", chainId);
    formData.append("contract_type", collectionData["collectionContractType"]);
    formData.append("token_uri", tokenURI);
    let response = await fetch(BASE_URL + "nft/getGas", {
      method: "POST",
      body: formData,
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return "Server error";
      });
    console.log(response);
    if (response === "Server error") {
      return response;
    }
    let deploymentGas = parseInt(response["deploy_gas"]);
    let collectibleGas = parseInt(response["collectible_gas"]);
    let maxPriorityFee = parseInt(response["max_priority_fee"]);
    let baseFee = parseInt(response["base_fee"]);
    if (collectionData["collectionContract"] === "0x") {
      let totalGas =
        (((deploymentGas + collectibleGas) / 10 ** 9) *
          (maxPriorityFee + baseFee) *
          1.25) /
        10 ** 9;
      let maxFeePerGas = (baseFee + maxPriorityFee) * 1.25;
      return {
        deployment_gas: deploymentGas,
        collectible_gas: collectibleGas,
        base_fee: baseFee,
        max_priority_fee: maxPriorityFee * 1.25,
        total_gas: totalGas,
        max_fee_per_gas: maxFeePerGas,
      };
    } else {
      let totalGas =
        ((collectibleGas / 10 ** 9) * (maxPriorityFee + baseFee) * 1.25) /
        10 ** 9;
      let maxFeePerGas = (baseFee + maxPriorityFee) * 1.25;
      return {
        deployment_gas: 0,
        collectible_gas: collectibleGas,
        base_fee: baseFee,
        max_priority_fee: maxPriorityFee * 1.25,
        total_gas: totalGas,
        max_fee_per_gas: maxFeePerGas,
      };
    }
  };

  const getTokenToMint = () => {
    let remainingNFTArray = [];
    metadataArray.map((item) => {
      if (!item["is_minted"]) {
        remainingNFTArray.push(item["metadataURL"]);
      }
    });
    if (collectionData["collectionContract"] === "0x") {
      return remainingNFTArray[getRarest()];
    }
    return remainingNFTArray[
      Math.floor(Math.random() * 10000, 4) % remainingNFTArray.length
    ];
  };

  const mintToken = async (
    token_uri,
    max_priority_fee,
    max_fee,
    deployment_gas
  ) => {
    setLoadingStatus("Minting Token...");
    let formData = new FormData();
    formData.append("collection_id", collectionData["collectionId"]);
    formData.append("minter", account);
    formData.append("token_uri", token_uri);
    formData.append("max_priority_fee", max_priority_fee);
    formData.append("max_fee", max_fee);
    formData.append("deployment_gas", deployment_gas);
    let response = await fetch(BASE_URL + "nft/mintToken", {
      method: "POST",
      body: formData,
    })
      .then((resp) => {
        setLoadingStatus("Done. Redirecting...");
        return resp.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        setLoadingStatus("Couldn't mint token..");
        setMintStatus(error["message"]);
        setMintButtonDisabled(false);
        return "Server error";
      });

    if (response !== "Server error") {
      let respObject = response;
      let contract = respObject["contract"];
      let tokenId = respObject["token_id"];
      router.push("/assets/" + contract + "_" + tokenId);
    }

    console.log(response);
  };

  const sendFloorPrice = async () => {
    setLoadingStatus("Initializing payment...");
    let tokenURItoMint = getTokenToMint();
    const web3 = new Web3(Web3.givenProvider);
    let gas = await getGas(tokenURItoMint);
    console.log(gas);
    if (gas === "Server error") {
      setLoadingStatus("something went wrong. Can't calculate gas.");
      setMintButtonDisabled(false);
      return 5;
    }
    setLoadingStatus("Initializing payment...");
    let total_gas = gas["total_gas"];
    let max_priority_fee = gas["max_priority_fee"];
    let deployment_gas = gas["deployment_gas"];
    let max_fee_per_gas = gas["max_fee_per_gas"];
    let toWei = 10 ** 18;
    let value = Math.round(
      (parseFloat(collectionData["collectionPrice"]) + total_gas) * toWei
    );
    web3.eth
      .sendTransaction({
        from: account,
        to: "0xAf47726af31C42ef57c771ea078D41cF0B0024A2",
        value: value,
      })
      .on("confirmation", () => {
        setPaymentStatus("Payment confirmed.");
      })
      .on("transactionHash", (hash) => {
        setPaymentStatus("Transactiion: " + hash);
      })
      .on("error", (err) => {
        setLoadingStatus("Payment failed!");
        setPaymentStatus("Error: " + err["message"]);
        setMintButtonDisabled(false);
      })
      .then(() => {
        mintToken(
          tokenURItoMint,
          Math.round(max_priority_fee),
          Math.round(max_fee_per_gas),
          Math.round(deployment_gas)
        );
      });
  };

  const getRarest = () => {
    let statArray = [];
    metadataArray.map((item) => {
      let totalStat = 0;
      item["traits"].map((trait) => {
        totalStat = totalStat + parseFloat(trait["value"]);
      });
      statArray.push(totalStat);
    });
    return statArray.indexOf(Math.max(...statArray));
  };

  const mintButton = () => {
    if (account === undefined) {
      setConnectionWarning("Hey buddy! Please connect your wallet.");
    } else {
      if (chainId === collectionData["collectionNetwork"]) {
        setMintButtonDisabled(true);
        sendFloorPrice();
      } else {
        setLoadingStatus(
          "The collection exists on " +
            chainIdNumber[collectionData["collectionNetwork"]] +
            ". You might be on a different network."
        );
      }
    }
  };

  return (
    <>
      <Navbar />      
      <div className="nft">
        <h1>{collectionData["collectionName"]}</h1>
        <h2>{collectionData["collectionDescription"]}</h2>
        <h3>Created By:</h3>
        <button
          className="btn2"
          onClick={() => {
            router.push("/profile/" + collectionData["collectionOwner"]);
          }}
        >
          {collectionData["collectionOwner"]}
        </button>
      </div>

      {mint ? "" : <div className="timer">{remainingTime}</div>}
      {!anyNFTavailable ? (
        ""
      ) : (
        <>
          <div className="nft-mint">
            <div className="nft-mint-2">
              <img src={img4} alt="" />
            </div>
            <div>
              {mint ? (
                <div className="nft-mint-2">
                  <div style={{ display: "flex" }}>
                    <h2>Price: {collectionData["collectionPrice"]}</h2>
                    <img
                      src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
                      alt="Eth"
                      style={{ width: "1.75em", border: "none" }}
                    />
                  </div>
                  <button
                    className="btn"
                    onClick={mintButton}
                    id="mint-button"
                    disabled={mintButtonDisabled}
                  >
                    _Mint NFT
                  </button>
                  <h4>{loadingStatus}</h4>
                  <h4 style={{ color: "blue" }}>{connectionWarning}</h4>
                  <div>
                    <h5>{paymentStatus}</h5>
                    <h5>{contractStatus}</h5>
                    <h5>{mintStatus}</h5>
                  </div>
                </div>
              ) : (
                ""
              )}
              {mint ? (
                ""
              ) : (
                <div className="nft-mint-2">
                  <button className="btn">Add to wishlist</button>
                  <h4>You can view your wishlist in your profile.</h4>
                  <h4 style={{ color: "blue" }}>{connectionWarning}</h4>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <NFTdata />
      <Footer />
    </>
  );
};

export default CollectionPage;

export async function getServerSideProps(context) {
  const queryurl = context.params.collectionAddress;
  const collectionData = await getCollectionData(queryurl);
  if (collectionData === "Server error") {
    return {
      props: {
        collectionData: {
          response: "Server error",
        },
      },
    };
  }
  if (collectionData["response"] === "Collection doesn't exist") {
    return {
      props: {
        collectionData: {
          response: collectionData["response"],
        },
      },
    };
  }

  if (collectionData !== "Server error") {
    return {
      props: {
        collectionData: {
          response: collectionData["response"],
          collectionId: collectionData["id"],
          collectionName: collectionData["name"],
          collectionDescription: collectionData["description"],
          collectionSupply: collectionData["total_supply"],
          collectionPrice: collectionData["price"],
          collectionLaunchDate: collectionData["launch_date"],
          collectionLaunchTime: collectionData["launch_time"],
          collectionOwner: collectionData["owner"],
          collectionMetadata: collectionData["nft_data"],
          collectionContract: collectionData["contract"],
          collectionNetwork: collectionData["network"],
          collectionContractType: collectionData["contract_type"],
          collectionURL: queryurl,
        },
      },
    };
  } else {
    return {
      props: {
        collectionData: {
          response: "Server Error",
        },
      },
    };
  }
}
