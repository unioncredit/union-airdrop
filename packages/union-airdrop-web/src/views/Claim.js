import { useEffect } from "react";
import { Box } from "union-ui";
import { useNavigate } from "react-router-dom";
import ClaimCard from "../components/ClaimCard";

const urls = {
  production: "https://app.union.finance/api/geo",
  local: "http://localhost:3000/api/geo",
};

export default function Claim() {
  const navigate = useNavigate();

  useEffect(() => {
    async function geoCheck() {
      try {
        const resp = await fetch(urls.production);
        const data = await resp.json();
        if (data.country === "US") {
          navigate("/geo");
        }
      } catch (_) {}
    }

    geoCheck();
  }, []);

  return (
    <Box direction="vertical" align="center" justify="center" fluid>
      <ClaimCard />
    </Box>
  );
}
