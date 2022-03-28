import React from "react";
import { useEthers } from "@usedapp/core";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const navbar = () => {
  const { account, chainId, activateBrowserWallet, deactivate } = useEthers();
  const router = useRouter();
  const isConnected = account !== undefined;
  const [hasDropped, setHasDropped] = useState(false);

  const accountShow =
    account === undefined
      ? ""
      : account.substring(0, 4) +
        "..." +
        account.substring(account.length - 3, account.length);

  const profilelink = account === undefined ? "#" : "/profile/" + account;

  const activateButton = () => {
    return (
      <button
        className="btn"
        style={{
          margin: "auto",
          padding: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          activateBrowserWallet();
        }}
      >
        Connect
      </button>
    );
  };
  const deactivateButton = () => {
    return (
      <button
        className="btn"
        style={{
          margin: "auto",
          padding: "5px",
          fontSize: "20px",
        }}
        onClick={() => {
          deactivate();
        }}
      >
        Disonnect
      </button>
    );
  };

  return (
    <>
      <div className="navbar-main">
        <div className="nav-item">
          <Link href="/">
            <img
              src="/Eternity.png"
              alt="Eternity Studios"
              style={{ height: "40px", width: "160px" }}
            />
          </Link>
        </div>
        <div className="nav-item" onClick={() => router.push("/nft")}>
          <Link href="/nft">NFT</Link>
        </div>
        <div className="nav-item" onClick={() => router.push("/lottery")}>
          <Link href="/lottery">Lottery</Link>
        </div>
        <div className="nav-item" onClick={() => router.push("/aboutMe")}>
          <Link href="/aboutMe">About Me</Link>
        </div>
        <div className="nav-item" onClick={() => router.push("/blog")}>
          <Link href="/blog">Blog</Link>
        </div>

        <div
          className="dropdown-main-item"
          style={{ width: "100px" }}
          onClick={() => {
            console.log("Clicked");
            setHasDropped(!hasDropped);
          }}
        >
          <img src="/MenuBlue.svg" alt="" />
        </div>

        <div>
          {isConnected ? deactivateButton() : activateButton()}
          {account && (
            <>
              <Link href={profilelink}>
                <button
                  className="btn"
                  style={{
                    margin: "auto",
                    padding: "5px",
                    fontSize: "20px",
                    color: "grey",
                    borderColor: "grey",
                    backgroundColor: "rgba(10, 255, 21, 0.2)",
                  }}
                >
                  Profile
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      {hasDropped ? (
        <>
          <div className="dropdown-main">
            <div
              className="dropdown-main-item"
              onClick={() => router.push("/")}
            >
              Home
            </div>
            <div
              className="dropdown-main-item"
              onClick={() => router.push("/nft")}
            >
              NFT
            </div>
            <div
              className="dropdown-main-item"
              onClick={() => router.push("/lottery")}
            >
              Lottery
            </div>
            <div
              className="dropdown-main-item"
              onClick={() => router.push("/aboutMe")}
            >
              About Me
            </div>
            <div
              className="dropdown-main-item"
              onClick={() => router.push("/blog")}
            >
              Blog
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default navbar;
