import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    timeout: 10000,
});
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 429) {
            return Promise.reject(new Error("Rate limit exceeded. Try again in a minute"));
        }
        if (error.response?.status >= 500) {
            return Promise.reject(new Error("CoinGecko is temporarily unavailable"));
        }
        if (error.response?.status === 404) {
            return Promise.reject(new Error("Resource not found"));
        }
        if (!error.response) {
            return Promise.reject(new Error("Network Error, Check your connection"));
        }
        return Promise.reject(error);
    }
);
