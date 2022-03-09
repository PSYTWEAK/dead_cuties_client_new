import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import ClaimAccessToken from "../components/ClaimAccessToken";
import useEagerConnect from "../hooks/useEagerConnect";

import lightning from '../public/assets/lightning.png';
import lightning2 from '../public/assets/lightning_2.png';
import lightning3 from '../public/assets/lightning_3.png';
import lightning4 from '../public/assets/lightning_4.png';
import ghost from '../public/assets/ghost.png';


function Placeholder() {
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
                        DeadCuties
                    </h2>
                </hgroup>

                <section className="canvas">
                    <div className="canvas__ghosts">
                        <img src={ghost.src} />
                    </div>
                    <div className="canvas__elements">
                        {/* <img src={lightning.src} /> */}
                        {/* <img src={lightning2.src} /> */}
                        {/* <img src={lightning3.src} />  */}
                        <img src={lightning4.src} />
                    </div>
                    <div className="canvas__btm">
                        <span></span>
                        <span></span>
                    </div>
                </section>
            </main>


        </div>
    );
}

export default Placeholder;
