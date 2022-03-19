import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";
import BigNumber from "@ethersproject/bignumber";

async function mintDeadCuties(contract: TheDeadCuties, amount: number, price: number) {
  const res = await contract.mint(amount, { value: (price * 10 ** 18).toString() });

  return res;
}

export default function useDeadCutiesMint(contract: TheDeadCuties, amount: number, price: number) {
  const result = mintDeadCuties(contract, amount, price);

  return result;
}
