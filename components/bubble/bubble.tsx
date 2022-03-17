import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function Bubble({ setStartTimer }) {
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState('1');
    let [mintStep, setMintStep] = useState(1);
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

    const changeMintStep = function () {
        if (mintStep === 1) {
            // mintStep === 1 shows "Pay with access token" button and starts timer

            setStartTimer(true);
        }
        if (mintStep === 2) {
            // mintStep === 2 shows amount and reap souls button so you can put in here minting function
        }
        setMintStep(mintStep + 1);
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

    return (
        <div mint-step={mintStep} className="bubble">
            <div className="bubble__text">
                {(mintStep === 1) &&
                    <>
                        <p>
                            Their time has come.
                            They are wandering the Ether now.
                            I can get these lost souls for you...
                        </p>
                        <p>
                            ...as I have no use for them.
                            <br />
                            They are troubled by their death and
                            aren't ready to move on beyond.
                        </p>
                        <p>
                            For a fee, I will bind them to you
                            until you are ready to release them.
                        </p>
                    </>
                }
                {(mintStep === 2) &&
                    <>
                        How many souls shall I bind to you?
                    </>
                }
            </div>
            <div className="bubble__form">
                {(mintStep === 1) &&
                    <>
                        <button
                            onClick={() => { changeMintStep() }}
                        >
                            Pay the Reaper with your access token
                        </button>
                    </>}
                {(mintStep === 2) &&
                    <>
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
                        <button>
                            reap souls
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Bubble;