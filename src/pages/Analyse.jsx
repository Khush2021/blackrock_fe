import React from "react";
import { useLocation } from "react-router-dom";

const Analyse = () => {
  const location = useLocation();
  const { assets } = location.state;

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-gray-800 text-lg font-bold mb-2">Asset Analysis</h2>
      {assets.length > 0 ? (
        <ul>
          {assets.map((asset, index) => (
            <li key={index}>
              {asset.asset.charAt(0).toUpperCase() + asset.asset.slice(1)}:{" "}
              {asset.amount} {getUnitType(asset.asset)}
              {asset.asset === "gold" && asset.state
                ? ` - State: ${asset.state}`
                : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assets to analyze.</p>
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
