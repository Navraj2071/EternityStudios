import "../styles/globals.css";
import { useState, useEffect } from "react";
import AppContext from "../AppContext";
import { DAppProvider, ChainId } from "@usedapp/core";

function MyApp({ Component, pageProps }) {
  const config = {
    multicallAddresses: { 1: "Ethereum Mainnet", 4: "Network Rinkeby" },
    networks: [ChainId.Rinkeby, ChainId.Mainnet],
  };

  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
