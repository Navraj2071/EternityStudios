import "../styles/globals.css";
import { useState, useEffect } from "react";
import AppContext from "../AppContext";
import { DAppProvider, ChainId } from "@usedapp/core";

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(undefined);
  const [userAccount, setAccount] = useState(undefined);

  return (
    <DAppProvider config={{ networks: [ChainId.Kovan, ChainId.Rinkeby] }}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
