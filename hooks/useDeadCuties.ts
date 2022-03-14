import DEAD_CUTIES_ABI from "../contracts/TheDeadCuties.json";
import type { TheDeadCuties } from "../contracts/types";
import useContract from "./useContract";

export default function useDeadCuties(nftAddress?: string) {
  return useContract<TheDeadCuties>(nftAddress, DEAD_CUTIES_ABI);
}
