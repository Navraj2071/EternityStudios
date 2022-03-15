import React from "react";
import { useEthers } from "@usedapp/core";
import { useContext } from "react";
import Link from "next/link";
import AppContext from "../AppContext";

const navbar = () => {
  const { account, chainId, activateBrowserWallet, deactivate } = useEthers();

  const isConnected = account !== undefined;

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
    <div className="navbar-main">
      <div className="navbar-left">
        <Link href="/">ETERNITY STUDIOS</Link>
      </div>
      <div className="navbar-mid" style={{ color: "red" }}>
        <p></p>
      </div>

      <div className="navbar-mid">
        <Link href="/nft">NFT</Link>
        <Link href="/lottery">Lottery</Link>
        <Link href="/fundme">FundMe</Link>
        <Link href="/blog">Blog</Link>
      </div>
      <div className="navbar-mid">
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
                {accountShow}
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default navbar;
