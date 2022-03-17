import useSWR from "swr";
import type { AccessToken } from "../contracts/types";
import { BytesLike } from "ethers";
import Merkletree from "./merkle/Merkletree.json";


export default function useMerkleTree(address: string): BytesLike[] {
    let proof = Merkletree[address];
  
    return proof;
  }