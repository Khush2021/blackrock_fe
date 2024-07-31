import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [selections, setSelections] = useState([]);
  const [step, setStep] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [elapsedTime, setElapsedTime] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const navigate = useNavigate();
  const availableAssets = ["gold", "real-estate", "cash", "fixed-deposit"];
  const cities = [
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Delhi NCR",
    "Hyderabad",
    "Kolkata",
    "Pune",
  ];

  const goldStates = [
    "Uttar Pradesh",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "West Bengal",
  ];

  const remainingAssets = availableAssets.filter(
    (availableAsset) =>
      !selections.some((selection) => selection.asset === availableAsset)
  );

  const handleAssetChange = (e) => {
    setAsset(e.target.value);
    setStep(2);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleTotalTimeChange = (e) => {
    setTotalTime(e.target.value);
  };

  const handleElapsedTimeChange = (e) => {
    setElapsedTime(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSelection = {
      asset,
      amount: asset === "real-estate" ? "" : amount,
      state: asset === "gold" ? selectedState : "",
      totalTime: asset === "fixed-deposit" ? totalTime : "",
      elapsedTime: asset === "fixed-deposit" ? elapsedTime : "",
      city: asset === "real-estate" ? city : "",
      area: asset === "real-estate" ? area : "",
    };
    if (editingIndex !== null) {
      const updatedSelections = [...selections];
      updatedSelections[editingIndex] = newSelection;
      setSelections(updatedSelections);
      setEditingIndex(null);
    } else {
      setSelections([...selections, newSelection]);
    }
    setAsset("");
    setAmount("");
    setSelectedState("");
    setTotalTime("");
    setElapsedTime("");
    setCity("");
    setArea("");
    setStep(1);
  };

  const handleEdit = (index) => {
    const selection = selections[index];
    setAsset(selection.asset);
    setAmount(selection.amount);
    setSelectedState(selection.state || "");
    setTotalTime(selection.totalTime || "");
    setElapsedTime(selection.elapsedTime || "");
    setCity(selection.city || "");
    setArea(selection.area || "");
    setEditingIndex(index);
    setStep(2);
  };

  const handleDelete = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };

  const handleAnalyze = () => {
    navigate("/analyse", { state: { assets: selections } });
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-lg mb-4"
        >
          {step === 1 && (
            <div className="mb-4">
              <label
                htmlFor="choose-asset"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Choose Asset
              </label>
              <select
                id="choose-asset"
                value={asset}
                onChange={handleAssetChange}
                className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an asset</option>
                {remainingAssets.map((availableAsset) => (
                  <option key={availableAsset} value={availableAsset}>
                    {availableAsset.charAt(0).toUpperCase() +
                      availableAsset.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
          {step === 2 && asset === "gold" && (
            <div className="mb-4">
              <label
                htmlFor="state-select"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Select State
              </label>
              <select
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
                className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a state</option>
                {goldStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}
          {step === 2 && asset !== "real-estate" && (
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Enter Amount ({getUnitType(asset)})
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          {step === 2 && asset === "fixed-deposit" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="total-time"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Total Time (in months)
                </label>
                <input
                  type="number"
                  id="total-time"
                  value={totalTime}
                  onChange={handleTotalTimeChange}
                  className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="elapsed-time"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Elapsed Time (in months)
                </label>
                <input
                  type="number"
                  id="elapsed-time"
                  value={elapsedTime}
                  onChange={handleElapsedTimeChange}
                  className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          )}
          {step === 2 && asset === "real-estate" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  City
                </label>
                <select
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                  className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="area"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Area (in sqft)
                </label>
                <input
                  type="number"
                  id="area"
                  value={area}
                  onChange={handleAreaChange}
                  className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={step !== 2}
          >
            {editingIndex !== null ? "Update Asset" : "Add Asset"}
          </button>
        </form>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAnalyze}
        >
          Analyze Assets
        </button>
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-gray-800 text-lg font-bold mb-2">
            Selected Assets
          </h2>
          {selections.length > 0 ? (
            <ul className="mb-4">
              {selections.map((selection, index) => (
                <li
                  key={index}
                  className="mb-2 flex justify-between items-center"
                >
                  <div>
                    {selection.asset.charAt(0).toUpperCase() +
                      selection.asset.slice(1)}{" "}
                    : {selection.amount} {getUnitType(selection.asset)}{" "}
                    {selection.state ? `(${selection.state})` : ""}
                    {selection.totalTime
                      ? ` - Total Time: ${selection.totalTime} months`
                      : ""}
                    {selection.elapsedTime
                      ? ` - Elapsed Time: ${selection.elapsedTime} months`
                      : ""}
                    {selection.city ? ` - City: ${selection.city}` : ""}
                    {selection.area ? ` - Area: ${selection.area} sqft` : ""}
                  </div>
                  <div>
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-800">No assets selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

function getUnitType(asset) {
  if (asset === "gold") return "grams";
  if (asset === "real-estate") return "units";
  if (asset === "cash") return "INR";
  if (asset === "fixed-deposit") return "INR";
  return "";
}

export default Input;
