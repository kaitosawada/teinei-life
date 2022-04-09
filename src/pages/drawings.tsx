import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import DrawingsMain from "../components/DrawingsMain";

const Home: NextPage = () => {
    return (
        <div style={{ position: "absolute", backgroundColor: "white" }}>
            <Head>
                <title>teineiLIFE</title>
                <meta name="description" content="teineiLIFE's portpholio website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={{ width: "100vw" }}>
                <DrawingsMain />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
