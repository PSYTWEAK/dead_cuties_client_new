import links from "../../data/links";
import { useState } from "react";
import { useEffect } from "react";
import Account from "../Account";

function Header({ startTimer, setStartTimer, triedToEagerConnect }) {
  const [counter, setCounter] = useState(600);
  let minutes = Math.floor((counter % 3600) / 60);
  let seconds = counter % 60;
  const formatTimer = function (time: number) {
    return time < 10 ? `0${time}` : time;
  };

  let formattedSeconds = formatTimer(seconds);
  let formattedMinutes = formatTimer(minutes);

  let [timeLeft, setTimeLeft] = useState(`${formattedMinutes}:${formattedSeconds}`);

  useEffect(() => {
    if (startTimer === true) {
      if (counter > 0) {
        setTimeout(() => {
          setCounter(counter - 1);
          minutes = Math.floor((counter % 3600) / 60);
          seconds = counter % 60;

          formattedSeconds = formatTimer(seconds);
          formattedMinutes = formatTimer(minutes);

          setTimeLeft(`${formattedMinutes}:${formattedSeconds}`);
        }, 1000);
      } else {
        setTimeLeft("Out of time.");
        setStartTimer(null);
      }
    }
  }, [counter, startTimer]);

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <h1>The Dead Cuties</h1>
            <span className="timer">{timeLeft}</span>
          </li>
          <li className="header__wallet">
            <Account triedToEagerConnect={triedToEagerConnect} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
