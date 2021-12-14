import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useLocation, useNavigate } from "react-router-dom";

export default function useNotConnected() {
  const { account, library } = useWeb3React();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("claim") && (!account || !library)) {
      navigate("/");
    }
  }, [account, library, location.pathname, navigate]);
}
