import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";
import { useRouter } from "next/router";
import FormData from "form-data";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig";

const BlogPage = ({ blogData }) => {
  const router = useRouter();
  const [searchMessage, setSearchMessage] = useState("");
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

  const createButton = async () => {
    router.push("/blog");
  };

  if (blogData["response"] !== "Success") {
    return (
      <>
        <h2>{blogData["response"]}</h2>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <button className="btn" onClick={createButton}>
        Create Blog
      </button>
      <div className="blog">
        <div className="blog-heading">
          <h1>{blogData["title"]}</h1>
        </div>
        <div className="blog-data">
          <h2>{blogData["heading"]}</h2>
          <h5>{blogData["description"]}</h5>
          <h5>{blogData["post_date"]}</h5>
          <img
            src={blogData["image"]}
            alt=""
            style={{ padding: "5vw", width: "100%", height: "30vw" }}
          />
          <h4>
            <div>{parse(blogData["blog_text"])}</div>
          </h4>
          <h5>
            Created by: {blogData["owner"]}{" "}
            <button
              className="btn2"
              onClick={() => {
                router.push("/profile/" + blogData["owner"]);
              }}
            >
              View Profile
            </button>
          </h5>
        </div>
      </div>
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
            <h3>{searchMessage}</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;

const getBlogData = async (blogId) => {
  let apiURL = BASE_URL + "assets/blog";
  let formData = new FormData();
  formData.append("operation", "getwithId");
  formData.append("id", blogId);
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
  return response;
};

export async function getServerSideProps(context) {
  let blogId = context.params.blogId;
  let blogData = await getBlogData(blogId);
  if (blogData === "Server error") {
    return {
      props: { blogData: { response: "Server error" } },
    };
  }
  if (blogData["response"] !== "Success") {
    return {
      props: {
        blogData: { response: "Requested Blog not found." },
      },
    };
  }
  return { props: { blogData: blogData } };
}
