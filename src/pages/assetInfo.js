// assetInfo.js
export const assetInfo = {
  cash: {
    liquidity: "Very High",
    risk: "Very Low",
    details:
      "Cash and cash equivalents are the most liquid assets and can be quickly converted to cash. They have very low risk but also low returns.",
  },
  gold: {
    liquidity: "High",
    risk: "Medium",
    details:
      "Gold is a highly liquid asset in India due to its cultural significance and established markets. It can be quickly sold at market rates through jewelers or financial institutions. Gold prices can fluctuate based on market demand and economic conditions.",
  },
  stocks: {
    liquidity: "High",
    risk: "High",
    details:
      "Stocks listed on major exchanges can be sold quickly, though liquidity may vary for smaller companies. They have high risk due to market volatility but potential for high returns.",
  },
  "real-estate": {
    liquidity: "Low",
    risk: "Medium",
    details:
      "Real estate in India is generally illiquid due to high transaction costs, long sale processes, and regulatory hurdles. Market conditions significantly impact liquidity. It has medium risk with potential for long-term appreciation.",
  },
  "fixed-deposit": {
    liquidity: "Moderate",
    risk: "Low",
    details:
      "Fixed deposits offer moderate liquidity as they can be withdrawn before maturity, often with a penalty. They have low risk and guaranteed returns, but the returns are typically lower than more risky investments.",
  },
};

export const tooltipContent = {
  gold: {
    liquidity: [
      {
        title: "Marketability",
        value: "High",
        details: "Widely accepted and easily sold in various markets.",
      },
      {
        title: "Transaction Costs",
        value: "Medium",
        details:
          "Costs associated with buying and selling gold, including dealer margins.",
      },
      {
        title: "Price Stability",
        value: "Medium",
        details: "Subject to market fluctuations, but generally stable.",
      },
      {
        title: "Time to Sale",
        value: "Low",
        details: "Can be sold relatively quickly.",
      },
    ],
    risk: [
      {
        title: "Volatility",
        value: "Medium",
        details:
          "Prices can fluctuate based on market demand and economic conditions.",
      },
      {
        title: "Credit Risk",
        value: "Very Low",
        details: "As a physical asset, gold does not have credit risk.",
      },
      {
        title: "Market Risk",
        value: "Medium",
        details:
          "Sensitive to changes in market sentiment and economic factors.",
      },
      {
        title: "Liquidity Risk",
        value: "Low",
        details: "Generally easy to sell, but price may vary.",
      },
    ],
  },
  cash: {
    liquidity: [
      {
        title: "Marketability",
        value: "Very High",
        details:
          "Easily convertible to cash or used directly for transactions.",
      },
      {
        title: "Transaction Costs",
        value: "Very Low",
        details: "Minimal or no transaction costs.",
      },
      {
        title: "Price Stability",
        value: "Very High",
        details: "Always valued at face value.",
      },
      {
        title: "Time to Sale",
        value: "Very Low",
        details: "Instant access to funds.",
      },
    ],
    risk: [
      {
        title: "Volatility",
        value: "Very Low",
        details:
          "Very stable, as the value is constant and not subject to market fluctuations.",
      },
      {
        title: "Credit Risk",
        value: "Very Low",
        details:
          "Typically insured (e.g., FDIC insurance in the US) or backed by the government.",
      },
      {
        title: "Market Risk",
        value: "Very Low",
        details: "Not affected by market movements.",
      },
      {
        title: "Liquidity Risk",
        value: "Very Low",
        details: "Immediate access to funds with no risk of loss.",
      },
    ],
  },
  "real-estate": {
    liquidity: [
      {
        title: "Marketability",
        value: "Low",
        details: "Property sales can be challenging and time-consuming.",
      },
      {
        title: "Transaction Costs",
        value: "High",
        details: "Includes legal fees, agent fees, and taxes.",
      },
      {
        title: "Price Stability",
        value: "Medium",
        details: "Market conditions can cause fluctuations.",
      },
      {
        title: "Time to Sale",
        value: "High",
        details: "Sale process can take months.",
      },
    ],
    risk: [
      {
        title: "Volatility",
        value: "Low to Medium",
        details:
          "Generally less volatile than stocks but can be affected by economic conditions and market demand.",
      },
      {
        title: "Credit Risk",
        value: "Low to Medium",
        details: "Risk associated with property values and mortgage payments.",
      },
      {
        title: "Market Risk",
        value: "Medium",
        details: "Market conditions and property location affect value.",
      },
      {
        title: "Liquidity Risk",
        value: "High",
        details: "Selling real estate can be time-consuming and costly.",
      },
    ],
  },
};
