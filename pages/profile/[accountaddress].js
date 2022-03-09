import Navbar from "../../custom_modules/navbar";
import Footer from "../../custom_modules/footer";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const apiURL = "http://localhost:8000/assets/addprofile";
const getProfileData = async (profileAccount, profileName, profilePic) => {
  let formData = new FormData();
  formData.append("account", profileAccount);
  formData.append("name", profileName);
  formData.append("description", profileName);
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

const ProfilePage = (profileData) => {
  const router = useRouter();
  const queryaccount = router.query.accountaddress;
  const [profileName, setProfileName] = useState(profileData["name"]);
  const [profileDescription, setProfileDescription] = useState(
    profileData["description"]
  );
  const [profilepic, setProfilepic] = useState(profileData["profilepic"]);
  const [profileSingleNFTs, setProfileSingleNFTs] = useState([]);
  const [profileCollections, setProfileCollections] = useState([]);

  useEffect(async () => {
    setProfileData();
  }, []);

  const setProfileData = async () => {
    let profileData = await getProfileData(queryaccount, "", "");
    if (profileData !== "Server error") {
      setProfileName(profileData["name"]);
      setProfileDescription(profileData["description"]);
      setProfilepic(profileData["profilepic"]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div style={{ width: "20rem", height: "20rem" }}>
          <img src={profilepic} alt={queryaccount} />
        </div>
        <div>
          <h1>{profileName}</h1>
          <h2>{profileDescription}</h2>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "center",
        }}
      >
        <div>
          <h2>Single NFTs</h2>
        </div>
        <div>
          <h2>Collections</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;
