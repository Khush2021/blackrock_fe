// Comparison.js
import React from "react";
import { useLocation } from "react-router-dom";
import { assetInfo } from "./assetInfo";

const Comparison = () => {
  const location = useLocation();
  const { currentAsset, suggestedAsset } = location.state;

  const calculateFutureValue = (amount, rate, years) => {
    return (amount * Math.pow(1 + rate / 100, years)).toFixed(2);
  };

  const currentAssetFutureValue = calculateFutureValue(
    currentAsset.amount,
    8,
    5
  ); // Assuming 8% return for 5 years
  const suggestedAssetFutureValue = calculateFutureValue(
    currentAsset.amount,
    6,
    5
  ); // Assuming 6% return for 5 years

  return (
    <div className="comparison-container p-6">
      <h1 className="text-3xl font-bold mb-6">Asset Comparison</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="current-asset">
          <h2 className="text-2xl font-semibold mb-4">
            Your Asset: {currentAsset.asset}
          </h2>
          <p>Current Value: ₹{currentAsset.amount}</p>
          <p>Liquidity: {assetInfo[currentAsset.asset].liquidity}</p>
          <p>Risk: {assetInfo[currentAsset.asset].risk}</p>
          <p>Estimated Value after 5 years: ₹{currentAssetFutureValue}</p>
        </div>
        <div className="suggested-asset">
          <h2 className="text-2xl font-semibold mb-4">
            Suggested Asset: {suggestedAsset.name}
          </h2>
          <p>Current Value: ₹{currentAsset.amount}</p>
          <p>Liquidity: {suggestedAsset.liquidity}</p>
          <p>Risk: {suggestedAsset.risk}</p>
          <p>Estimated Value after 5 years: ₹{suggestedAssetFutureValue}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Comparison Analysis</h3>
        <p>
          Your {currentAsset.asset} has{" "}
          {assetInfo[currentAsset.asset].liquidity} liquidity and{" "}
          {assetInfo[currentAsset.asset].risk} risk, while {suggestedAsset.name}{" "}
          offers {suggestedAsset.liquidity} liquidity and {suggestedAsset.risk}{" "}
          risk.
        </p>
        <p className="mt-2">
          If you invest ₹{currentAsset.amount} in each for 5 years:
          <br />- Your {currentAsset.asset} might grow to ₹
          {currentAssetFutureValue}
          <br />- The same amount in {suggestedAsset.name} might grow to ₹
          {suggestedAssetFutureValue}
        </p>
        <p className="mt-2">
          Consider diversifying your portfolio by including{" "}
          {suggestedAsset.name} to balance your risk and improve liquidity.
        </p>
      </div>
    </div>
  );
};

export default Comparison;
