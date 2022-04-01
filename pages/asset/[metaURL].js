import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig";

const AssetPage = ({ queryData }) => {
  const [assetData, setAssetData] = useState({
    response: "...",
    assetOwner: "...",
    assetMetadataURL: "...",
    assetCollection: "...",
    assetOnSale: true,
    assetIsMinted: false,
    assetPrice: 0,
    assetContract: "...",
    assetTokenId: 1,
    assetNetwork: 1,
    assetLocalToken: 1,
    assetImageURL: "...",
    assetQuery: queryData,
  });

  const poppulateData = async () => {
    let metaURL1 = queryData.replaceAll("questionmarketernity", "?");
    let metaURL2 = metaURL1.replaceAll("slasheternity", "/");
    const queryAsset = "https://" + metaURL2.replaceAll("doteternity", ".");
    let serverData = await getAssetData(queryAsset);
    if (serverData === "Server error") {
      let assetData = { response: serverData };
      setAssetData({ ...assetData });
    } else {
      if (serverData["response"] === "NFT doesn't exist") {
        let assetData = { response: serverData["response"] };
        setAssetData({ ...assetData });
      } else {
        let assetData = {
          response: serverData["response"],
          assetOwner: serverData["owner"],
          assetMetadataURL: serverData["metadataURL"],
          assetCollection: serverData["collection"],
          assetOnSale: serverData["on_sale"],
          assetIsMinted: serverData["is_minted"],
          assetPrice: serverData["price"],
          assetContract: serverData["contract_address"],
          assetTokenId: serverData["token_id"],
          assetNetwork: serverData["network"],
          assetLocalToken: serverData["local_token_id"],
          assetImageURL: serverData["imageURL"],
          assetQuery: queryAsset,
        };
        setAssetData({ ...assetData });
        setImageURL(serverData["imageURL"]);
        getNftIPFSData(serverData["metadataURL"]);
      }
    }
  };

  const [imageURL, setImageURL] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [traits, setTraits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    poppulateData();
  }, []);
  const getNftIPFSData = async (metadataURL) => {
    let response = await fetch(metadataURL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return "Server error";
      });
    if (response !== "Server error") {
      setAssetName(response["name"]);
      setAssetDescription(response["description"]);
      setTraits(response["traits"]);
    }
  };

  const getRandomKey = (starterString) => {
    let randomKey =
      Math.floor(Math.random() * 1000, 3).toString() + starterString;
    return randomKey;
  };

  if (assetData["response"] === "Server error") {
    return (
      <>
        <h2>Server Error...</h2>
      </>
    );
  }
  if (assetData["response"] === "NFT doesn't exist") {
    return (
      <>
        <h2>Requested asset not found.</h2>
      </>
    );
  }

  const NFTCard = () => {
    return (
      <>
        <div className="nft-mint" style={{ minHeight: "80vh" }}>
          <img src={imageURL} alt="NFT" />
          <div className="nft-mint-2">
            <div className="nft-description">
              <h1>{assetName}</h1>
              <h2>{assetDescription}</h2>
              <h3>Attributes:</h3>
              {traits.map((trait) => {
                return (
                  <React.Fragment key={getRandomKey(trait["trait_ype"])}>
                    <h3>
                      {trait["trait_type"]}: {trait["value"]}
                    </h3>
                  </React.Fragment>
                );
              })}
              <h2>{!assetData["assetOnSale"] ? "Sold out" : "Available"}</h2>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Price: {assetData["assetPrice"]}</h3>
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
                  alt=""
                  style={{ width: "1em", border: "none", margin: "0" }}
                />
              </div>
              <h3
                onClick={() => {
                  router.push("/profile/" + assetData["assetOwner"]);
                }}
              >
                Owner: {assetData["assetOwner"]}{" "}
                <button
                  className="btn2"
                  onClick={() => {
                    router.push("/profile/" + assetData["assetOwner"]);
                  }}
                >
                  View Profile
                </button>
              </h3>
              <div>
                <button
                  className="btn"
                  onClick={() => {
                    router.push("/collection/" + assetData["assetCollection"]);
                  }}
                >
                  View Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <NFTCard />
      <Footer />
    </>
  );
};

export default AssetPage;

const getAssetData = async (assetId) => {
  let response = await fetch(
    BASE_URL + "nft/getNFT?request_type=withMetadata&metadataURL=" + assetId
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
  return response;
};

export async function getServerSideProps(context) {
  const queryData = context.params.metaURL;
  return { props: { queryData: queryData } };
  // let metaURL1 = queryData.replaceAll("questionmarketernity", "?");
  // let metaURL2 = metaURL1.replaceAll("slasheternity", "/");
  // const queryAsset = "https://" + metaURL2.replaceAll("doteternity", ".");
  // const assetData = await getAssetData(queryAsset);

  // if (assetData === "Server error") {
  //   return { props: { assetData: { response: assetData } } };
  // }

  // if (assetData["response"] === "NFT doesn't exist") {
  //   return {
  //     props: {
  //       assetData: { response: assetData["response"] },
  //     },
  //   };
  // }

  // return {
  //   props: {
  //     assetData: {
  //       response: assetData["response"],
  //       assetOwner: assetData["owner"],
  //       assetMetadataURL: assetData["metadataURL"],
  //       assetCollection: assetData["collection"],
  //       assetOnSale: assetData["on_sale"],
  //       assetIsMinted: assetData["is_minted"],
  //       assetPrice: assetData["price"],
  //       assetContract: assetData["contract_address"],
  //       assetTokenId: assetData["token_id"],
  //       assetNetwork: assetData["network"],
  //       assetLocalToken: assetData["local_token_id"],
  //       assetImageURL: assetData["imageURL"],
  //       assetQuery: queryAsset,
  //     },
  //   },
  // };
}
