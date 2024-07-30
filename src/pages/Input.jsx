import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [principal, setPrincipal] = useState("");
  const [totalTerm, setTotalTerm] = useState("");
  const [elapsedTerm, setElapsedTerm] = useState("");
  const [selections, setSelections] = useState([]);
  const [step, setStep] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedState, setSelectedState] = useState("");

  const navigate = useNavigate();
  const availableAssets = ["Gold", "Fixed Deposits", "Real-Estate", "Cash"];

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

  const handlePrincipalChange = (e) => {
    setPrincipal(e.target.value);
  };

  const handleTotalTermChange = (e) => {
    setTotalTerm(e.target.value);
  };

  const handleElapsedTermChange = (e) => {
    setElapsedTerm(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= 0 && asset !== "Fixed Deposits") {
      alert("Amount must be greater than zero.");
      return;
    }
    if (
      asset === "Fixed Deposits" &&
      (parseFloat(principal) <= 0 ||
        parseFloat(totalTerm) <= 0 ||
        parseFloat(elapsedTerm) < 0)
    ) {
      alert("Please provide valid inputs for fixed deposits.");
      return;
    }
    const newSelection =
      asset === "Fixed Deposits"
        ? { asset, principal, totalTerm, elapsedTerm }
        : { asset, amount, state: selectedState };
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
    setPrincipal("");
    setTotalTerm("");
    setElapsedTerm("");
    setSelectedState("");
    setStep(1);
  };

  const handleEdit = (index) => {
    const selection = selections[index];
    setAsset(selection.asset);
    if (selection.asset === "Fixed Deposits") {
      setPrincipal(selection.principal);
      setTotalTerm(selection.totalTerm);
      setElapsedTerm(selection.elapsedTerm);
    } else {
      setAmount(selection.amount);
      setSelectedState(selection.state || "");
    }
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
          {step === 2 && asset !== "Fixed Deposits" && (
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
          {step === 2 && asset === "Fixed Deposits" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="principal"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Enter Principal Amount (INR)
                </label>
                <input
                  type="number"
                  id="principal"
                  value={principal}
                  onChange={handlePrincipalChange}
                  className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="total-term"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Enter Total Term (months)
                </label>
                <input
                  type="number"
                  id="total-term"
                  value={totalTerm}
                  onChange={handleTotalTermChange}
                  className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="elapsed-term"
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Enter Elapsed Term (months)
                </label>
                <input
                  type="number"
                  id="elapsed-term"
                  value={elapsedTerm}
                  onChange={handleElapsedTermChange}
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
                    : {selection.amount || selection.principal}{" "}
                    {selection.asset === "Fixed Deposits"
                      ? `Principal, Total Term: ${selection.totalTerm} months, Elapsed Term: ${selection.elapsedTerm} months`
                      : getUnitType(selection.asset)}{" "}
                    {selection.state ? `(${selection.state})` : ""}
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
  return "";
}

export default Input;
