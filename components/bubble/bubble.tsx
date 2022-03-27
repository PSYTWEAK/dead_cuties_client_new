import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../../hooks/useTokenBalance";
import useDeadCutiesDepositAccessToken from "../../hooks/useDeadCutiesDepositAccessToken";
import useDeadCutiesMint from "../../hooks/useDeadCutiesMint";

function Bubble({ setStartTimer, startTimer, deadCutiesContract, accessTokenContract, setNumOfStateChange, atMintStepThree }) {
  const inputRef = useRef(null);
  const { account } = useWeb3React();

  const [inputValue, setInputValue] = useState("1");
  let [mintStep, setMintStep] = useState(3);
  let [priceOfMint, setPriceOfMint] = useState(0.03);

  const { data } = useTokenBalance(account, accessTokenContract ? accessTokenContract.address : "");

  let balance;

  useEffect(() => {
    if (atMintStepThree) {
      setMintStep(3);
    }
  }, [atMintStepThree]);

  useEffect(() => {
    if (data) {
      balance = data.toString();

      if (balance !== "0") {
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

  const ChangeMintStep = async function (currentStep) {
    try {
      if (mintStep === 1) {
        // mintStep === 1 shows "Pay with access token" button and starts timer
        await _depositAccessToken();
        setStartTimer(true);
        setNumOfStateChange(Math.random());
      }
      if (mintStep >= 2) {
        // mintStep === 2 shows amount and reap souls button so you can put in here minting function
        await _mint();
        setNumOfStateChange(Math.random());
      }
      currentStep < 3 ? setMintStep(mintStep + 1) : setMintStep(mintStep);
    } catch (err) {
      console.log(err);
    }
  };

  const _mint = async function () {
    await useDeadCutiesMint(deadCutiesContract, Number(inputValue), priceOfMint);
  };
  const _depositAccessToken = async function () {
    await useDeadCutiesDepositAccessToken(deadCutiesContract);
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
        <>
          <p>
            All the deadCuties have been minted...
            <br />
            Total supply is 945
          </p>
        </>
      </div>
    </div>
  );
}

export default Bubble;
