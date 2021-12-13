import { Box } from "union-ui";
import { Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import useEagerConnect from "./hooks/useEagerConnect";
import useInactiveListener from "./hooks/useInactiveListener";

import Wrapper from "./components/Wrapper";
import Home from "./views/Home";
import Claim from "./views/Claim";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function ConnectWeb3({ children }) {
  useEagerConnect();
  useInactiveListener();

  return children;
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectWeb3>
          <Box fluid mt="24px">
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/claim" element={<Claim />} />
              </Routes>
            </Wrapper>
          </Box>
        </ConnectWeb3>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
