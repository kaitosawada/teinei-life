import type { NextPage } from "next";
import Head from "next/head";
import IndexMain from "../components/IndexMain";
import Footer from "../components/Footer";
import GL from "../components/GL";
import { Box, Button, Container, Heading, Stack } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

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
                <Container>
                    <Stack
                        as={Box}
                        textAlign={"center"}
                        spacing={{ base: 8, md: 14 }}
                        py={{ base: 20, md: 36 }}
                    >
                        <Heading
                            fontWeight={600}
                            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                            lineHeight={"110%"}>
                            Services
                        </Heading>
                        <Stack
                            direction={"column"}
                            spacing={3}
                            align={"center"}
                            alignSelf={"center"}
                            position={"relative"}
                        >
                            <a href="https://kisegraph.vercel.app/" target="_blank" rel="noopener noreferrer">
                                <Button
                                    colorScheme={"blue"}
                                    bg={"blue.400"}
                                    rounded={"full"}
                                    px={6}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    The Sexual Network Visualizer <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
                                </Button>
                            </a>
                        </Stack>
                    </Stack>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
