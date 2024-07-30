import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Analyse = () => {
  const location = useLocation();
  const { assets } = location.state;
  const [goldRates, setGoldRates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [risk, setRisk] = useState("medium");
  const [liquidity, setLiquidity] = useState("medium");
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const fetchGoldRates = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        url: "https://gold-rates-india.p.rapidapi.com/api/state-gold-rates",
        headers: {
          "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
          "x-rapidapi-host": "gold-rates-india.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setGoldRates(response.data.GoldRate);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoldRates();
  }, []);

  const getGoldRate = (state) => {
    if (!goldRates) return "Loading...";
    const stateData = goldRates.find(
      (rate) =>
        rate.state.toLowerCase() === state.toLowerCase().replace(/ /g, "-")
    );
    return stateData ? parseFloat(stateData.TenGram24K) : "N/A";
  };

  const calculateGoldValue = (amount, rate) => {
    if (rate === "Loading..." || rate === "N/A") return rate;
    const valuePerGram = rate / 10; // Convert 10g rate to 1g rate
    return (amount * valuePerGram).toFixed(2);
  };

  const getInvestmentAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:5001/api/getInvestmentAdvice",
        {
          risk,
          liquidity,
        }
      );

      setAdvice(response.data.advice);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analysis-container">
      <h1>Asset Analysis</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {assets.length > 0 ? (
            <ul>
              {assets.map((asset, index) => (
                <li key={index}>
                  {asset.asset.charAt(0).toUpperCase() + asset.asset.slice(1)}:
                  {asset.amount} {getUnitType(asset.asset)}
                  {asset.asset === "gold" && asset.state ? (
                    <>
                      {" - Gold Rate (24K per 10g): ₹"}
                      {getGoldRate(asset.state)}
                      {" - Total Value: ₹"}
                      {calculateGoldValue(
                        asset.amount,
                        getGoldRate(asset.state)
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No assets to analyze.</p>
          )}
          <div className="investment-advisor">
            <h2>Investment Selector</h2>
            <div className="flex flex-col">
              <label htmlFor="risk" className="mb-2 text-gray-700">
                Select your risk tolerance:
              </label>
              <select
                id="risk"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="liquidity" className="mb-2 text-gray-700">
                Select your liquidity preference:
              </label>
              <select
                id="liquidity"
                value={liquidity}
                onChange={(e) => setLiquidity(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="very-high">Very High</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button
              onClick={getInvestmentAdvice}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Get Investment Advice
            </button>
            <div id="advice" className="mt-4 text-lg text-gray-800">
              {advice}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function getUnitType(asset) {
  if (asset === "gold") return "grams";
  if (asset === "real-estate") return "units";
  if (asset === "cash") return "INR";
  return "";
}

export default Analyse;
