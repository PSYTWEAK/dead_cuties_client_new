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

import lightning from '../public/assets/lightning.png';
import lightning2 from '../public/assets/lightning_2.png';
import lightning3 from '../public/assets/lightning_3.png';
import lightning4 from '../public/assets/lightning_4.png';
import ghost from '../public/assets/ghost.png';
import ghost2 from '../public/assets/ghost_2.png';
import ghost3 from '../public/assets/ghost_3.png';
import ghost4 from '../public/assets/ghost_4.png';
import tree from '../public/assets/tree.png';


function Placeholder() {

    const twinkling = {
        loop: true,
        autoplay: true,
        animationData: twinklingData,
    };

    return (
        <div>
            <Head>
                <title>next-web3-boilerplate</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <hgroup>
                    <h1>
                        Coming soon
                    </h1>
                    <h2>
                        TheDeadCuties
                    </h2>
                </hgroup>

                <section className="canvas">
                    <div className="canvas__bg">
                        <Lottie options={twinkling} />
                    </div>
                    <div className="canvas__ghosts">
                        <img src={ghost.src} />
                        <img src={ghost2.src} />
                        <img src={ghost3.src} />
                        <img src={ghost4.src} />
                    </div>
                    <div className="canvas__elements">
                        <img src={lightning4.src} />
                    </div>
                    <div className="canvas__btm">
                        <img src={tree.src} />
                        <img src={tree.src} />
                    </div>
                </section>
            </main>


        </div>
    );
}

export default Placeholder;
