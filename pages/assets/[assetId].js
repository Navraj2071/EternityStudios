import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig";

const AssetPage = ({ assetData }) => {
  const [imageURL, setImageURL] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [traits, setTraits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (assetData["response"] === "Success") {
      setImageURL(assetData["assetImageURL"]);
      getNftIPFSData();
    }
  }, []);
  const getNftIPFSData = async () => {
    let ipfsURL = assetData["assetMetadataURL"];
    let response = await fetch(ipfsURL);
    let nftData = await response.json();
    setAssetName(nftData["name"]);
    setAssetDescription(nftData["description"]);
    setTraits(nftData["traits"]);
    return nftData;
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
    BASE_URL + "nft/getNFT?request_type=withContract&asset_id=" + assetId
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
  const queryAsset = context.params.assetId;
  const assetData = await getAssetData(queryAsset);

  if (assetData === "Server error") {
    return { props: { assetData: { response: assetData } } };
  }

  if (assetData["response"] === "NFT doesn't exist") {
    return { props: { assetData: { response: assetData["response"] } } };
  }

  return {
    props: {
      assetData: {
        response: assetData["response"],
        assetOwner: assetData["owner"],
        assetMetadataURL: assetData["metadataURL"],
        assetCollection: assetData["collection"],
        assetOnSale: assetData["on_sale"],
        assetIsMinted: assetData["is_minted"],
        assetPrice: assetData["price"],
        assetContract: assetData["contract_address"],
        assetTokenId: assetData["token_id"],
        assetNetwork: assetData["network"],
        assetImageURL: assetData["imageURL"],
        assetLocalToken: assetData["local_token_id"],
        assetQuery: queryAsset,
      },
    },
  };
}
