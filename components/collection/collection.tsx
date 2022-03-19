import NFTImages from "../../data/nft-collection";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { Tween, Timeline } from "react-gsap";
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";

function Collection({ baseURI, arrayOfNFTIDs }) {
  const [links, setLinks] = useState([]);
  const ids = [0, 1, 2, 3, 4];

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = async () => {
    let _links = [];
    for (let i = 0; i < ids.length; i++) {
      _links.push(await getImageLink(`https://ipfs.io/ipfs/${baseURI}/${ids[i]}`));
    }

    setLinks(_links);
  };

  const getImageLink = async (metaDataLink) => {
    let imageLink = "";
    await fetch(metaDataLink)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(`https://ipfs.io/${result.image.substring(7)}/`);
          imageLink = `https://ipfs.io/ipfs/${result.image.substring(7)}/`;
        },
        (error) => {
          console.log(error);
          return "";
        }
      );
    return imageLink;
  };

  return (
    <div className="collection">
      <div className="collection__top"></div>
      <div className="collection__grid">
        {links &&
          links.map((link, i) => {
            if (link) {
              return (
                <div key={link} className="collection__grid-item">
                  <Image alt={"image"} src={link} width={512} height={512} quality={80} />
                  <button onClick={() => console.log(i)}>Reroll</button>
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
