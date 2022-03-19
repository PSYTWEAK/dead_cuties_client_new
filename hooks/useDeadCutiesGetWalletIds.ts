import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";

async function mintDeadCuties(contract: TheDeadCuties, address: string) {
  const res = await contract.walletOfOwner(address);

  return res;
}

export default function useDeadCutiesMint(contract: TheDeadCuties, address: string) {
  const result = mintDeadCuties(contract, address);

  return result;
}
