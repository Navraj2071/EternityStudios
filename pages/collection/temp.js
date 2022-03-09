import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const getCollectionData = async (queryurl) => {
  if (typeof queryurl == "string") {
    const collectionData = await fetch(
      "http://localhost:8000/nft/getCollection?collectionid=" + queryurl
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

const CollectionPage = (collectionData) => {
  const router = useRouter();
  const queryurl = router.query.collectionAddress;
  const [queryAccount, setQueryAccount] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSupply, setCollectionSupply] = useState(1);
  const [collectionPrice, setCollectionPrice] = useState("");
  const [collectionLaunchDate, setCollectionLaunchDate] = useState("");
  const [collectionLaunchTime, setCollectionLaunchTime] = useState("");
  const [collectionOwner, setCollectionOwner] = useState("");
  const [collectionMetadata, setCollectionMetadata] = useState([]);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  useEffect(async () => {
    await setCollectionData();
  }, []);

  const setCollectionData = async () => {
    collectionData = await getCollectionData(queryurl);
    if (
      collectionData !== "Server error" &&
      collectionData["response"] !== "Collection doesn't exist"
    ) {
      setCollectionName(collectionData["name"]);
      setCollectionDescription(collectionData["description"]);
      setCollectionSupply(collectionData["total_supply"]);
      setCollectionPrice(collectionData["price"]);
      setCollectionLaunchDate(collectionData["launch_date"]);
      setCollectionLaunchTime(collectionData["launch_time"]);
      setCollectionOwner(collectionData["owner"]);
      let tempCollectionData = [];
      for (let i = 0; i < collectionSupply; i++) {
        tempCollectionData.push(
          JSON.parse(collectionData["nft_data"])["nft" + String(i)]
        );
      }
      setCollectionMetadata(tempCollectionData);
      setTimeout(() => {
        console.log("Setting Images-------");
        setImages();
      }, 5000);
      // setImages();
    }
  };

  const setImages = async () => {
    let src1 = await getRandomImage();
    let src2 = await getRandomImage();
    let src3 = await getRandomImage();
    let src4 = await getRandomImage();
    setImg1(src1);
    setImg2(src2);
    setImg3(src3);
    setImg4(src4);
  };

  const getRandomImage = async () => {
    let randIndex = (collectionSupply % Math.floor(Math.random() * 1000)) - 1;
    let randURL = String(collectionMetadata[randIndex]);
    const imgSrc = await fetch(randURL);
    const data = await imgSrc.json();
    const imageURL = data["image"];
    return imageURL;
  };

  const Trailor = () => {
    return (
      <>
        <div className="nft">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          background: "grey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{collectionName}</h1>
        <h2>{collectionDescription}</h2>
        <Trailor />
      </div>
      <h1>{queryurl}</h1>

      <h1>{collectionSupply}</h1>
      <h1>{collectionPrice}</h1>
      <h1>{collectionLaunchDate}</h1>
      <h1>{collectionLaunchTime}</h1>
      <h1>{collectionOwner}</h1>
      <h1>{collectionMetadata}</h1>
      <Footer />
    </>
  );
};

export default CollectionPage;

export async function getServerSideProps(context) {
  const ptr = context.params.id;
  console.log(ptr);
  return {
    props: {
      collectionData: { response: "Collection doesn't exist" },
    },
  };
}
