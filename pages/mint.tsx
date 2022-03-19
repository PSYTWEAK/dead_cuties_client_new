import { useWeb3React } from "@web3-react/core";
import Lottie from "react-lottie";
import Head from "next/head";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import ClaimAccessToken from "../components/ClaimAccessToken";
import useEagerConnect from "../hooks/useEagerConnect";
import twinklingData from "../public/data/twinkling.json";

import lightning4 from "../public/assets/lightning_4.png";
import reaperSprite1 from "../public/assets/Reaper_Sprite_1.png";
import reaperSprite2 from "../public/assets/Reaper_Sprite_2.png";
import grave from "../public/assets/grave.png";
import ghost3 from "../public/assets/ghost_3.png";
import ghost4 from "../public/assets/ghost_4.png";
import tree from "../public/assets/tree.png";
import Person from "../components/platform/person/Person";
import Bubble from "../components/bubble/bubble";
import Collection from "../components/collection/collection";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { useState } from "react";
import useDeadCuties from "../hooks/useDeadCuties";
import useAccessToken from "../hooks/useAccessToken";
import useTokenBalance from "../hooks/useTokenBalance";
import useDeadCutiesGetWalletIds from "../hooks/useDeadCutiesGetWalletIds";

const ACCESS_TOKEN_ADDRESS = "0xc5ec6B520d589f6375dCc237965DE9E2702476F3";
const DEAD_CUTIES_ADDRESS = "0xb18d312584aCD645A0c8Bce1Cc8DD1b0aF074031";
const BASE_URI = "ipfs://bafybeihddbznstiikpjjnmawqw4ldlmoijtu6uvedzvrpwjwel25jtqnza/";

function Claim() {
  const [startTimer, setStartTimer] = useState(false);

  const [arrayOfNFTIDs, setArrayOfNFTIDs] = useState([]);

  const deadCutiesContract = useDeadCuties(DEAD_CUTIES_ADDRESS);
  const accessTokenContract = useAccessToken(ACCESS_TOKEN_ADDRESS);

  const twinkling = {
    loop: true,
    autoplay: true,
    animationData: twinklingData,
  };

  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === "string" && !!library;

  const getArrayOfNFTIDs = async () => {
    let _arrayOfNFTIDs = await useDeadCutiesGetWalletIds(deadCutiesContract, account);
    if (_arrayOfNFTIDs) {
      setArrayOfNFTIDs(_arrayOfNFTIDs);
    }
  };

  if (account) {
    getArrayOfNFTIDs();
  }
  return (
    <div>
      <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
        <filter id="blue-wash">
          <feColorMatrix
            type="matrix"
            values=" 
                        0.900  0.000  0.000  0.000  0.000 
                        0.000  0.900  0.000  0.000  0.000 
                        0.000  0.000  1.000  0.000  0.000 
                        0.000  0.000  0.000  1.000  0.000
                        "
          ></feColorMatrix>
        </filter>
      </svg>
      <Head>
        <title>The Dead Cuties</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header startTimer={startTimer} />
      <main className="mint-main">
        {" "}
        <section className="mint">
          {" "}
          <div className="canvas">
            {" "}
            <div className="canvas__elements">
              <img src={lightning4.src} />
            </div>
            <div className="canvas__btm">
              <div className="canvas__btm-trees"></div>
              <div className="canvas__btm-trees"></div>
              <div className="canvas__btm-trees"></div>
              <div className="canvas__btm-graves"></div>
              <div className="canvas__btm-graves"></div>

              {/* <div className="canvas__btm-trees"></div>  */}
            </div>
          </div>
          {/* <div className="stars">
                        <Lottie options={twinkling} />
                    </div> */}{" "}
          <Bubble setStartTimer={setStartTimer} deadCutiesContract={deadCutiesContract} accessTokenContract={accessTokenContract} />
          {/* <div className="platform">
                        <Person position={"top"} direction={"to-left"} />
                        <Person position={"bottom"} direction={"to-right"} />
                    </div> */}
          <div className="reaper">
            <img src={reaperSprite1.src} />
          </div>
        </section>
        <section>
          <Account triedToEagerConnect={triedToEagerConnect} />
          <Collection baseURI={BASE_URI} arrayOfNFTIDs={arrayOfNFTIDs} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Claim;
