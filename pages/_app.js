import "../styles/globals.css";
import { useState, useEffect } from "react";
import AppContext from "../AppContext";
import { DAppProvider, ChainId } from "@usedapp/core";

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(undefined);
  const [userAccount, setAccount] = useState(undefined);
  const config = {
    multicallAddresses: { 4: "Network Rinkeby" },
    networks: [ChainId.Rinkeby, ChainId.Mainnet],
  };

  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
