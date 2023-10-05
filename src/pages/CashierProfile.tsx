import { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import CashierNav from "../components/CashierNav";
import Page from "../components/Page";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import { getCookie, removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
import { useComponentsBg } from "../const/colorModeValues";

export type Profile = {
  idPublic: number;
  username: string;
  role: "cashier";
  name: string;
  age: number;
  phone: string;
  storeName: string;
};

export default function CashierProfile() {
  const [profile, setProfile] = useState<Profile>();
  const bg = useComponentsBg();
  useEffect(() => {
    const pc = getCookie("authState");
    if (pc) {
      const profileData: Profile = JSON.parse(pc);
      setProfile(profileData);
    }
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
    removeCookie("authState");
    removeCookie("token");
    navigate("/");
  };

  const SignoutModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button
          onClick={onOpen}
          w={"100%"}
          colorScheme="bnw"
          className="clicky"
          borderRadius={"full"}
          h={"44px !important"}
        >
          SIGN OUT
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter={"blur(10px)"} />

          <ModalContent {...bg}>
            <ModalHeader px={4} py={3} pt={4}>
              Signing Out
            </ModalHeader>
            <ModalBody px={4}>
              <Text>Finish working, wanna sign out?</Text>
            </ModalBody>
            <ModalFooter px={4}>
              <HStack w={"100%"}>
                <Button
                  w={"50%"}
                  colorScheme="bnw"
                  className="clicky"
                  onClick={onClose}
                >
                  CANCEL
                </Button>
                <Button
                  className="btn clicky"
                  variant={"ghost"}
                  w={"50%"}
                  onClick={handleSignOut}
                >
                  SIGN OUT
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <Page>
      <CashierNav />

      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader title={"Cashier Profile"} left={null} right={null} />
      </VStack>

      <VStack flex={1} w={"100%"} position={"relative"} pb={"52px"}>
        <Container>
          <SimpleGrid
            my={5}
            w={"100%"}
            maxW={["400px", null, "720px"]}
            mx={"auto"}
            columns={[1, null, 2]}
            gap={[4, 6, 8]}
          >
            <VStack>
              <Box
                borderRadius={6}
                overflow={"hidden"}
                bg={"var(--divider)"}
                w={"100%"}
                h={"100%"}
                minH={"300px"}
                bgImage={"../img/users/cashier.jpg"}
                bgPos={"center top"}
                bgSize={"cover"}
              />

              {/* <VStack w={"100%"} align={"flex-start"} gap={4}></VStack> */}
            </VStack>

            <VStack align={"flex-start"} gap={4} flex={1}>
              <Text
                fontWeight={700}
                fontSize={23}
                //   textAlign={"center"}
              >
                Account Details
              </Text>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>ID</Text>
                <Text>{profile?.idPublic}</Text>
              </HStack>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>Store Name</Text>
                <Text>{profile?.storeName}</Text>
              </HStack>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>Role</Text>
                <Badge colorScheme={"yellow"}>{profile?.role}</Badge>
              </HStack>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>Username</Text>
                <Text>{profile?.username}</Text>
              </HStack>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>Name</Text>
                <Text>{profile?.name}</Text>
              </HStack>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>Age</Text>
                <Text>{profile?.age}</Text>
              </HStack>

              <HStack w={"100%"} justify={"space-between"}>
                <Text opacity={0.5}>Phone</Text>
                <Text>{profile?.phone}</Text>
              </HStack>

              <SignoutModal />
            </VStack>
          </SimpleGrid>
        </Container>

        {/* <VStack
          maxW={"600px"}
          position={"absolute"}
          bottom={0}
          zIndex={-1}
          opacity={0.2}
          animation={"fade-in-fade 1s"}
          p={4}
        >
          <Image src="../img/profile.png" />
        </VStack> */}
      </VStack>
    </Page>
  );
}
