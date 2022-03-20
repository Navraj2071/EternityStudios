import { useState, useEffect } from "react";
import Navbar from "../../../custom_modules/navbar";
import Footer from "../../../custom_modules/footer";
import BASE_URL from "../../../apiConfig";

const CreatePage = () => {
  const [w1, setw1] = useState("Loading...");
  const [w2, setw2] = useState("");
  const [w3, setw3] = useState("");
  const [w4, setw4] = useState("");
  const [w5, setw5] = useState("");

  const [timeNow, setTimeNow] = useState(0);

  const wordArray = [
    ["Never", "", "", "", ""],
    ["Never", "Gonna", "", "", ""],
    ["Never", "Gonna", "Give", "", ""],
    ["Never", "Gonna", "Give", "", ""],
    ["Never", "Gonna", "Give", "You", ""],
    ["Never", "Gonna", "Give", "You", ""],
    ["Never", "Gonna", "Give", "You", "Up!"],
    ["Never", "Gonna", "Give", "You", "Up!"],
    ["Never", "Gonna", "Give", "You", "Up!"],
    ["Never", "Gonna", "Give", "You", "Up!"],
    ["", "", "", "", ""],
    ["Never", "", "", "", ""],
    ["Never", "Gonna", "", "", ""],
    ["Never", "Gonna", "Let", "", ""],
    ["Never", "Gonna", "Let", "", ""],
    ["Never", "Gonna", "Let", "You", ""],
    ["Never", "Gonna", "Let", "You", ""],
    ["Never", "Gonna", "Let", "You", "Down"],
    ["Never", "Gonna", "Let", "You", "Down"],
    ["Never", "Gonna", "Let", "You", "Down..."],
    ["Never", "Gonna", "Let", "You", "Down..."],
    ["Never", "Gonna", "Let", "You", "Down..."],
    ["Never", "Gonna", "Let", "You", "Down..."],
    ["", "", "", "", ""],
    ["Never", "", "", "", ""],
    ["Never", "Gonna", "", "", ""],
    ["Never", "Gonna", "Run", "", ""],
    ["Never", "Gonna", "Run", "", ""],
    ["Never", "Gonna", "Run", "Around", ""],
    ["Never", "Gonna", "Run", "Around", ""],
    ["Never", "Gonna", "Run", "Around", "And"],
    ["Never", "Gonna", "Run", "Around", "And"],
    ["Never", "Gonna", "Run", "Around", "And"],
    ["Never", "Gonna", "Run", "Around", "And"],
    ["", "", "Desert", "", ""],
    ["", "", "Desert", "", ""],
    ["", "", "Desert", "You...", ""],
    ["", "", "Desert", "You...", ""],
    ["", "", "Desert", "You...", ""],
    ["", "", "Desert", "You...", ""],
  ];

  useEffect(() => {
    setTimeout(() => {
      setw1(wordArray[timeNow][0]);
      setw2(wordArray[timeNow][1]);
      setw3(wordArray[timeNow][2]);
      setw4(wordArray[timeNow][3]);
      setw5(wordArray[timeNow][4]);
      if (timeNow > wordArray.length - 2) {
        setTimeNow(0);
      } else {
        setTimeNow((timeNow) => timeNow + 1);
      }
    }, 250);
  }, [timeNow]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          height: "50vh",
        }}
      >
        <div
          style={{
            textAlign: "right",
            fontSize: "5rem",
            color: "#61dafb",
            paddingTop: "20vh",
          }}
        >
          {w1} {w2}
        </div>
        <div style={{ fontSize: "5rem", paddingTop: "20vh" }}>
          {w3} {w4} {w5}
        </div>
      </div>
      <div style={{ height: "30vh" }}>
        <h2>Sorry about that.</h2>
        <h2>Create toolbox is coming soon...</h2>
      </div>
      <Footer />
    </>
  );
};

export default CreatePage;
