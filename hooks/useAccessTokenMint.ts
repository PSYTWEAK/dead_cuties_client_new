import useSWR from "swr";
import type { AccessToken } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useAccessToken from "./useAccessToken";
import { BytesLike } from "ethers";

async function mintAccessToken(contract: AccessToken, proof: BytesLike[]) {
  const res = await contract.mint(proof);

  return res;
}

function getProof(address: string): BytesLike[] {
  return ["0x4r34rf43f", "0x7374hr84"];
}

export default function useAccessTokenMint(address: string, tokenAddress: string, suspense = false) {
  const proof = getProof(address);
  const contract = useAccessToken(tokenAddress);

  const result = mintAccessToken(contract, proof);

  return result;
}
