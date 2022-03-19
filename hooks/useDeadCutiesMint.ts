import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";

async function mintDeadCuties(contract: TheDeadCuties, amount: number, price: number) {
  const res = await contract.mint(amount, { value: price });

  return res;
}

export default function useDeadCutiesMint(contract: TheDeadCuties, amount: number, price: number) {
  const result = mintDeadCuties(contract, amount, price);

  return result;
}
