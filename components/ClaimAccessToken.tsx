import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useAccessTokenMint from "../hooks/useAccessTokenMint";

type ClaimAccessTokenProps = {
  tokenAddress: string;
};

const ClaimAccessToken = ({ tokenAddress }: ClaimAccessTokenProps) => {
  const { account } = useWeb3React<Web3Provider>();

  return <button><span>Claim</span></button>;
};

export default ClaimAccessToken;
