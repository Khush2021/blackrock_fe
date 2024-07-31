import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assetInfo } from "./assetInfo";

const Comparison = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentAsset } = location.state;

  const [suggestedAsset, setSuggestedAsset] = useState(null);

  useEffect(() => {
    const findSuitableAsset = () => {
      const excludedAssets = ["cash", "gold", "real-estate"]; // Lowercase to match assetInfo keys
      const preferredAssets = [
        "stocks",
        "fixed-deposit",
        "bonds",
        "mutual-funds",
      ]; // Extend this list as needed

      // Filter assets to include only preferred assets that are not excluded
      const eligibleAssets = Object.keys(assetInfo).filter(
        (key) => !excludedAssets.includes(key) && preferredAssets.includes(key)
      );

      let suggestion = null;
      // Find the first eligible asset that contrasts with the current asset's liquidity and risk
      for (const key of eligibleAssets) {
        if (
          assetInfo[key].liquidity !==
            assetInfo[currentAsset.asset].liquidity ||
          assetInfo[key].risk !== assetInfo[currentAsset.asset].risk
        ) {
          suggestion = { ...assetInfo[key], name: key };
          break;
        }
      }

      // Fallback if no preferred and eligible asset is found
      if (!suggestion && eligibleAssets.length) {
        suggestion = {
          ...assetInfo[eligibleAssets[0]],
          name: eligibleAssets[0],
        };
      }

      setSuggestedAsset(suggestion);
    };

    findSuitableAsset();
  }, [currentAsset.asset]);

  if (!suggestedAsset)
    return <div className="text-center mt-5">Loading suggestions...</div>;

  const calculateFutureValue = (amount, rate, years) => {
    return (amount * Math.pow(1 + rate / 100, years)).toFixed(2);
  };

  if (!suggestedAsset)
    return (
      <div className="text-center mt-5">
        No suitable asset found for comparison.
      </div>
    );

  const currentAssetFutureValue = calculateFutureValue(
    currentAsset.amount,
    currentAsset.returnRate, // Ensure currentAsset includes returnRate
    5 // Number of years to project
  );

  const suggestedAssetFutureValue = calculateFutureValue(
    currentAsset.amount,
    suggestedAsset.returnRate, // Ensure suggestedAsset includes returnRate
    5 // Number of years to project
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Asset Comparison</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="asset-info p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Your Asset: {currentAsset.name}
          </h2>
          <p>Current Value: ₹{currentAsset.amount}</p>
          <p>Liquidity: {assetInfo[currentAsset.asset].liquidity}</p>
          <p>Risk: {assetInfo[currentAsset.asset].risk}</p>
          <p>Estimated Value after 5 years: ₹{currentAssetFutureValue}</p>
        </div>
        <div className="asset-info p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Suggested Asset: {suggestedAsset.name}
          </h2>
          <p>Current Value: ₹{currentAsset.amount}</p>
          <p>Liquidity: {suggestedAsset.liquidity}</p>
          <p>Risk: {suggestedAsset.risk}</p>
          <p>Estimated Value after 5 years: ₹{suggestedAssetFutureValue}</p>
        </div>
      </div>
      <button
        className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        onClick={() =>
          navigate("/detailed-comparison", {
            state: { currentAsset, suggestedAsset },
          })
        }
      >
        Compare with Suggested Asset
      </button>
    </div>
  );
};

export default Comparison;
