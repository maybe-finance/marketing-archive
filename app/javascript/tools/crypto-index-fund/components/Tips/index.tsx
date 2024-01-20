import React from "react";

import { TipCard } from "../../../../components/tip-card";

export default function Tips(): JSX.Element {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <TipCard
        title="Crypto as an asset class"
        icon={<i className="bg-orange text-orange ri-bit-coin-line" />}
      >
        Cryptocurrencies can be used to diversify your portfolio along with
        asset classes like stocks, bonds, real estate, and gold. Since it is in
        the early stages of adoption, crypto can serve as the high-risk,
        high-reward component of your overall portfolio. It also has a low
        correlation with equities, gold, oil and bond returns (especially in the
        last few years).
      </TipCard>
      <TipCard
        title="Remove unsystematic risk"
        icon={<i className="bg-red text-red ri-apps-2-line" />}
      >
        Our crypto index fund tool provides you with presets that contain a
        basket of cryptocurrencies (weighted by market cap or equi-weighted),
        that you can model your crypto portfolio around. You can also regulate
        and manage your risk/reward expectations and reduce the risks associated
        with a particular crypto project by diversifying across several
        cryptocurrencies. Diversification removes all individual risks and
        leaves behind only market risk that cannot be diversified away.
      </TipCard>
      <TipCard
        title="DeFi, NFTs or the Metaverse"
        icon={<i className="bg-teal text-teal ri-copper-coin-line" />}
      >
        Take a bet on emerging technologies like DeFi, NFT's, or the Metaverse
        by using the crypto index fund tool to view specific indexes that
        represent the top crypto projects in each category. This is similar to
        ETFs in the stock market that bet on a particular sector doing well in
        the future.
      </TipCard>
    </div>
  );
}
