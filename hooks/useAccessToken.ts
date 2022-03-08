import ACCESS_TOKEN_ABI from "../contracts/AccessToken.json";
import type { AccessToken } from "../contracts/types";
import useContract from "./useContract";

export default function useAccessToken(tokenAddress?: string) {
  return useContract<AccessToken>(tokenAddress, ACCESS_TOKEN_ABI);
}
