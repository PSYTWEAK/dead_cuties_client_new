import useSWR from "swr";
import type { AccessToken } from "../contracts/types";
import { BytesLike } from "ethers";
import Merkletree from "./merkle/Merkletree.json";


async function mintAccessToken(contract: AccessToken, proof: BytesLike[]) {
  const res = await contract.mint(proof);

  return res;
}

export default function useAccessTokenMint(contract: AccessToken, merkleProof: BytesLike[]) {
  const result = mintAccessToken(contract, merkleProof);

  return result;
}
