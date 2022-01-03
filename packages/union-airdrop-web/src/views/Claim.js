import { useEffect } from "react";
import { Box } from "union-ui";
import { useNavigate } from "react-router-dom";
import ClaimCard from "../components/ClaimCard";

const urls = {
  production: "https://app.union.finance/api/geo",
  local: "http://localhost:3000/api/geo",
};

/**
 * Belarus       | BY
 * Cuba          | CU
 * Iran          | IR
 * Iraq          | IQ
 * Côte d'Ivoire | CI
 * Libya         | LY
 * Somalia       | SO
 * Liberia       | LR
 * Sudan         | SD
 * South Sudan   | SS
 * Syria         | SY
 * Zimbabwe      | ZW
 **/
const restrictedCountryCodes = [
  "BY",
  "CU",
  "IR",
  "IQ",
  "CI",
  "LY",
  "SO",
  "LR",
  "SD",
  "SS",
  "SY",
  "ZW",
  "US",
];

export default function Claim() {
  const navigate = useNavigate();

  useEffect(() => {
    async function geoCheck() {
      try {
        const resp = await fetch(urls.production);
        const data = await resp.json();
        if (restrictedCountryCodes.includes(data.country)) {
          navigate(`/geo?country=${data.country}`);
        }
      } catch (_) {}
    }

    geoCheck();
  }, [navigate]);

  return (
    <Box direction="vertical" align="center" justify="center" fluid>
      <ClaimCard />
    </Box>
  );
}
