import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { assetInfo, tooltipContent } from "./assetInfo"; // Adjust the path as necessary
import { adviceMap } from "./investmentAdvice"; // Adjust the path as necessary

const Analyse = () => {
  const location = useLocation();
  const { assets } = location.state;
  const [goldRates, setGoldRates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [risk, setRisk] = useState("medium");
  const [liquidity, setLiquidity] = useState("medium");
  const [advice, setAdvice] = useState("");
  const [expandedAssets, setExpandedAssets] = useState({});
  const [tooltipData, setTooltipData] = useState({
    show: false,
    content: null,
    position: { top: 0, left: 0 },
  });

  const investmentOptions = [
    { name: "Cash", risk: "low", liquidity: "very-high" },
    { name: "Gold", risk: "medium", liquidity: "high" },
    { name: "Stocks", risk: "high", liquidity: "high" },
    { name: "Mutual Funds", risk: "medium", liquidity: "medium" },
    { name: "Real Estate", risk: "medium", liquidity: "low" },
    { name: "Bonds", risk: "low", liquidity: "medium" },
    { name: "FD", risk: "low", liquidity: "low" },
    { name: "PPF", risk: "low", liquidity: "low" },
  ];

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

  const getInvestmentAdvice = () => {
    const matchingOptions = investmentOptions.filter(
      (option) => option.risk === risk && option.liquidity === liquidity
    );

    const adviceTexts = matchingOptions.map((option) => {
      return `${
        option.name
      }: Consider investing in ${option.name.toLowerCase()}. It offers ${option.liquidity.toLowerCase()} liquidity and has a ${option.risk.toLowerCase()} risk profile.`;
    });

    setAdvice(adviceTexts.join(" "));
  };

  const toggleExpand = (index) => {
    setExpandedAssets((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderTooltip = (assetType, type) => {
    if (!tooltipContent[assetType]) return null;

    const content = tooltipContent[assetType][type];

    return (
      <div
        className="absolute bg-white text-gray-700 p-4 rounded-lg shadow-lg z-10 w-64"
        style={{
          top: tooltipData.position.top,
          left: tooltipData.position.left,
          display: tooltipData.show ? "block" : "none",
        }}
      >
        <h4 className="font-semibold text-lg mb-2">
          {assetType.charAt(0).toUpperCase() + assetType.slice(1)} -{" "}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h4>
        <ul className="text-sm">
          {content.map((item, index) => (
            <li key={index}>
              <strong>{item.title}:</strong> {item.value}
              <p className="text-xs text-gray-600">{item.details}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleMouseEnter = (asset, type, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipData({
      show: true,
      content: { assetType: asset, type },
      position: {
        top: rect.top + window.scrollY - 10,
        left: rect.left + window.scrollX + rect.width + 10,
      },
    });
  };

  const handleMouseLeave = () => {
    setTooltipData({
      show: false,
      content: null,
      position: { top: 0, left: 0 },
    });
  };
  useEffect(() => {
    getInvestmentAdvice();
  }, [risk, liquidity]);

  return (
    <div className="analysis-container p-6">
      <h1 className="text-3xl font-bold mb-6">Asset Analysis</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Your Current Assets</h2>
          {assets.length > 0 ? (
            <ul>
              {assets.map((asset, index) => {
                const isExpanded = expandedAssets[index];
                return (
                  <li
                    key={index}
                    className={`relative mb-4 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      isExpanded ? "h-auto" : "h-20 overflow-hidden"
                    }`}
                    onClick={() => toggleExpand(index)}
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {asset.asset.charAt(0).toUpperCase() +
                        asset.asset.slice(1)}
                    </h3>
                    <p>
                      Amount: {asset.amount} {getUnitType(asset.asset)}
                    </p>
                    {asset.asset === "gold" && asset.state && (
                      <>
                        <p>
                          Gold Rate (24K per 10g): ₹{getGoldRate(asset.state)}
                        </p>
                        <p>
                          Total Value: ₹
                          {calculateGoldValue(
                            asset.amount,
                            getGoldRate(asset.state)
                          )}
                        </p>
                      </>
                    )}
                    <p
                      onMouseEnter={(e) =>
                        handleMouseEnter(asset.asset, "liquidity", e)
                      }
                      onMouseLeave={handleMouseLeave}
                      className="relative inline-block"
                    >
                      Liquidity: {assetInfo[asset.asset]?.liquidity}
                    </p>
                    <br />
                    <p
                      onMouseEnter={(e) =>
                        handleMouseEnter(asset.asset, "risk", e)
                      }
                      onMouseLeave={handleMouseLeave}
                      className="relative inline-block"
                    >
                      Risk: {assetInfo[asset.asset]?.risk}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      {assetInfo[asset.asset]?.details}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No assets to analyze.</p>
          )}
          {tooltipData.content &&
            renderTooltip(
              tooltipData.content.assetType,
              tooltipData.content.type
            )}
          <div className="investment-advisor mt-8">
            <h2 className="text-2xl font-semibold mb-4">Investment Selector</h2>
            <div className="flex flex-col mb-4">
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
            <div className="flex flex-col mb-4">
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
