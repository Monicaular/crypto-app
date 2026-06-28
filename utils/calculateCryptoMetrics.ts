import { CoinType } from "@/types/coin";

export function calculateCryptoMetrics(coin: CoinType) {
  const volumePercentage =
    coin.market_cap && coin.market_cap > 0
      ? Math.min(Math.round((coin.total_volume / coin.market_cap) * 100), 100)
      : 0;
  const supplyPercentage =
    coin.total_supply && coin.total_supply > 0
      ? Math.min(
          Math.round((coin.circulating_supply / coin.total_supply) * 100),
          100,
        )
      : 0;
  return { volumePercentage, supplyPercentage };
}
