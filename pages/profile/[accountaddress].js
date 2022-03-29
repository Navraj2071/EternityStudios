import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import FormData from "form-data";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import BASE_URL from "../../apiConfig";

const apiURL = BASE_URL + "assets/addprofile";
const getProfileData = async (
  profileAccount,
  profileName,
  profileDescription,
  profilePic
) => {
  let formData = new FormData();
  formData.append("account", profileAccount);
  formData.append("name", profileName);
  formData.append("description", profileDescription);
  formData.append("profilepic", profilePic);
  const response = await fetch(apiURL, {
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
  return response;
};

const ProfilePage = ({ profileData }) => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const router = useRouter();
  const queryaccount = profileData["account"];
  const [profileName, setProfileName] = useState(profileData["name"]);
  const [profileDescription, setProfileDescription] = useState(
    profileData["description"]
  );
  const [profilepic, setProfilepic] = useState(profileData["profilepic"]);
  const [profileSingleNFTs, setProfileSingleNFTs] = useState([]);
  const [profileCollections, setProfileCollections] = useState([]);
  const [isOwner, setIsowner] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [saveProfileWarning, setSaveProfileWarning] = useState("");
  const [profilePicDataLocal, setProfilePicDataLocal] = useState("");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);

  useEffect(() => {
    if (profileData !== "Server error") {
      if (account !== undefined) {
        setIsowner(true);
      } else setIsowner(false);
      if (profileSingleNFTs.length === 0) {
        getProfileSingles();
      }
      if (profileCollections.length === 0) {
        getProfileCollections();
      }
      if (
        saveProfileWarning === "Uploading profile picture..." &&
        profilePicDataLocal !== ""
      ) {
        setSaveProfileWarning("");
        setSaveButtonEnabled(true);
      }
    }
  }, [account, profilePicDataLocal]);

  const setProfileData = async (name, description, profilepic) => {
    let profileData = await getProfileData(
      queryaccount,
      name,
      description,
      profilepic
    );
    if (profileData !== "Server error") {
      setProfileName(profileData["name"]);
      setProfileDescription(profileData["description"]);
      setProfilepic(profileData["profilepic"]);
    }
  };

  const saveProfilePic = async (imagefile) => {
    let formdata = new FormData();
    formdata.append("nft_file", imagefile);
    formdata.append("account", account);
    formdata.append("name", profileData["name"]);
    formdata.append("description", profileData["description"]);
    formdata.append("trait_type", "Coolness Factor");
    formdata.append("value", 100);
    let profilepicURL = await fetch(BASE_URL + "nft/fileupload", {
      method: "POST",
      body: formdata,
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
    return profilepicURL;
  };

  const saveProfileData = async () => {
    let name = document.getElementById("Nameform").value;
    let description = document.getElementById("Descriptionform").value;
    let profilepicURL = "";
    if (profilePicDataLocal !== "") {
      let profilePicSaveResponse = await saveProfilePic(profilePicDataLocal);
      if (profilePicSaveResponse !== "Server error") {
        profilepicURL = profilePicSaveResponse["image_uri"];
      } else {
        setSaveProfileWarning(
          "Something went wrong. Couldn't save profile pic."
        );
      }
    }
    setProfileData(name, description, profilepicURL);
  };

  const getProfileSingles = async () => {
    let profileSingles = await fetch(
      BASE_URL + "nft/profileSingles?account=" + queryaccount
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
    if (profileSingles !== "Server error") {
      if (profileSingles["response"] === "Success") {
        let profileSingleNFTs = [];
        for (let i = 0; i < parseInt(profileSingles["number"]); i++) {
          let NFTdata = await getNFTData(
            profileSingles["nft" + i]["metadataURL"]
          );
          if (NFTdata !== "Server error") {
            profileSingles["nft" + i]["name"] = NFTdata["name"];
            profileSingles["nft" + i]["description"] = NFTdata["description"];
            profileSingles["nft" + i]["image"] = NFTdata["image"];
          } else {
            profileSingles["nft" + i]["name"] = "...";
            profileSingles["nft" + i]["description"] = "...";
            profileSingles["nft" + i]["image"] = "";
          }
          profileSingleNFTs.push(profileSingles["nft" + i]);
          setProfileSingleNFTs([...profileSingleNFTs]);
        }
      }
    }
  };

  const getProfileCollections = async () => {
    let collections = await fetch(
      BASE_URL + "nft/profileCollections?account=" + queryaccount
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
    if (collections !== "Server error") {
      if (collections["response"] === "Success") {
        let profileCollections = [];
        for (let i = 0; i < parseInt(collections["number"]); i++) {
          let firstNFTimageURL = "";
          try {
            firstNFTimageURL = JSON.parse(
              collections["collection" + i]["image_data"]
            )["nft0"];
          } catch {
            firstNFTimageURL = "";
          }
          collections["collection" + i]["image"] = firstNFTimageURL;
          profileCollections.push(collections["collection" + i]);
          setProfileCollections([...profileCollections]);
        }
      }
    }
  };

  const getNFTData = async (metadataURL) => {
    let NFTdata = await fetch(metadataURL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return "Server error";
      });
    return NFTdata;
  };

  const getRandomKey = (starterString) => {
    let randomKey =
      Math.floor(Math.random() * 10000, 4).toString() +
      starterString.toString();
    return randomKey;
  };

  const goToAssetMetadata = (metadataURL) => {
    let metaURL = metadataURL.split("https://")[1];
    let metaURL1 = metaURL.replaceAll("/", "slasheternity");
    let metaURL2 = metaURL1.replaceAll("?", "questionmarketernity");
    let metaURL3 = metaURL2.replaceAll(".", "doteternity");
    router.push("/assets/meta/" + metaURL3);
  };

  if (profileData === "Server error") {
    return (
      <>
        <h1>Server error...</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile">
        <div
          style={{
            width: "20rem",
            maxWidth: "80vw",
            height: "20rem",
            display: "flex",
            padding: "20px",
          }}
        >
          <img
            src={profilepic}
            alt={queryaccount}
            onClick={() => {
              isOwner ? setCanEdit(true) : "";
            }}
            style={{ borderRadius: "20px" }}
          />
        </div>
        <div>
          <h1>{profileName}</h1>
          <h2>{profileDescription}</h2>
        </div>
      </div>
      {isOwner ? (
        <>
          {isOwner && !canEdit ? (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                className="btn2"
                onClick={() => {
                  setSaveProfileWarning("");
                  setCanEdit(true);
                }}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            ""
          )}
          {isOwner && canEdit ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "100px",
                  left: "10vw",
                  backgroundColor: "white",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    width: "80vw",
                    padding: "20px",
                    border: "2px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className="btn2"
                      onClick={() => {
                        setCanEdit(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="myform">
                    <label htmlFor="Name">Name:</label>
                    <input type="text" id="Nameform" placeholder="Enter Name" />
                    <label htmlFor="Description">Description:</label>
                    <input
                      type="text"
                      id="Descriptionform"
                      placeholder="Provide a detailed description"
                    />
                    <label htmlFor="ProfilePic">Profile Picture:</label>
                    <input
                      type="file"
                      id="ProfilePicform"
                      onChange={async (e) => {
                        setSaveButtonEnabled(false);
                        setProfilePicDataLocal("");
                        setSaveProfileWarning("Uploading profile picture...");
                        setProfilePicDataLocal(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h5 style={{ color: "blue" }}>{saveProfileWarning}</h5>
                    {saveButtonEnabled ? (
                      <button
                        className="btn2"
                        onClick={async () => {
                          setSaveProfileWarning("Saving data...");
                          await saveProfileData();
                          setCanEdit(false);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <h2>Single NFTs</h2>
          <div className="cardholder">
            {profileSingleNFTs.map((nft) => {
              return (
                <React.Fragment key={getRandomKey(nft["metadataURL"])}>
                  <div
                    className="card"
                    onClick={() => goToAssetMetadata(nft["metadataURL"])}
                  >
                    <img src={nft["image"]} alt="NFT" />
                    <h4>{nft["name"]}</h4>
                    <h4>{nft["description"]}</h4>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <button
            className="btn"
            onClick={() => {
              router.push("/nft/ds");
            }}
          >
            Create more singles
          </button>
        </div>
        <div>
          <h2>NFT Collections</h2>
          <div className="cardholder">
            {profileCollections.map((collection) => {
              return (
                <React.Fragment key={getRandomKey(collection["id"])}>
                  <div
                    className="card"
                    onClick={() =>
                      router.push("/collection/" + collection["id"])
                    }
                  >
                    <img src={collection["image"]} alt="NFT collection" />
                    <h4>{collection["name"]}</h4>
                    <h4>{collection["description"]}</h4>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <button
            className="btn"
            onClick={() => {
              router.push("/nft/dc");
            }}
          >
            Create Collection
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;

export async function getServerSideProps(context) {
  let queryaccount = context.params.accountaddress;
  let profiledata = await getProfileData(queryaccount, "", "", "");
  if (profiledata === "Server error") {
    return { props: { profileData: profiledata } };
  }
  return {
    props: {
      profileData: {
        response: "Success",
        name: profiledata["name"],
        description: profiledata["description"],
        profilepic: profiledata["profilepic"],
        account: queryaccount,
      },
    },
  };
}
