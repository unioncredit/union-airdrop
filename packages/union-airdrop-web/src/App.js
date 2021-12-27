import { Box, NotificationStack, Notification, Label } from "union-ui";
import { Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import useEagerConnect from "./hooks/useEagerConnect";
import useInactiveListener from "./hooks/useInactiveListener";

import Wrapper from "./components/Wrapper";
import Home from "./views/Home";
import Claim from "./views/Claim";
import GeoBlock from "./views/GeoBlock";
import notificationsState from "./state/notifications";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function ConnectWeb3({ children }) {
  useEagerConnect();
  useInactiveListener();

  return children;
}

const defaultTitles = {
  success: "Transaction successful",
  error: "Transaction error",
  pending: "Waiting for confirmation",
};

function App() {
  const [notifications, setNotifications] = notificationsState.use();

  const closeNotification = (id) => () => {
    setNotifications((x) => x.filter((n) => n.id !== id));
  };

  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectWeb3>
          <Box fluid mt="24px">
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/geo" element={<GeoBlock />} />
              </Routes>
            </Wrapper>
            <NotificationStack>
              {notifications.map(({ id, text, type = "success" }, i) => (
                <Notification
                  key={i}
                  variant={type}
                  onClose={closeNotification(id)}
                  title={defaultTitles[type] || "Notification"}
                >
                  <Label as="p" size="small">
                    {text}
                  </Label>
                </Notification>
              ))}
            </NotificationStack>
          </Box>
        </ConnectWeb3>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
