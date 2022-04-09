import type { NextPage } from "next";
import Head from "next/head";
import IndexMain from "../components/IndexMain";
import Footer from "../components/Footer";
import GL from "../components/GL";

const Home: NextPage = () => {
    return (
        <div style={{ position: "absolute" }}>
            <Head>
                <title>teineiLIFE</title>
                <meta name="description" content="teineiLIFE's portpholio website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <GL />
            <main style={{ width: "100vw", minHeight: "80vh" }}>
                <IndexMain />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
