import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../../hooks/useTokenBalance";
import useDeadCutiesDepositAccessToken from "../../hooks/useDeadCutiesDepositAccessToken";
import useDeadCutiesMint from "../../hooks/useDeadCutiesMint";

function Bubble({ setStartTimer, deadCutiesContract, accessTokenContract }) {
  const inputRef = useRef(null);
  const { account } = useWeb3React();

  const [inputValue, setInputValue] = useState("1");
  let [mintStep, setMintStep] = useState(0);
  let [priceOfMint, setPriceOfMint] = useState(0);

  let { data } = useTokenBalance(account, "0xc5ec6B520d589f6375dCc237965DE9E2702476F3");

  let balance;

  useEffect(() => {
    if (data) {
      balance = data.toString();
      if (balance === "1") {
        setMintStep(1);
      }
    } else {
      balance = "0";
    }
  }),
    [data];

  const stepTrigger = function (pos) {
    if (inputRef.current) {
      if (pos === "up") {
        inputRef.current.stepUp();
      } else {
        inputRef.current.stepDown();
      }
      setInputValue(inputRef.current.value);
      let price = calculatePrice(inputRef.current.value);
      setPriceOfMint(price);
    }
  };

  const calculatePrice = (quantity) => {
    let noOffer = quantity % 3;
    let offer = Math.floor(quantity / 3);
    let price = offer * 2 * 0.03 + noOffer * 0.03;
    return price;
  };

  const changeMintStep = async function () {
    try {
      if (mintStep === 1) {
        // mintStep === 1 shows "Pay with access token" button and starts timer
        await useDeadCutiesDepositAccessToken(deadCutiesContract);
        setStartTimer(true);
      }
      if (mintStep === 2) {
        // mintStep === 2 shows amount and reap souls button so you can put in here minting function
        await useDeadCutiesMint(deadCutiesContract, Number(inputValue));
      }
      setMintStep(mintStep + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const checkingInput = function (e) {
    const leadingZero = e.target.value === "0" ? true : false;
    setInputValue(leadingZero ? 1 : e.target.value);
  };

  const validation = function (e) {
    let isNumber = false;
    isNumber = e.key.match(/^[0-9]*$/) ? true : false;

    const allowedKeys = ["ArrowUp", "ArrowDown", "Backspace", "Del"];
    const isAllowedKey = allowedKeys.includes(e.key);

    if (isNumber === false && isAllowedKey === false) e.preventDefault();
  };

  return (
    <div mint-step={mintStep} className="bubble">
      <div className="bubble__text">
        {mintStep === 0 && (
          <>
            <p>Your time isn't here yet</p>
            <p>...your wallet needs an access token to continue</p>
          </>
        )}
        {mintStep === 1 && (
          <>
            <p>Their time has come. They are wandering the Ether now. I can get these lost souls for you...</p>
            <p>
              ...as I have no use for them.
              <br />
              They are troubled by their death and aren't ready to move on beyond.
            </p>
            <p>For a fee, I will bind them to you until you are ready to release them.</p>
          </>
        )}
        {mintStep === 2 && <>How many souls shall I bind to you?</>}
      </div>
      <div className="bubble__form">
        {mintStep === 1 && (
          <>
            <button
              onClick={() => {
                changeMintStep();
              }}
            >
              Pay the Reaper with your access token
            </button>
          </>
        )}
        {mintStep === 2 && (
          <>
            <span className="bubble__form-input">
              <input ref={inputRef} type="number" min="1" onKeyPress={(e) => validation(e)} onChange={(e) => checkingInput(e)} value={inputValue} />
              <span className="bubble__form-input-steps">
                <button onClick={() => stepTrigger("up")}></button>
                <button {...(inputValue === "1" ? { disabled: true } : {})} onClick={() => stepTrigger("down")}></button>
              </span>
            </span>
            <button>reap cuties for the price of {priceOfMint} ETH</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Bubble;
