import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Page from "../components/Page";
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Landing() {
  const bg = useColorModeValue("#ffffffcc", "#050505cc");
  // const signInColor = useColorModeValue("bt", "wt");

  return (
    <Box bgImage={"./img/grocery.jpg"} bgSize={"cover"}>
      <Page>
        <VStack w={"100%"} minH={"100vh"} justify={"center"}>
          <VStack
            w={"100%"}
            maxW={"500px"}
            justify={"center"}
            borderRadius={"12px"}
            p={5}
            bg={bg}
            backdropFilter={"blur(10px)"}
          >
            <ColorModeSwitcher position={"absolute"} top={2} right={2} />

            <HStack gap={4} alignSelf={"flex-start"}>
              <Image src={"./logo512.png"} w={"64px"} mb={4} />

              <Box>
                <Text fontWeight={600} opacity={0.5}>
                  Welcome to the
                </Text>
                <Text
                  fontSize={[24, 28, 32]}
                  fontWeight={800}
                  lineHeight={1}
                  mb={4}
                >
                  JASMINE KIOSK
                </Text>
              </Box>
            </HStack>

            <Button
              as={Link}
              to={"/signin"}
              className="clicky"
              colorScheme="bnw"
              w={"100%"}
              h={"50px"}
              mb={4}
              // borderRadius={"full"}
            >
              SIGN IN
            </Button>

            <HStack fontSize={14} gap={1}>
              <Text>Don't have an account?</Text>
              <Text as={Link} to={"/signup"} fontWeight={600} color={"p.500"}>
                Sign Up
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Page>
    </Box>
  );
}
