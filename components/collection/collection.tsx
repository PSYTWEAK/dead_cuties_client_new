import NFTImages from "../../data/nft-collection"

console.log('> NFTImages');
console.log(NFTImages);

function Collection() {
    return (
        <div className="collection">
            <div className="collection__top">
            </div>
            <div className="collection__grid">
                {
                    NFTImages.map((NFT, idx) => {
                        return (
                            <div key={idx} className="collection__grid-item">
                                <img src={NFT} />
                                <button>
                                    Reroll
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Collection;