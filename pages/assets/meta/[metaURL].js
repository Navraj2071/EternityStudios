import { useEffect } from "react";
import AssetPage from "../[assetId]";

const AssetPagewithMeta = ({ assetData }) => {
  return <>{AssetPage({ assetData })};</>;
};

export default AssetPagewithMeta;

const getAssetData = async (assetId) => {
  let response = await fetch(
    "http://localhost:8000/nft/getNFT?request_type=withMetadata&metadataURL=https://ipfs.io/ipfs/" +
      assetId
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
  const queryAsset = queryData.split("_")[0] + "?" + queryData.split("_")[1];

  //   return {
  //     props: {
  //       assetData: { assetQuery: queryAsset },
  //     },
  //   };
  const assetData = await getAssetData(queryAsset);

  if (assetData === "Server error") {
    return { props: { assetData: { response: assetData } } };
  }

  if (assetData["response"] === "NFT doesn't exist") {
    return {
      props: {
        assetData: { response: assetData["response"] },
      },
    };
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
        assetQuery: queryAsset,
      },
    },
  };
}