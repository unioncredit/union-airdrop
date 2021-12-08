import { Box } from "union-ui";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import useEagerConnect from "./hooks/useEagerConnect";
import useInactiveListener from "./hooks/useInactiveListener";

import Wrapper from "./components/Wrapper";
import ClaimCard from "./components/ClaimCard";

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
              <Box fluid justify="center" w="100%" mt="24px" className="app">
                <ClaimCard />
              </Box>
            </Wrapper>
          </Box>
        </ConnectWeb3>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
