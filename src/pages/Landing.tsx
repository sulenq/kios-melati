import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Container from "../components/Container";
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
      <Container>
        <VStack w={"100%"} minH={"100vh"} justify={"center"}>
          <VStack
            gap={3}
            w={"100%"}
            maxW={"420px"}
            justify={"center"}
            borderRadius={"12px"}
            p={5}
            bg={bg}
            backdropFilter={"blur(10px)"}
          >
            <ColorModeSwitcher position={"absolute"} top={2} right={2} />

            <HStack gap={4} alignSelf={"flex-start"} mb={1}>
              <Image src={"./logo512.png"} w={"64px"} />

              <Box>
                <Text fontWeight={600} opacity={0.5}>
                  Welcome to the
                </Text>
                <Text fontSize={24} fontWeight={800} lineHeight={1}>
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
              h={"44px"}
              // h={["40px", null, "50px"]}
              borderRadius={"full"}
            >
              SIGN IN
            </Button>

            <HStack gap={1}>
              <Text>Don't have an account?</Text>
              <Text
                fontSize={14}
                as={Link}
                to={"/signup"}
                fontWeight={600}
                color={"p.500"}
              >
                Sign Up
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
