import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../../hooks/useTokenBalance";
import useDeadCutiesDepositAccessToken from "../../hooks/useDeadCutiesDepositAccessToken";
import useDeadCutiesMint from "../../hooks/useDeadCutiesMint";

function Bubble({ setStartTimer, deadCutiesContract, accessTokenContract, setNumOfStateChange }) {
  const inputRef = useRef(null);
  const { account } = useWeb3React();

  const [inputValue, setInputValue] = useState("1");
  let [mintStep, setMintStep] = useState(1);
  // const []
  let [priceOfMint, setPriceOfMint] = useState(0.03);

  const { data } = useTokenBalance(account, accessTokenContract ? accessTokenContract.address : "");

  let balance;

  useEffect(() => {
    if (data) {
      console.log(">>>> data");
      console.log(data);
      balance = data.toString();
      console.log("> mintStep");
      console.log(mintStep);
      if (balance !== "0" && mintStep === 0) {
        setMintStep(mintStep + 1);
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
      let inputVal = Number(inputRef.current.value);
      let price = calculatePrice(inputVal < 1 ? "1" : inputRef.current.value);
      setPriceOfMint(price);
    }
  };

  const calculatePrice = (quantity) => {
    let noOffer = quantity % 3;
    let offer = Math.floor(quantity / 3);
    let price = offer * 2 * 0.03 + noOffer * 0.03;
    return price;
  };

  const changeMintStep = async function (currentStep) {
    try {
      if (mintStep === 1) {
        // mintStep === 1 shows "Pay with access token" button and starts timer
        await useDeadCutiesDepositAccessToken(deadCutiesContract);
        setStartTimer(true);
        setNumOfStateChange(Math.random());
      }
      if (mintStep >= 2) {
        // mintStep === 2 shows amount and reap souls button so you can put in here minting function
        await useDeadCutiesMint(deadCutiesContract, Number(inputValue), priceOfMint);
        setNumOfStateChange(Math.random());
      }
      currentStep < 3 ? setMintStep(mintStep + 1) : setMintStep(mintStep);
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
            <p>
              So little wandering souls...
              <br />
              ...so many people who want them.
            </p>
            <p>
              Unless you obtained access tokens I can't get them for you.
              <br />
              Come back when you get it.
            </p>
          </>
        )}
        {mintStep === 1 && (
          <>
            <p>Their time has come. They are wandering the Ether now. I can get these lost cuties for you...</p>
            <p>
              ...as I have no use for them.
              <br />
              They are troubled by their death and aren't ready to move on beyond.
            </p>
            <p>For a fee, I will bind these dead cuties to you until you are ready to release them.</p>
          </>
        )}
        {mintStep === 2 && (
          <>
            <p>I have bound one to you for free...</p>

            <p>A lot of people want these cuties for themselves, so I will give you 10 minutes of your time to mint as many as you like.</p>
            <p>...How many more DeadCuties shall I bind to you?</p>
          </>
        )}
        {mintStep === 3 && (
          <>
            <p>
              Your Dead Cuties should be visible below...
              <br />
              If you don't vibe with some of them, you can click Reroll and I will get you another for half the price.
            </p>

            <p>... Scroll down, they would love to see you.</p>
            <p> Do you want to me to bind more cuties to you? </p>
          </>
        )}
        {mintStep === 4 && (
          <>
            <p>
              Your Dead Cuties should be visible below...
              <br />
              If you don't vibe with some of them, you can click Reroll and I will get you another for half the price.
            </p>

            <p>... Scroll down, they would love to see you.</p>
            <p> Do you want to me to bind more cuties to you? </p>
          </>
        )}
      </div>
      <div className="bubble__form">
        {mintStep === 1 && (
          <>
            <button
              onClick={() => {
                changeMintStep(mintStep);
              }}
            >
              Pay the Reaper with your access token
            </button>
          </>
        )}
        {mintStep >= 2 && (
          <>
            <span className="bubble__form-input">
              <input ref={inputRef} type="number" min="1" onKeyPress={(e) => validation(e)} onChange={(e) => checkingInput(e)} value={inputValue} />
              <span className="bubble__form-input-steps">
                <button onClick={() => stepTrigger("up")}></button>
                <button {...(inputValue === "1" ? { disabled: true } : {})} onClick={() => stepTrigger("down")}></button>
              </span>
            </span>
            <button onClick={() => changeMintStep(mintStep)}>Bind cuties to you for the price of {priceOfMint} ETH</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Bubble;
