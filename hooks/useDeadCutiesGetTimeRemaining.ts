import useSWR from "swr";
import type { TheDeadCuties } from "../contracts/types";

async function GetTimeLeft(contract: TheDeadCuties, address: string) {
  let timeDeposited = await contract.timeAccessTokenDeposited(address);
  const time = Date.now() / 1000;
  let numbertimeDeposited = Number(timeDeposited) + 600;

  const res = Math.floor(numbertimeDeposited - time);

  return res;
}

export default function useDeadCutiesGetTimeRemaining(contract: TheDeadCuties, address: string) {
  const result = GetTimeLeft(contract, address);

  return result;
}
