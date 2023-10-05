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
    <VStack
      bgImage={"../img/grocery.jpg"}
      bgSize={"cover"}
      minH={"100vh"}
      justify={"center"}
    >
      <Container>
        <VStack
          gap={3}
          mx={"auto"}
          w={"100%"}
          maxW={"420px"}
          justify={"center"}
          borderRadius={6}
          p={5}
          bg={bg}
          backdropFilter={"blur(10px)"}
          mb={4}
        >
          <ColorModeSwitcher
            position={"absolute"}
            borderRadius={"full"}
            h={"40px !important"}
            top={2}
            right={2}
          />

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

        <VStack
          mx={"auto"}
          gap={1}
          w={"100%"}
          maxW={"420px"}
          justify={"center"}
          align={"flex-start"}
          borderRadius={6}
          p={5}
          bg={bg}
          backdropFilter={"blur(10px)"}
        >
          <Text
            color={"p.500"}
            fontWeight={700}
            fontSize={17}
            mb={2}
            lineHeight={1}
          >
            Demo Account
          </Text>
          <Box>
            <Text fontWeight={500} mr={2}>
              Admin Sign in
            </Text>
            <HStack>
              <Text opacity={0.5}>username & password :</Text>
              <Text>admin</Text>
            </HStack>
          </Box>

          <Box>
            <Text fontWeight={500} mr={2}>
              Cashier Sign in
            </Text>
            <HStack>
              <Text opacity={0.5}>username & password :</Text>
              <Text>cashier</Text>
            </HStack>
          </Box>

          <Image
            src="../img/profile.png"
            w={"140px"}
            position={"absolute"}
            right={4}
            opacity={0.2}
          />
        </VStack>
      </Container>
    </VStack>
  );
}
