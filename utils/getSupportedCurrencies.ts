import { axiosClient } from "./axiosClient";
import { SupportedCurrencies } from "@/types/supportedCurrencies";

export async function getSupportedCurrencies(): Promise<SupportedCurrencies> {
  const response = await axiosClient.get<SupportedCurrencies>(
    "/simple/supported_vs_currencies",
  );

  const fiatOnly = response.data.filter((cur) => [
    "usd",
    "eur",
    "gbp",
    "cad",
    "aud",
    "chf",
    "jpy",
    "cny",
    "ron",
    "sek",
    "nok",
    "dkk",
    "pln",
    "huf",
    "czk",
    "nzd",
    "sgd",
    "zar",
    "ron",
    "inr",
    "brl",
    "mxn",
    "try",
    "rub",
    "krw",
  ].includes(cur));
  return fiatOnly;
}
