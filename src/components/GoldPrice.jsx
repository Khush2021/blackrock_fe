import React, { useEffect } from "react";
import axios from "axios";

const GoldPrice = () => {
  const options = {
    method: "GET",
    url: "https://gold-rates-india.p.rapidapi.com/api/gold-prediction",
    params: { type: "monthly" },
    headers: {
      "x-rapidapi-key": "22c7c9965dmshee34e92ddc71ad8p12bbd1jsn69e070fb2ce4",
      "x-rapidapi-host": "gold-rates-india.p.rapidapi.com",
    },
  };

  const fetchPrices = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPrices();
  }, []);
  return <div>hello world</div>;
};

export default GoldPrice;
