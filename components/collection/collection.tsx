import NFTImages from "../../data/nft-collection";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useDeadCutiesReRoll from "../../hooks/useDeadCutiesReRoll";
import useDeadCutiesGetWalletIds from "../../hooks/useDeadCutiesGetWalletIds";
import { useWeb3React } from "@web3-react/core";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function Collection({ startTimer, baseURI, deadCutiesContract, numOfStateChanges, setNumOfStateChange }) {
  const [links, setLinks] = useState([]);
  const [arrayOfNFTIDs, setArrayOfNFTIDs] = useState([]);
  const { account } = useWeb3React();
  const [counter, setCounter] = useState(0);

  const ReRoll = async (contract, id) => {
    await useDeadCutiesReRoll(contract, id);
    await delay(3000);
    setNumOfStateChange(Math.random());
  };

  const GetLinks = async () => {
    if (account) {
      try {
        let _arrayOfNFTIDs = await _GetWalletIds();
        let _links = [];
        if (counter < 4) {
          setCounter(counter + 1);
        }
        for (let i = 0; i < arrayOfNFTIDs.length; i++) {
          _links.push(await getImageLink(`https://ipfs.io/ipfs/${baseURI}/${arrayOfNFTIDs[i]}`));
        }
        setLinks(_links);
        setArrayOfNFTIDs(_arrayOfNFTIDs);
      } catch (err) {
        console.log(err);
      }
      await delay(10000);
      setNumOfStateChange(Math.random());
    }
  };
  const _GetWalletIds = async function () {
    return await useDeadCutiesGetWalletIds(deadCutiesContract, account);
  };

  const getImageLink = async (metaDataLink) => {
    let imageLink = "";
    await fetch(metaDataLink)
      .then((res) => res.json())
      .then(
        (result) => {
          imageLink = `https://ipfs.io/ipfs/${result.image.substring(7)}/`;
        },
        (error) => {
          console.log(error);
          return "";
        }
      );
    return imageLink;
  };

  useEffect(() => {
    GetLinks();
  }, [counter, account, numOfStateChanges]);

  return (
    <div className="collection">
      <div className="collection__top"></div>
      <h2>Your DeadCuties</h2>
      <div className="collection__grid">
        {links.map((link, i) => {
          if (link) {
            return (
              <div key={i} className="collection__grid-item">
                <img alt={"image"} src={link} width="350" height="350" />
                {startTimer !== null && (
                  <button
                    onClick={() => {
                      ReRoll(deadCutiesContract, arrayOfNFTIDs[i]);
                    }}
                  >
                    Reroll (0.015 ETH)
                  </button>
                )}
              </div>
            );
          } else {
            return <a></a>;
          }
        })}
      </div>
    </div>
  );
}

export default Collection;
