import useSWR from "swr";
import type { AccessToken } from "../contracts/types";
import { BytesLike } from "ethers";
import Merkletree from "./merkle/Merkletree.json";


async function mintAccessToken(contract: AccessToken, proof: BytesLike[]) {
  const res = await contract.mint(proof);

  return res;
}

function getProof(address: string): BytesLike[] {
  let proof = Merkletree[address];

  console.log(proof)

  return proof;
}

export default function useAccessTokenMint(address: string, contract: AccessToken) {
  const proof = getProof(address);

  const result = mintAccessToken(contract, proof);

  return result;
}
