tools = [
  {
    name: "Crypto Index Fund",
    description:
      "Diversify your crypto investing by building a market-cap or equi-weighted index",
    topic: "Investing",
    sub_topic: "Investment Optimization",
    status: 'on_vote',
    email: 'saulo@maybe.co',
  },
  {
    name: "Crypto market cap calculator",
    description:
      "Compare the price of cryptocurrency A with the market cap of cryptocurrency B",
    topic: "Investing",
    sub_topic: "Asset Tracking",
    status: 'on_vote',
    email: 'saulo@maybe.co',
  },
  {
    name: "Dividend calculator",
    description:
      "Calculate the dividend yield on a stock over a period of time",
    topic: "Investing",
    sub_topic: "Investment Optimization",
    status: 'on_vote',
    email: 'saulo@maybe.co',
  },
  {
    name: "Stock Analyzer",
    description:
      "Check out important metrics about a particular stock and play with the data as you wish.",
    topic: "Investing",
    sub_topic: "Investment Performance",
    status: 'on_vote',
    email: 'saulo@maybe.co',
  },
]

tools.each do |tool|
  Tool.create(tool)
end
