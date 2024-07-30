import React, { useState } from "react";

const Input = () => {
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [selections, setSelections] = useState([]);
  const [step, setStep] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);

  const availableAssets = ["gold", "silver", "real-estate"];
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the amount is a positive number
    if (amount <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }
    if (editingIndex !== null) {
      const updatedSelections = [...selections];
      updatedSelections[editingIndex] = { asset, amount };
      setSelections(updatedSelections);
      setEditingIndex(null);
    } else {
      setSelections([...selections, { asset, amount }]);
    }
    setAsset("");
    setAmount("");
    setStep(1);
  };

  const handleEdit = (index) => {
    setAsset(selections[index].asset);
    setAmount(selections[index].amount);
    setEditingIndex(index);
    setStep(2);
  };

  const handleDelete = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
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
          {step === 2 && (
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-800 text-sm font-bold mb-2"
              >
                Enter Amount (
                {asset === "gold" || asset === "silver" ? "kg" : "units"})
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
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={step !== 2}
          >
            {editingIndex !== null ? "Update Asset" : "Add Asset"}
          </button>
        </form>

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
                      selection.asset.slice(1)}
                    : {selection.amount}{" "}
                    {selection.asset === "gold" || selection.asset === "silver"
                      ? "kg"
                      : "units"}
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

export default Input;
