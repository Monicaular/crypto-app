export interface GlobalDataType {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: {
        usd: number;
    }
    total_volume: {
        usd: number;
    }
    market_cap_percentage: {
        btc: number;
        eth: number;
    }
    market_cap_change_percentage_24h_usd: number;
    volume_change_percentage_24h_usd: number;
    updated_at: Date;
}