import NFTImages from "../../data/nft-collection";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useDeadCutiesReRoll from "../../hooks/useDeadCutiesReRoll";
import useDeadCutiesGetWalletIds from "../../hooks/useDeadCutiesGetWalletIds";
import { useWeb3React } from "@web3-react/core";

function Collection({ baseURI, deadCutiesContract }) {
  const [links, setLinks] = useState([]);
  const [arrayOfNFTIDs, setArrayOfNFTIDs] = useState([]);
  const { account } = useWeb3React();

  const getLinks = async () => {
    console.log(account);
    console.log(deadCutiesContract);
    if (account) {
      try {
        let _arrayOfNFTIDs = await useDeadCutiesGetWalletIds(deadCutiesContract, account);
        let _links = [];

        console.log(arrayOfNFTIDs.length, " length");
        console.log(arrayOfNFTIDs);
        for (let i = 0; i < arrayOfNFTIDs.length; i++) {
          _links.push(await getImageLink(`https://ipfs.io/ipfs/${baseURI}/${arrayOfNFTIDs[i]}`));
        }
        setLinks(_links);
        setArrayOfNFTIDs(_arrayOfNFTIDs);
      } catch (err) {
        console.log(err);
      }
    }
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
    getLinks();
  }, []);

  return (
    <div className="collection">
      <div className="collection__top"></div>
      <h2>Your DeadCuties</h2>
      <div className="collection__grid">
        {links.map((link, i) => {
          if (link) {
            return (
              <div key={link} className="collection__grid-item">
                <Image alt={"image"} src={link} layout="responsive" width="200" height="200" quality={80} />
                <button onClick={() => useDeadCutiesReRoll(deadCutiesContract, arrayOfNFTIDs[i])}>Reroll (0.015 ETH)</button>
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
