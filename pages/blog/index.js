import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import React from "react";
import { ChainId, useEthers } from "@usedapp/core";
import BASE_URL from "../../apiConfig";

const BlogPage = () => {
  const router = useRouter();
  const { account, chainId, activateBrowserWallet, deactivate } = useEthers();
  const [accountWarning, setAccountWarning] = useState("");
  const [dataWaring, setDataWarning] = useState("");
  const [canCreate, setCanCreate] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [blogArray, setBlogArray] = useState([]);

  const getRandomBlogs = async (number) => {
    let blogArray = [];
    let apiURL = BASE_URL + "assets/blog";
    let formData = new FormData();
    formData.append("operation", "getRandom");
    formData.append("number", number);
    const response = await fetch(apiURL, { method: "POST", body: formData })
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
      for (let i = 0; i < number; i++) {
        blogArray.push(response[i]);
      }
    }
    setBlogArray([...blogArray]);
  };

  const searchBlog = async () => {
    setSearchMessage("");
    let searchQuery = document.getElementById("SearchBar").value;
    let apiURL = BASE_URL + "assets/blog";
    let formData = new FormData();
    formData.append("operation", "getwithTitle");
    formData.append("title", searchQuery);
    const response = await fetch(apiURL, { method: "POST", body: formData })
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
      if (response["response"] === "Success") {
        router.push("/blog/" + response["id"]);
      } else {
        setSearchMessage("Requested Blog not found.");
      }
    } else {
      setSearchMessage("Something went wrong with the server.");
    }
  };

  useEffect(() => {
    getRandomBlogs(4);
    if (account !== undefined) {
      setAccountWarning("");
    } else {
      setCanCreate(false);
    }
  }, [account]);

  const createButton = async () => {
    if (account === undefined) {
      setAccountWarning(
        "Hey buddy! Please Connect your wallet. This won't cost you any gas"
      );
    } else {
      setCanCreate(true);
      setDataWarning("");
    }
  };

  const checkData = () => {
    if (document.getElementById("BlogName").value === "") {
      setDataWarning("Maybe some data is missing...");
      return false;
    }
    if (document.getElementById("BlogTitle").value === "") {
      setDataWarning("Maybe some data is missing...");
      return false;
    }
    if (document.getElementById("BlogDescription").value === "") {
      setDataWarning("Maybe some data is missing...");
      return false;
    }
    if (document.getElementById("BlogImage").value === "") {
      setDataWarning("Maybe some data is missing...");
      return false;
    }
    if (document.getElementById("BlogText").value === "") {
      setDataWarning("Maybe some data is missing...");
      return false;
    }
    return true;
  };

  const saveBlog = async () => {
    if (!checkData()) {
      return 5;
    }
    let apiURL = BASE_URL + "assets/blog";
    let formData = new FormData();
    formData.append("operation", "add");
    formData.append("owner", account);
    formData.append("title", document.getElementById("BlogName").value);
    formData.append("heading", document.getElementById("BlogTitle").value);
    formData.append(
      "description",
      document.getElementById("BlogDescription").value
    );
    formData.append("blog_text", document.getElementById("BlogText").value);
    formData.append("image", document.getElementById("BlogImage").value);
    const response = await fetch(apiURL, { method: "POST", body: formData })
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
    if (response !== "Server error") {
      let adjustedName = document
        .getElementById("BlogName")
        .value.replace(/\s/g, "_");
      let blogId = adjustedName + account.toString();
      router.push("/blog/" + blogId);
    }
  };

  const getRandomKey = (starterString) => {
    let randomKey =
      Math.round(Math.random() * 10000, 4).toString() + starterString;
    return randomKey;
  };

  const BlogCreator = () => {
    return (
      <>
        {canCreate ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80vw",
                  padding: "20px",
                  border: "1px solid var(--clr-heading1)",
                  borderRadius: "25px",
                }}
              >
                <button
                  className="btn2"
                  onClick={() => {
                    setCanCreate(false);
                  }}
                >
                  X
                </button>
                <h4 style={{ color: "red" }}>{dataWaring}</h4>
                <h1>Create Blog</h1>
                <div className="myform">
                  <input
                    type="text"
                    placeholder="Enter name of blog"
                    id="BlogName"
                    style={{ margin: "20px 0px 20px 0px" }}
                  />

                  <input
                    type="text"
                    placeholder="Give it a title"
                    id="BlogTitle"
                    style={{ margin: "20px 0px 20px 0px" }}
                  />
                  <input
                    type="text"
                    placeholder="Describe your blog. What is it about ?"
                    id="BlogDescription"
                    style={{ margin: "20px 0px 20px 0px" }}
                  />
                  <input
                    type="text"
                    placeholder="Provide URL for the title image"
                    id="BlogImage"
                    style={{ margin: "20px 0px 20px 0px" }}
                  />

                  <textarea
                    name=""
                    id="BlogText"
                    placeholder="Contents of your blog. You can use HTML format too."
                    style={{
                      margin: "20px 0px 20px 0px",
                      width: "100%",
                      height: "500px",
                      padding: "12px 20px",
                      boxSizing: "border-box",
                      border: "1px solid rgb(229, 232, 235)",
                      borderRadius: "10px",
                      backgroundColor: "transparent",
                    }}
                  ></textarea>
                </div>
              </div>
              <button onClick={() => saveBlog()} className="btn">
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ color: "blue" }}>{accountWarning}</h3>
            <button className="btn" onClick={createButton}>
              Create Blog
            </button>
          </>
        )}
      </>
    );
  };
  return (
    <>
      <Navbar />
      <BlogCreator />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "200px",
        }}
      >
        <div style={{ width: "50vw" }}>
          <div className="myform">
            <label htmlFor="SearchBar"></label>
            <input type="text" placeholder="Enter Blog Name" id="SearchBar" />
            <button className="btn" onClick={() => searchBlog()}>
              Search
            </button>
            {searchMessage}
          </div>
        </div>
      </div>
      {blogArray.map((blog) => {
        return (
          <React.Fragment key={getRandomKey(blog["id"])}>
            <div
              onClick={() => {
                router.push("/blog/" + blog["id"]);
              }}
              className="btn"
              style={{ margin: "20px", padding: "20px", width: "90vw" }}
            >
              <h4>{blog["title"]}</h4>
              <h5>{blog["description"]}</h5>
            </div>
          </React.Fragment>
        );
      })}
      <Footer />
    </>
  );
};

export default BlogPage;
