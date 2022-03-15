import React from "react";
import Navbar from "../../../custom_modules/navbar";
import Footer from "../../../custom_modules/footer";
import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { useRouter } from "next/router";

const Article = () => {
  const router = useRouter();
  const { account, chainId } = useEthers();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionWarning, setConnectionWarning] = useState("");
  const [imageUploader, setImageuploader] = useState(true);
  const [formWarning, setFormWarning] = useState("");
  const [formPage, setFormpage] = useState(1);
  const [imgArray, setImgArray] = useState([]);
  const [imageNameArray, setImageNameArray] = useState([]);
  const [imageDataArray, setImageDataArray] = useState([]);
  const [price, setPrice] = useState(0);
  const [launchDate, setLaunchDate] = useState("");
  const [launchTime, setLaunchTime] = useState("");
  const [cardStyle, setCardStyle] = useState({});
  const styleList = {
    state1: { backgroundColor: "white" },
    state2: { backgroundColor: "#61dafb11" },
    state3: { backgroundColor: "rgba(0, 255, 119, 0.459)" },
    state4: { backgroundColor: "#61dafb" },
    state5: { backgroundColor: "rgba(255, 0, 0, 0.733)" },
  };
  const uploadImageSource =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAACUlJTPz8+0tLQ6OjqGhob7+/v09PQODg6Xl5elpaWoqKjm5ubr6+slJSXZ2dk1NTUdHR2enp6MjIwsLCzh4eFMTEwWFhYgICC5ubkKCgp+fn7AwMD19fUnJydcXFxdXV0CC5I2AAAD50lEQVR4nO3dbVcaMRAF4AAqaMsWUEAFbf3/f7KgfUHIwGYzM3e6vferSuY5ScjsWXBTYhiGYRiGYRiGYRjm/814OhvppUFzjvL6sp0PVPNtijYdpnlY6PLeiYFm8V6ft8/tBA37lany8jwgxpjFkZVvl+8R9qIlMMRenJkCd0ETx0tr4QK8ULfWQPReXNkDB4NH5EL94SFE7kWXKRwgG7ihkxB3aKy9hIMNpoFrDChrocfFvN1YnPbX6Uv+B5C9eGUhHItEwCxaXDTthBIRcGhYvJXuhRLxyX2hmgml1eHewNkJJaL3O6qhUFqoG1+ipTDGoWEqDHFo2AojHBrGwvQ1/yuPfgvVWijNot+hYS6UiAuvhWovlBaq1150EEpEpwbOQ4g9F12EEtHlnoaPUFqoHkQnIXChegnF60XzWXQTwho4P6G0F61v2zgKQQ2cpxDTwLkKIQ2crxDRwDkLAVf93kL/Bs5dKDZwVgvVX+jdwAGEzg0cQuh7aECErg0cRujZwIGEEtHgtg1K6LcXYUKJqH5o4IReDRxQ6HR/ESn0uW0DFbo0cFihRBz2Rygs1D4J88ReCbMLtV/CHLFnwsxC7ZvwdBZ7JzwhhheWl3H0MdfowsVNcYafv7cTXVgfCimkEB8KKaQQHwoppBAfCimkEB8KKaQQHwoppBAfCik0Eir+O6aYwmG6U3ytgMJ9UWrEiMKPmrSIAYW/S1IixhP+rUiHGE54WJAKMZrwcz0axGDC43IUiLGEdyevWU8MJcwVU02MJMzXUksMJJRKqSTGEcqV1BHDCM8VUkWMIjxfRw0xiPBSGRXEGMLLVXQnhhC2KaIzMYKwXQ1diQGEp62aKhEvbF9BNyJcWFJAJyJaWDZ+FyJYWDp8ByJWWD56OREq7DJ4MREp7DZ2KREo7Dp0IREn7D5yGREmrBm4iIgStm3V8ikhgoS1wxYQMcL6UdsTIUKNQVsTEUKdMdsSAUKtIVsS/YU3aZLLuW/DjrN/kR6CCoWnW16deWHh8S7tnpOJvj6sEbYLhRRSSCGFFFJIIYUUUkghhRRSSCGFFFJIIYUUOgufz7zwcy+Em1s5m14IzUIhhRTiQyGFFOKjKbxHY7K5VxRWNchmOdfSl2aGxmQzUxQ2aEw2qs9DWqM1maw1gYr/VEYvdR9GPs4KzclkpSpMb2jPSd50gQEnUXkKU9qiRUfZagPTeHl5VMcsi59SczmxTn31NbrPCK06yMgCGIloBExpeo2mvWdu+BT5EJdRur3MSZqHJyhvcWP2APk/eX3ZzkG8+fZlYu77yLiZjbwzawyOQIZhGIZhGIZhGIZh/pn8BMD3c08IweDiAAAAAElFTkSuQmCC";

  const uploadForm = [
    ["Name", "Collection name"],
    ["Description", "Provide a detailed description of your collection."],
    ["Total Supply", "Number of nfts in your collection."],
  ];
  const traitForm = [
    ["Trait type", "Provide a trait for your NFTs", "Max Value", 100, 1],
  ];
  const [traitState, setTraitState] = useState(traitForm);
  const [defaultForm, setDefaultForm] = useState(["", "", ""]);

  const [defaultTraitForm, setDefaultTraitForm] = useState(
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  );
  const [individualMetadataState, setIndividualMetadataState] = useState({
    sample: {
      name: "This is name.",
      description: "Some Description",
      imageURL: "",
      metadataURL: "",
      traits: {},
    },
  });
  const metadataForm = {
    Name: defaultForm[0],
    Description: defaultForm[1],
    "Total Supply": defaultForm[2],
    Traits: [...defaultTraitForm],
    IndividualMetadata: individualMetadataState,
  };
  const metadataFormFiller = () => {
    let metadata = { ...individualMetadataState };
    let tempcardstyle = { ...cardStyle };
    imageNameArray.map((filename) => {
      if (metadata[filename] === undefined) {
        metadata[filename] = {
          name: filename,
          description: defaultForm[1],
          imageURL: "",
          metadataURL: "",
          traits: {},
        };
        defaultTraitForm.map((trait) => {
          if (trait.length !== 0) {
            metadata[filename]["traits"][trait[0]] = "";
          }
        });
        tempcardstyle[filename] = "state1";
      }
    });

    setIndividualMetadataState({ ...metadata });
    setCardStyle({ ...tempcardstyle });
  };

  useEffect(() => {
    metadataFormFiller();
    if (account !== undefined) {
      setIsConnected(true);
      setConnectionWarning("");
    } else {
      setIsConnected(false);
      setFormpage(1);
    }
  }, [account, imgArray]);

  const addTrait = () => {
    setTraitState((traitState) => [
      ...traitState,
      [
        "Trait type",
        "Provide a trait for your NFTs",
        "Max Value",
        100,
        traitState.length + 1,
      ],
    ]);
  };

  const removeTrait = () => {
    let temp = traitState.filter(
      (trait, index) => index < traitState.length - 1
    );
    setTraitState(temp);
  };

  const getRandomKey = (starterString) => {
    let randomKey =
      Math.floor(Math.random() * 10000, 4).toString() +
      starterString.toString();
    return randomKey;
  };

  const Page4 = () => {
    const lazy = async () => {
      let formData = new FormData();
      formData.append(
        "collection_id",
        account + defaultForm[0].replace(/\s+/g, "")
      );
      formData.append("collection_name", defaultForm[0]);
      formData.append("collection_description", defaultForm[1]);
      formData.append("total_supply", defaultForm[2]);
      formData.append("price", price);
      formData.append("launch_date", launchDate);
      formData.append("launch_time", launchTime);
      formData.append("owner", account);
      formData.append("contract", "0x");
      formData.append("network", chainId);
      let collectionData = {};
      imageNameArray.map((item) => {
        let itemIndex = imageNameArray.indexOf(item);
        collectionData["nft" + String(itemIndex)] =
          metadataForm["IndividualMetadata"][item]["metadataURL"];
      });
      formData.append("metadata", JSON.stringify(collectionData));
      const addcollectionURL = "http://localhost:8000/nft/addCollection";
      const response = await fetch(addcollectionURL, {
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
    const lazier = async () => {
      let formData = new FormData();
      formData.append(
        "collection_id",
        account + defaultForm[0].replace(/\s+/g, "")
      );
      formData.append("collection_name", defaultForm[0]);
      formData.append("collection_description", defaultForm[1]);
      formData.append("total_supply", defaultForm[2]);
      formData.append("price", price);
      formData.append("launch_date", launchDate);
      formData.append("launch_time", launchTime);
      formData.append("owner", account);
      formData.append("contract", "0x");
      formData.append("network", chainId);
      formData.append("contract_type", "simple");
      let collectionData = {};
      imageNameArray.map((item) => {
        let itemIndex = imageNameArray.indexOf(item);
        collectionData["nft" + String(itemIndex)] =
          metadataForm["IndividualMetadata"][item]["metadataURL"];
      });
      formData.append("metadata", JSON.stringify(collectionData));
      const addcollectionURL = "http://localhost:8000/nft/addCollection";
      const response = await fetch(addcollectionURL, {
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

    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          <div
            style={{
              padding: "2.5rem",
              border: "1px solid #61dafb",
              borderRadius: "25px",
            }}
          >
            <button
              className="btn"
              onClick={async () => {
                let clickResponse = await lazy();
                if (clickResponse === "Collection created successfully.") {
                  let collectionPage =
                    "/collection/" +
                    account +
                    defaultForm[0].replace(/\s+/g, "");
                  router.push(collectionPage);
                }
              }}
            >
              {" "}
              Lazy Minting
            </button>
            <h4>Costs Gas</h4>
            <h4>More Secure.</h4>
            <h5>
              A contract will be deployed on chain containing all the metadata.
              Minting is randomized using Chainlink VRF.
            </h5>
            <a href="https://docs.chain.link/docs/chainlink-vrf/">
              Learn about chainlink VRF
            </a>
          </div>
          <div
            style={{
              padding: "2.5rem",
              border: "1px solid #61dafb",
              borderRadius: "25px",
            }}
          >
            <button
              className="btn"
              onClick={async () => {
                let clickResponse = await lazier();
                if (clickResponse === "Collection created successfully.") {
                  let collectionPage =
                    "/collection/" +
                    account +
                    defaultForm[0].replace(/\s+/g, "");
                  router.push(collectionPage);
                }
              }}
            >
              {" "}
              Lazier Minting
            </button>
            <h4>No Gas Fee</h4>
            <h4>Faster</h4>
            <h5>Minting is randomized using Python randomizer.</h5>
          </div>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              setFormpage(3);
            }}
          >
            {"<"}Back
          </button>
        </div>
      </>
    );
  };

  const Page3 = () => {
    const ipfsFilePin = async (cardIndex) => {
      let traitNumber = 0;
      let imageData = imageDataArray[cardIndex];
      const myURL = "http://localhost:8000/nft/multifileupload";
      const formData = new FormData();
      defaultTraitForm.map((trait) => {
        if (trait.length !== 0) {
          traitNumber++;
        }
      });

      formData.append("trait_number", traitNumber);
      for (let i = 0; i < traitNumber; i++) {
        formData.append("trait_type" + i, defaultTraitForm[i][0]);
        formData.append(
          "trait_value" + i,
          metadataForm["IndividualMetadata"][imageNameArray[cardIndex]][
            "traits"
          ][defaultTraitForm[i][0]]
        );
      }
      formData.append("nft_file", imageData);
      formData.append("account", account);

      formData.append(
        "name",
        metadataForm["IndividualMetadata"][imageNameArray[cardIndex]]["name"]
      );
      formData.append(
        "description",
        metadataForm["IndividualMetadata"][imageNameArray[cardIndex]][
          "description"
        ]
      );
      const response = await fetch(myURL, {
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
    const imageReader = async (file) => {
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        if (imageNameArray.includes(file.name)) {
          return;
        } else {
          imageDataArray.push(file);
          setImageDataArray([...imageDataArray]);
          imageNameArray.push(file.name);
          setImageNameArray([...imageNameArray]);
          imgArray.push(reader.result);
          setImgArray([...imgArray]);
        }
      });
      reader.readAsDataURL(file);
    };
    const UploadImage = () => {
      return (
        <div>
          <h2>Upload Files.</h2>
          <img
            onClick={() => fileUpload()}
            src={uploadImageSource}
            alt="file upload"
            id="fileuploader"
          />
        </div>
      );
    };
    const fileUpload = () => {
      const fileSelector = document.createElement("input");
      fileSelector.setAttribute("type", "file");
      fileSelector.setAttribute("multiple", "");

      fileSelector.click();
      fileSelector.onchange = async (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
          await imageReader(e.target.files[i]);
        }
        setImageuploader(false);
      };
    };

    const StatusBar = () => {
      return (
        <div className="statusBar">
          <button className="btn2" onClick={() => setFormpage(2)}>
            {"<"} Back
          </button>
          <h3>
            {imageNameArray.length} files added.{" "}
            {defaultForm[2] - imageNameArray.length > 0 ? (
              <>
                {defaultForm[2] - imageNameArray.length} more to go.{" "}
                <button className="btn2" onClick={() => fileUpload()}>
                  Add files.
                </button>{" "}
              </>
            ) : (
              <></>
            )}
          </h3>
          <button
            className="btn2"
            onClick={() => {
              if (defaultForm[2] - imageNameArray.length > 0) {
                alert("Maybe some files are missing?");
              } else {
                let canDeploy = true;
                imageNameArray.map((item) => {
                  if (
                    metadataForm["IndividualMetadata"][item]["metadataURL"] ===
                    ""
                  ) {
                    canDeploy = false;
                  }
                });

                if (canDeploy) {
                  setFormpage(4);
                } else {
                  alert(
                    "Metadata is incomplete. All file cards should be Blue. A red card means an error in creating metadata."
                  );
                }
              }
            }}
          >
            Deploy Contract {">"}
          </button>
        </div>
      );
    };

    const MainFormBeforeTraits = (props) => {
      return (
        <>
          <div
            className="card-form"
            style={{ gridTemplateColumns: "2fr 2.5fr" }}
          >
            <label htmlFor="Name">Name</label>
            <input
              id={props.cardIndex + "name"}
              name="Name"
              type="text"
              defaultValue={
                metadataForm["IndividualMetadata"][
                  imageNameArray[props.cardIndex]
                ] !== undefined
                  ? metadataForm["IndividualMetadata"][
                      imageNameArray[props.cardIndex]
                    ]["name"]
                  : ""
              }
            />
          </div>
          <div
            className="card-form"
            style={{ gridTemplateColumns: "2fr 2.5fr" }}
          >
            <label htmlFor="Description">Description</label>
            <input
              id={props.cardIndex + "description"}
              name="Description"
              type="text"
              defaultValue={
                metadataForm["IndividualMetadata"][
                  imageNameArray[props.cardIndex]
                ] !== undefined
                  ? metadataForm["IndividualMetadata"][
                      imageNameArray[props.cardIndex]
                    ]["description"]
                  : ""
              }
            />
          </div>
        </>
      );
    };

    const saveData = (
      cardIndex,
      imageURL = "",
      metadataURL = "",
      cardState = "state2"
    ) => {
      let metadata = {};
      let filename = imageNameArray[cardIndex];
      metadata[filename] = {
        name: document.getElementById(cardIndex + "name").value,
        description: document.getElementById(cardIndex + "description").value,
        imageURL: imageURL,
        metadataURL: metadataURL,
        traits: {},
      };
      defaultTraitForm.map((trait) => {
        if (trait.length !== 0) {
          metadata[filename]["traits"][trait[0]] = document.getElementById(
            cardIndex + "trait" + trait[0]
          ).value;
        }
      });
      setIndividualMetadataState({
        ...individualMetadataState,
        ...metadata,
      });
      setCardStyle({ ...cardStyle, [filename]: cardState });
    };

    return (
      <>
        {imageUploader ? <UploadImage /> : null}
        <StatusBar />
        <div className="cardholder">
          {imgArray.map((file) => {
            let cardIndex = imgArray.indexOf(file);
            return (
              <React.Fragment key={getRandomKey(file)}>
                <div
                  className="card"
                  id={cardIndex + "card"}
                  style={styleList[cardStyle[imageNameArray[cardIndex]]]}
                >
                  <h4>{imageNameArray[cardIndex]}</h4>
                  <img src={file} alt="" />
                  <MainFormBeforeTraits cardIndex={cardIndex} />
                  {defaultTraitForm.map((item) => {
                    if (item.length === 0) {
                      return (
                        <React.Fragment
                          key={getRandomKey("nullObject")}
                        ></React.Fragment>
                      );
                    } else {
                      return (
                        <React.Fragment key={getRandomKey(item[0])}>
                          <div className="card-form">
                            <label htmlFor={item[0]}>{item[0]}</label>
                            <input
                              id={cardIndex + "trait" + item[0]}
                              name={item[0]}
                              type="number"
                              min={0}
                              max={item[1]}
                              defaultValue={
                                metadataForm["IndividualMetadata"][
                                  imageNameArray[cardIndex]
                                ] !== undefined
                                  ? metadataForm["IndividualMetadata"][
                                      imageNameArray[cardIndex]
                                    ]["traits"][item[0]]
                                  : ""
                              }
                            />
                            <h4>/{item[1]}</h4>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })}
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  >
                    <button
                      className="btn2"
                      onClick={() => {
                        let revisedImgArray = imgArray.filter(
                          (element, index) => index !== cardIndex
                        );
                        let revisedImgNameArray = imageNameArray.filter(
                          (element, index) => index !== cardIndex
                        );
                        let revisedImgDataArray = imageDataArray.filter(
                          (element, index) => index !== cardIndex
                        );
                        setImgArray(revisedImgArray);
                        setImageNameArray(revisedImgNameArray);
                        setImageDataArray(revisedImgDataArray);
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className="btn2"
                      onClick={() => {
                        saveData(cardIndex);
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <button
                    className="btn2"
                    onClick={async () => {
                      saveData(cardIndex, "", "", "state3");
                      let pins = await ipfsFilePin(cardIndex);
                      if (pins !== "Server error") {
                        saveData(
                          cardIndex,
                          pins["image_uri"],
                          pins["metadata_uri"],
                          "state4"
                        );
                      } else {
                        saveData(cardIndex, "", "", "state5");
                      }
                    }}
                  >
                    Create Metadata
                  </button>
                </div>
              </React.Fragment>
            );
          })}
          {imgArray.length < metadataForm["Total Supply"] && !imageUploader ? (
            <div className="card">
              <UploadImage />
            </div>
          ) : null}
        </div>
        {defaultForm[2] - imageNameArray.length > 0 ? null : <StatusBar />}
      </>
    );
  };

  const Page2 = () => {
    const page2Button = () => {
      let formIsFull = true;
      let temp = ["", "", ""];
      let tempTraitForm = [[], [], [], [], [], [], [], [], [], []];
      uploadForm.map((formItem) => {
        if (document.getElementById(formItem[0]).value === "") {
          formIsFull = false;
        } else {
          temp[uploadForm.indexOf(formItem)] = document.getElementById(
            formItem[0]
          ).value;
        }
      });
      traitState.map((formItem) => {
        if (document.getElementById(formItem[0] + formItem[4]).value === "") {
          formIsFull = false;
        } else {
          tempTraitForm[traitState.indexOf(formItem)][0] =
            document.getElementById(formItem[0] + formItem[4]).value;
        }
        if (document.getElementById(formItem[2] + formItem[4]).value === "") {
          formIsFull = false;
        } else {
          tempTraitForm[traitState.indexOf(formItem)][1] =
            document.getElementById(formItem[2] + formItem[4]).value;
        }
      });
      if (document.getElementById("Minimum Price").value === "") {
        formIsFull = false;
      } else {
        setPrice(document.getElementById("Minimum Price").value);
      }
      if (document.getElementById("Launch Date").value === "") {
        formIsFull = false;
      } else {
        setLaunchDate(document.getElementById("Launch Date").value);
      }
      if (document.getElementById("Launch Time").value === "") {
        formIsFull = false;
      } else {
        setLaunchTime(document.getElementById("Launch Time").value);
      }
      if (formIsFull) {
        setDefaultForm(temp);
        setDefaultTraitForm(tempTraitForm);
        setFormpage(3);
      } else {
        setFormWarning("Maybe finish your form first?");
      }
    };

    return (
      <>
        <h2>Create New Collection.</h2>
        <h4 style={{ color: "red" }}>{formWarning}</h4>
        <div style={{ padding: "0vw 20vw 0vw 20vw" }}>
          {uploadForm.map((item) => {
            return (
              <React.Fragment key={getRandomKey(item[0])}>
                <div className="myform">
                  <label htmlFor={item[0]}>{item[0]}</label>
                  <input
                    id={item[0]}
                    name={item[0]}
                    type="text"
                    placeholder={item[1]}
                    value={metadataForm[item[1]]}
                  />
                </div>
              </React.Fragment>
            );
          })}
          <div className="myform">
            <label htmlFor="Minimum Price">Minimum Price</label>
            <div style={{ width: "100%", display: "flex" }}>
              <input
                id="Minimum Price"
                name="Minimum Price"
                type="number"
                placeholder="Set the minimum price to mint each nft."
              />
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
                alt="Eth"
                style={{ width: "20px" }}
              />
            </div>
          </div>
          <div className="myform">
            <label htmlFor="Launch Date">Launch Date</label>

            <input id="Launch Date" name="Launch Date" type="date" />
          </div>
          <div className="myform">
            <label htmlFor="Launch Time">Launch Time (UTC)</label>

            <input
              id="Launch Time"
              name="Launch Time"
              type="time"
              placeholder="Set the launch date when your nft can be minted."
            />
          </div>
          {traitState.map((item) => {
            return (
              <React.Fragment key={getRandomKey(item[0])}>
                <div
                  className="myform"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 5fr 3fr",
                    alignItems: "center",
                  }}
                >
                  <div className="traitform">{item[4]}</div>
                  <div className="traitform">
                    <label htmlFor={item[0]}>{item[0]}</label>
                    <input
                      id={item[0] + item[4]}
                      name={item[0]}
                      type="text"
                      placeholder={item[1]}
                    />
                  </div>
                  <div className="traitform">
                    <label htmlFor={item[2]}>{item[2]}</label>
                    <input
                      id={item[2] + item[4]}
                      name={item[2]}
                      type="number"
                      placeholder={item[3]}
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div className="listChanger">
            <button disabled={traitState.length === 1} onClick={removeTrait}>
              -
            </button>
            <button disabled={traitState.length >= 10} onClick={addTrait}>
              +
            </button>
          </div>

          <button className="btn" onClick={page2Button}>
            Next
          </button>
        </div>
      </>
    );
  };

  const Page1 = () => {
    const createButton = () => {
      if (isConnected) {
        setFormpage(2);
      } else {
        setConnectionWarning(
          "Hey buddy! Please connect your wallet. This won't cost you any gas."
        );
      }
      setFormWarning("");
    };
    return (
      <div style={{ height: "40vh" }}>
        <button className="btn" onClick={createButton}>
          Create Collection
        </button>
      </div>
    );
  };

  const UploadSection = () => {
    if (formPage === 1) {
      return <Page1 />;
    } else if (formPage === 2) {
      return <Page2 />;
    } else if (formPage === 3) {
      return <Page3 />;
    } else if (formPage === 4) {
      return <Page4 />;
    }
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
          margin: "auto",
        }}
      >
        <section className="section-vertical">
          <div className="writing">
            <h1>NFT Collection</h1>
            <h2>Metadata will be stored on ipfs</h2>
            <h4 style={{ color: "blue" }}>{connectionWarning}</h4>
          </div>
          <UploadSection />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Article;
