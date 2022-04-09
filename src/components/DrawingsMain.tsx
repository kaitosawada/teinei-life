import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Image from "next/image";

const DrawingsMain: React.FC = () => {
    return (
        <Container maxW={"3xl"}>
            <Box mb={12}>
                <Image src={"/picture1.jpeg"} alt="drawing" width={900} height={1200} />
            </Box>
            <Box mb={12}>
                <Image src={"/picture2.jpeg"} alt="drawing" width={900} height={1200} />
            </Box>
            <Box mb={12}>
                <Image src={"/picture3.jpeg"} alt="drawing" width={1280} height={1280} />
            </Box>
        </Container>
    );
};

export default DrawingsMain;