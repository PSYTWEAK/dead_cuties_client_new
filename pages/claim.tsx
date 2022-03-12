import { useWeb3React } from "@web3-react/core";
import Lottie from 'react-lottie';
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import ClaimAccessToken from "../components/ClaimAccessToken";
import useEagerConnect from "../hooks/useEagerConnect";
import twinklingData from '../public/data/twinkling.json';

import lightning4 from '../public/assets/lightning_4.png';
import reaperSprite1 from '../public/assets/Reaper_Sprite_1.png';
import reaperSprite2 from '../public/assets/Reaper_Sprite_2.png';
import grave from '../public/assets/grave.png';
import ghost3 from '../public/assets/ghost_3.png';
import ghost4 from '../public/assets/ghost_4.png';
import tree from '../public/assets/tree.png';
import useAccessToken from "../hooks/useAccessToken";

const ACCESS_TOKEN_ADDRESS = "0x536FBCcD358B8EdA0aa905f4B93A39B46C5227d2";

function Claim() {

    const contract = useAccessToken(ACCESS_TOKEN_ADDRESS);

    const twinkling = {
        loop: true,
        autoplay: true,
        animationData: twinklingData,
    };
    const { account, library } = useWeb3React();

    const triedToEagerConnect = useEagerConnect();

    const isConnected = typeof account === "string" && !!library;

    return (
        <div>
            <Head>
                <title>The Dead Cuties</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <header>
        <nav>
          <Link href="/">
            <a>TheDeadCuties</a>
          </Link>
        </nav>
      </header>

            <main className="claim">

                <section className="canvas">
                    <div className="canvas__elements">
                        <img src={lightning4.src} />
                    </div>
                    <div className="canvas__btm">
                        <div className="canvas__btm-grave">
                            <img src={grave.src} className="canvas__btm-grave-img" />
                            <div className="canvas__btm-grave-text">
                            <Account triedToEagerConnect={triedToEagerConnect} />
                                {isConnected && (
                                    <section>
                                        <ClaimAccessToken contract={contract} />
                                        <TokenBalance tokenAddress={ACCESS_TOKEN_ADDRESS} symbol="Access Token" />
                                    </section>
                                )}
                                 {!isConnected && (
                                    <section>
                                        <p>Connect to Arbitrum</p>
                                    </section>
                                )}
                            </div>
                        </div>
                        {/* 
                            If you want to animare grim reaper add class
                            canvas__btm-reaper--animated
                         */}
                        <div className="canvas__btm-reaper canvas__btm-reaper--animated">
                            <img className="canvas__btm-reaper-img" src={reaperSprite1.src} />
                            <img className="canvas__btm-reaper-img" src={reaperSprite2.src} />
                        </div>
                        
                        <img className="canvas__btm-tree" src={tree.src} />
                        <img className="canvas__btm-tree" src={tree.src} />
                    </div>
                    <div className="canvas__bg">
                        <Lottie options={twinkling} />
                    </div>
                </section>
            </main>

            <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
        </div>
    );
}

export default Claim;
