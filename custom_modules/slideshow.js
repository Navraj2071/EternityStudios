import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export function Slideshow(imgArray, noAtATime, slideTime, margin, imgWidth) {
  const firstPos = margin;
  const [arrayIndex, setArrayIndex] = useState(0);
  // const arrayIndex = 2;
  const aspectRatio = 1.25;
  let clickable = true;

  const getIndex = (index) => {
    if (index >= 0) {
      return index % imgArray.length;
    } else if (index === -1 * imgArray.length) {
      return 0;
    } else {
      return (index % imgArray.length) + imgArray.length;
    }
  };

  const slideRight = () => {
    if (clickable === true) {
      for (let i = arrayIndex; i < arrayIndex + noAtATime; i++) {
        const imIndex = i;
        const im = document.getElementById(imIndex.toString());
        let currentPos = firstPos + imgWidth * (imIndex - arrayIndex + 1);
        const futurePos = currentPos + imgWidth;
        const timeInterval = slideTime / imgWidth / 10;
        let move = setInterval(frame, timeInterval);
        let opacity = 1;
        function frame() {
          if (currentPos >= futurePos) {
            currentPos = futurePos;
            clickable = true;
            if (arrayIndex === noAtATime) {
              setArrayIndex(0);
            } else {
              setArrayIndex(arrayIndex - 1);
            }
            clearInterval(move);
          } else {
            currentPos = currentPos + 2;
            clickable = false;
            im ? (im.style.left = currentPos.toString() + "px") : null;
            // im.style.left = currentPos.toString() + "px";
            if (imIndex === arrayIndex + noAtATime - 1) {
              opacity = opacity * 0.975;
              im ? (im.style.opacity = opacity) : null;
              // im.style.opacity = opacity;
            }
          }
        }
      }
    }
  };
  const slideLeft = () => {
    if (clickable === true) {
      for (let i = arrayIndex; i < arrayIndex + noAtATime; i++) {
        const imIndex = i;
        const im = document.getElementById(imIndex.toString());
        let currentPos = firstPos + imgWidth * (imIndex - arrayIndex + 1);
        const futurePos = currentPos - imgWidth;
        const timeInterval = slideTime / imgWidth / 10;
        let move = setInterval(frame, timeInterval);
        let opacity = 1;
        function frame() {
          if (currentPos <= futurePos) {
            currentPos = futurePos;
            clickable = true;
            if (arrayIndex === noAtATime) {
              setArrayIndex(0);
            } else {
              setArrayIndex(arrayIndex + 1);
            }
            clearInterval(move);
          } else {
            currentPos = currentPos - 2;
            clickable = false;
            im.style.left = currentPos.toString() + "px";
            if (imIndex === arrayIndex) {
              opacity = opacity * 0.975;
              im.style.opacity = opacity;
            }
          }
        }
      }
    } else {
      console.log("Wait for it.");
    }
  };

  const addOneImage = (index) => {
    const imgPos =
      (firstPos + (index - arrayIndex + 1) * imgWidth).toString() + "px";
    let imgIndex = getIndex(index);

    return (
      <img
        src={imgArray[imgIndex]}
        alt=""
        id={index}
        key={index}
        style={{
          position: "absolute",
          width: imgWidth.toString() + "px",
          height: (imgWidth * aspectRatio).toString() + "px",
          left: imgPos,
        }}
      />
    );
  };

  const AddImages = () => {
    const imgFragment = [];
    for (let i = arrayIndex; i < arrayIndex + noAtATime; i++) {
      imgFragment.push(addOneImage(i));
    }
    return <>{imgFragment.map((imge) => imge)}</>;
  };

  useEffect(() => {
    const ani = setInterval(slideRight, 2000);
    return () => {
      clearInterval(ani);
    };
  }, [arrayIndex]);

  return (
    <div
      className="slider"
      style={{
        position: "relative",
        width: "100%",
        height: imgWidth * aspectRatio,
      }}
    >
      <button
        className="btn"
        onClick={slideLeft}
        style={{
          position: "absolute",
          left: firstPos,
          width: imgWidth,
          height: imgWidth * aspectRatio,
          fontSize: imgWidth * 0.75,
          cursor: "context-menu",
          border: "none",
          margin: 0,
          padding: 0,
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        {"<"}
      </button>

      <AddImages />
      <button
        className="btn"
        onClick={slideRight}
        style={{
          position: "absolute",
          left: firstPos + (noAtATime + 1) * imgWidth,
          width: imgWidth,
          height: imgWidth * aspectRatio,
          fontSize: imgWidth * 0.75,
          cursor: "context-menu",
          border: "none",
          margin: 0,
          padding: 0,
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        {">"}
      </button>
    </div>
  );
}
