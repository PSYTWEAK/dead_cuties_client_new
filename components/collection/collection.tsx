import NFTImages from "../../data/nft-collection";

console.log("> NFTImages");
console.log(NFTImages);
const IPFS = require("ipfs");
const makeIpfsFetch = require("ipfs-fetch");

function Collection({ baseURI, arrayOfNFTIDs }) {
  const getImages = async () => {
    const ipfs = await IPFS.create();
    const fetch = await makeIpfsFetch({ ipfs });

    for (let i = 0; i > arrayOfNFTIDs.length; i++) {
      let response = await fetch("baseURI", arrayOfNFTIDs[i].toString());
      let imageLink = await response.image();
      let singleImage = await fetch(imageLink);
    }
  };

  return (
    <div className="collection">
      <div className="collection__top"></div>
      <div className="collection__grid">
        {NFTImages.map((NFT, idx) => {
          return (
            <div key={idx} className="collection__grid-item">
              <img src={NFT} />
              <button>Reroll</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Collection;
