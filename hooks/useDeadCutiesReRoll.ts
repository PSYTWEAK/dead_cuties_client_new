import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";

async function mintDeadCuties(contract: TheDeadCuties, tokenId: number) {
  const res = await contract.reRoll(tokenId);

  return res;
}

export default function useDeadCutiesMint(contract: TheDeadCuties, tokenId: number) {
  const result = mintDeadCuties(contract, tokenId);

  return result;
}
