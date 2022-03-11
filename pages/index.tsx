import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import ClaimAccessToken from "../components/ClaimAccessToken";
import useEagerConnect from "../hooks/useEagerConnect";
import useAccessToken from "../hooks/useAccessToken";

const ACCESS_TOKEN_ADDRESS = "0xc5ec6B520d589f6375dCc237965DE9E2702476F3";

function Home() {
  const { account, library } = useWeb3React();
  const contract = useAccessToken(ACCESS_TOKEN_ADDRESS);

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

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          <a>The Dead Cuties</a>
        </h1>

        {isConnected && (
          <section>
            <ETHBalance />
            <ClaimAccessToken contract={contract} />

            <TokenBalance tokenAddress={ACCESS_TOKEN_ADDRESS} symbol="Access Token" />
          </section>
        )}
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

export default Home;
