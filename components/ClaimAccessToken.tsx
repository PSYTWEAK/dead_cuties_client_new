import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useAccessTokenMint from "../hooks/useAccessTokenMint";
import type { AccessToken } from "../contracts/types";
import useMerkleTree from "../hooks/useMerkleTree";
import { BytesLike } from "ethers";
import useTokenBalance from "../hooks/useTokenBalance";

type ClaimAccessTokenProps = {
  contract: AccessToken;
};

const mint = (account: string, contract: AccessToken, merkleProof: BytesLike[] ) => {
  useAccessTokenMint(account, contract);
}

const ClaimAccessToken = ({ contract }: ClaimAccessTokenProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const merkleProof = useMerkleTree(account);
  const balance = useTokenBalance(account, contract.address);

  if (merkleProof) {
    return <button onClick={() => mint(account, contract, merkleProof)}><span>Claim</span></button>;
  } else {
    return <p>Nothing to claim</p>
  }

};

export default ClaimAccessToken;
