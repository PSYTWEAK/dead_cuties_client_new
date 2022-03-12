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

const mint = (contract: AccessToken, merkleProof: BytesLike[] ) => {
  useAccessTokenMint( contract, merkleProof);
}

const ClaimAccessToken = ({ contract }: ClaimAccessTokenProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const merkleProof = useMerkleTree(account);
  let { data } = useTokenBalance(account, contract.address);

  let balance;
  if (data) {
    balance = data.toString();
  } else {
    balance = "0"
  }

  if (merkleProof) {
    if (balance === "1") {
       return <a></a>
    } else {
       return <button onClick={() => mint(contract, merkleProof)}><span>Claim</span></button>; 
    }

  } else {
    return <p>Nothing to claim</p>
  }

};

export default ClaimAccessToken;
