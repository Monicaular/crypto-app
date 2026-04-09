export interface CoinDetailType {
    id:string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    links: {
        homepage: string;
        blockchain_site: string[];
        official_forum_url: string[];
        subreddit_url: string;
        repos_url: {
            github: string[];
        }
    };
    
    description: {
        en: string;
    }
    market_data: {
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
        fully_diluted_valuation: {
            usd: number;
        };
        total_volume: {
            usd: number;
        };
        high_24h: {
            usd: number;
        };
        low_24h: {
            usd: number;
        };
        price_change_24h: number;
        price_change_percentage_24h: number;
        ath: {
            usd: number;
        };
        ath_date: {
            usd: string;
        };
        atl: {
            usd: number;
        }
        atl_date: {
            usd: string;
        }
        circulating_supply: number;
        total_supply: number | null;
        max_supply: number | null;
    };
    community_data: {
        facebook_likes: number | null;
        twitter_followers: number | null;
        reddit_average_posts_48h: number | null;
        reddit_average_comments_48h: number | null;
        reddit_subscribers: number | null;
    };
    developer_data: {
        forks: number;
        stars: number;
        subscribers: number;
        total_issues: number;
        closed_issues: number;
        pull_requests_merged: number;
        pull_request_contributors: number;
        commit_count_4_weeks: number;
    };
}