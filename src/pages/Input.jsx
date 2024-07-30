import React, { useState } from "react";

const Input = () => {
  const [asset, setAsset] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label
            htmlFor="choose-asset"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Choose Asset
          </label>
          <select
            id="choose-asset"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an asset</option>
            <option value="gold">Gold</option>
            <option value="real-estate">Real Estate</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
