import React from "react";
import { Container, Box, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const IndexMain: React.FC = () => {
    return (
        <Container maxW={"3xl"}>
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
                    Teinei LIFE
                </Heading>
                {/* <Text color={"gray.800"}>
                    Monetize your content by charging your most loyal readers and reward
                    them loyalty points. Give back to your loyal readers by granting
                    them access to your pre-releases and sneak-peaks.
                </Text> */}
                <Stack
                    direction={"column"}
                    spacing={3}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                >
                    <a href="https://twitter.com/_15R" target="_blank" rel="noopener noreferrer">
                        <Button
                            colorScheme={"blue"}
                            bg={"blue.400"}
                            rounded={"full"}
                            px={6}
                            _hover={{
                                bg: "blue.500",
                            }}
                        >
                            Twitter: @_15R <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
                        </Button>
                    </a>
                    <a href="https://www.youtube.com/channel/UCNU_xJ1NjvRZzO2yFLneWig/" target="_blank" rel="noopener noreferrer">
                        <Button
                            colorScheme={"red"}
                            bg={"red.400"}
                            rounded={"full"}
                            px={6}
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            YouTube <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
                        </Button>
                    </a>
                    <Link href="/services" passHref>
                        <Button
                            colorScheme={"green"}
                            bg={"green.400"}
                            rounded={"full"}
                            px={6}
                            _hover={{
                                bg: "green.500",
                            }}
                        >
                            services
                        </Button>
                    </Link>
                    <a href="https://soundcloud.com/kaito-sawada" target="_blank" rel="noopener noreferrer">
                        <Button
                            colorScheme={"orange"}
                            bg={"orange.400"}
                            rounded={"full"}
                            px={6}
                            _hover={{
                                bg: "orange.500",
                            }}
                        >
                            SoundCloud <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
                        </Button>
                    </a>
                    <a href="https://torobe-mito.tumblr.com/" target="_blank" rel="noopener noreferrer">
                        <Button
                            colorScheme={"yellow"}
                            bg={"yellow.400"}
                            rounded={"full"}
                            px={6}
                            _hover={{
                                bg: "yellow.500",
                            }}
                        >
                            Tumblr <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
                        </Button>
                    </a>
                    {/* <Link href="/drawings" passHref>
                        <Button
                            colorScheme={"red"}
                            bg={"red.400"}
                            rounded={"full"}
                            px={6}
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            drawings
                        </Button>
                    </Link> */}
                    <a href="https://hihaheho.com/" target="_blank" rel="noopener noreferrer">
                        <Button variant={"link"} colorScheme={"blue"}>
                            HIHAHEHO Studio <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
                        </Button>
                    </a>
                </Stack>
            </Stack>
        </Container>
    );
};

export default IndexMain;