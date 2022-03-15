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
import Person from "../components/platform/person/Person";
import { useRef } from "react";
import { useState } from "react";

const ACCESS_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Claim() {
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState('1');
    const stepTrigger = function (pos) {

        if (inputRef.current) {
            if (pos === 'up') {
                inputRef.current.stepUp();
            } else {
                inputRef.current.stepDown();
            }
            setInputValue(inputRef.current.value);
        }
    }

    const checkingInput = function (e) {
        const leadingZero = e.target.value === '0' ? true : false;
        setInputValue(leadingZero ? 1 : e.target.value);
    }

    const validation = function (e) {
        let isNumber = false;
        isNumber = e.key.match(/^[0-9]*$/) ? true : false;

        const allowedKeys = ['ArrowUp', 'ArrowDown', 'Backspace', 'Del'];
        const isAllowedKey = allowedKeys.includes(e.key);

        if (isNumber === false && isAllowedKey === false) e.preventDefault();
    }

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
                        <a>The Dead Cuties</a>
                    </Link>
                </nav>
            </header>

            <main>
                <section className="mint">
                    <div className="canvas">
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
                    <div className="stars">
                        <Lottie options={twinkling} />
                    </div>
                    <div className="bubble">
                        <div className="bubble__text">
                            How many souls do you want?
                        </div>
                        <div className="bubble__form">
                            <span className="bubble__form-input">
                                <input ref={inputRef}
                                    type="number" min="1"
                                    onKeyPress={(e => validation(e))}
                                    onChange={(e => checkingInput(e))}
                                    value={inputValue}
                                />
                                <span className="bubble__form-input-steps">
                                    <button onClick={() => stepTrigger('up')}>
                                    </button>
                                    <button
                                        {...(inputValue === '1' ? { disabled: true } : {})}
                                        onClick={() => stepTrigger('down')}
                                    >
                                    </button>
                                </span>
                            </span>
                            <button type="submit">
                                reap souls
                            </button>
                        </div>
                    </div>
                    {/* <div className="platform">
                        <Person position={"top"} direction={"to-left"} />
                        <Person position={"bottom"} direction={"to-right"} />
                    </div> */}
                    <div className="reaper">
                        <img src={reaperSprite1.src} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Claim;
