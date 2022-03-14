import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";
import { BytesLike } from "ethers";
import Merkletree from "./merkle/Merkletree.json";

async function mintDeadCuties(contract: TheDeadCuties, amount: number) {
  const res = await contract.mint(amount);

  return res;
}

export default function useDeadCutiesMint(contract: TheDeadCuties, amount: number) {
  const result = mintDeadCuties(contract, amount);

  return result;
}
