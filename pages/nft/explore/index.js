import Navbar from "../../../custom_modules/navbar";
import Footer from "../../../custom_modules/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import React from "react";
import BASE_URL from "../../../apiConfig";

const ExplorePage = ({ randomData }) => {
  const [imageArray, setImageArray] = useState({});
  const [imageNameArray, setImageNameArray] = useState({});
  const [imageDescriptionArray, setImageDescriptionArray] = useState({});
  const [contractQuery, setcontractQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    getImageData();
  }, []);

  const getImageData = () => {
    if (randomData === "Server error") {
      return "Server error";
    }
    imageArray = {};
    imageNameArray = {};
    imageDescriptionArray = {};
    RandomIndexArray.map(async (nftIndex) => {
      let response = await fetch(randomData[nftIndex]["metadataURL"])
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return "Server error";
        });
      if (response !== "Server error") {
        imageArray[nftIndex] = response["image"];
        imageNameArray[nftIndex] = response["name"];
        imageDescriptionArray[nftIndex] = response["description"];
        setImageArray({ ...imageArray });
        setImageNameArray({ ...imageNameArray });
        setImageDescriptionArray({ ...imageDescriptionArray });
      }
    });
  };
  const RandomIndexArray = [
    "nft0",
    "nft1",
    "nft2",
    "nft3",
    "nft4",
    "nft5",
    "nft6",
    "nft7",
    "nft8",
    "nft9",
  ];
  const searchContract = async () => {
    let contract_address_searched = document.getElementById("searchBox").value;
    let token_id = 1;
    let response = await fetch(
      BASE_URL + "nft/getNFT?request_type=withContract&asset_id=" +
        contract_address_searched +
        "_" +
        token_id
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
    if (response["response"] === "Success") {
      let metaURL = response["metadataURL"].split("https://")[1];
      let metaURL1 = metaURL.replaceAll("/", "slasheternity");
      let metaURL2 = metaURL1.replaceAll("?", "questionmarketernity");
      let metaURL3 = metaURL2.replaceAll(".", "doteternity");
      router.push("/assets/meta/" + metaURL3);
    } else {
      setcontractQuery(response["response"]);
    }
  };

  const getRandomKey = (starterString) => {
    let randomKey = Math.floor(Math.random() * 1000, 3);
    return randomKey.toString() + starterString;
  };
  const RandomNFT = () => {
    if (randomData === "Server error") {
      return (
        <>
          <h4>...</h4>
        </>
      );
    }

    return (
      <>
        <div className="cardholder">
          {RandomIndexArray.map((index) => {
            return (
              <React.Fragment key={getRandomKey(index)}>
                <div
                  className="card"
                  onClick={() => {
                    let metaURL =
                      randomData[index]["metadataURL"].split("https://")[1];
                    let metaURL1 = metaURL.replaceAll("/", "slasheternity");
                    let metaURL2 = metaURL1.replaceAll(
                      "?",
                      "questionmarketernity"
                    );
                    let metaURL3 = metaURL2.replaceAll(".", "doteternity");
                    router.push("/assets/meta/" + metaURL3);
                  }}
                >
                  <img src={imageArray[index]} alt="NFT" />
                  <h5>{imageNameArray[index]}</h5>
                  <h5>{imageDescriptionArray[index]}</h5>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // width: "50%",
          alignItems: "center",
        }}
      >
        <div
          className="myform"
          style={{ width: "50vw", alignItems: "center", padding: "100px" }}
        >
          <input
            type="text"
            placeholder="Enter contract address"
            id="searchBox"
          />
          <button
            className="btn"
            onClick={() => {
              searchContract();
            }}
          >
            Search
          </button>
          <h3 style={{ color: "blue" }}>{contractQuery}</h3>
        </div>
      </div>
      <RandomNFT />
      <Footer />
    </>
  );
};
export default ExplorePage;

const getRandomData = async () => {
  let randomnft = await fetch(
    BASE_URL + "nft/getRandomNFT?number=10"
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
  return randomnft;
};

export async function getServerSideProps() {
  let randomnft = await getRandomData();
  if (randomnft === "Server error") {
    randomnft = "Server error";
  }
  if (randomnft["response"] !== "Success") {
    randomnft = "Server error";
  }
  return {
    props: {
      randomData: randomnft,
    },
  };
}
