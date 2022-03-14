import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";

async function mintDeadCuties(contract: TheDeadCuties) {
  const res = await contract.depositAccessToken();

  return res;
}

export default function useDeadCutiesDepositAccessToken(contract: TheDeadCuties) {
  const result = mintDeadCuties(contract);

  return result;
}
