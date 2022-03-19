import links from '../../data/links';
import { useState } from 'react';
import { useEffect } from 'react';
import Account from '../Account';

function Header({ startTimer, triedToEagerConnect }) {
    const [counter, setCounter] = useState(600);
    const [minutes, setMinutes] = useState(Math.floor((counter % 3600) / 60));
    const [seconds, setSeconds] = useState(counter % 60);

    const formatTimer = function (time: number) {
        return time < 10 ? `0${time}` : time;
    }

    let formattedSeconds = formatTimer(seconds);
    let formattedMinutes = formatTimer(minutes);

    useEffect(() => {
        counter > 0 && startTimer === true && setTimeout(() => {
            setCounter(counter - 1);
            setMinutes(Math.floor((counter % 3600) / 60));
            setSeconds(counter % 60);

            formattedSeconds = formatTimer(seconds);
            formattedMinutes = formatTimer(minutes);

        }, 1000);
    }, [counter, startTimer]);

    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <h1>The Dead Cuties</h1>
                        <span className="timer">
                            {formattedMinutes}:{formattedSeconds}
                        </span>
                    </li>
                    <li className="header__wallet">
                        <Account triedToEagerConnect={triedToEagerConnect} />
                    </li>
                    {links.social.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <a target="_blank" href={item.url} rel="noopener noreferrer">
                                    <img src={item.icon} />
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

export default Header;