import Page from "../components/Page";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";
import { useFormik } from "formik";
import * as yup from "yup";
import InputPassword from "../components/InputPassword";
import { Link } from "react-router-dom";
import users from "../const/users";
import { setCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const signInRoleBg = useColorModeValue("b", "w");
  const signInRoleColor = useColorModeValue("wt", "bt");
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      role: "admin",
      username: "",
      password: "",
      staySignedIn: false,
    },

    validationSchema: yup.object().shape({
      role: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
    }),

    onSubmit: (values, { resetForm }) => {
      if (values?.role === "admin" || values?.role === "cashier") {
        if (users) {
          let isMatch = users.some((u) => {
            if (
              values.username === u.username &&
              values.password === u.password
            ) {
              console.log("signed in");
              console.log(process.env.REACT_APP_TOKEN);
              setCookie("token", process.env.REACT_APP_TOKEN, {
                expires: values.staySignedIn ? 7 : 1,
              });
              resetForm();
              navigate("/admin");
              return true;
            }
            return false;
          });

          if (!isMatch) {
            console.log("username and password did not match");
          }
        }
      } else {
        console.log("Invalid Role, valid roles are ADMIN or CASHIER");
      }
    },
  });

  const handleForm = (event: any) => {
    const { name, value, checked } = event.target;
    if (name === "staySignedIn") {
      formik.setFieldValue(name, checked);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <>
      <VStack px={[3, 6, 8]} borderBottom={"2px solid var(--divider)"}>
        <NavHeader title={"Sign In"} />
      </VStack>

      <Page>
        <VStack
          w={"100%"}
          minH={"calc(100vh - 70px)"}
          py={8}
          justify={"center"}
        >
          <SimpleGrid columns={[1, null, 2]} gap={12}>
            <>
              <Image
                src="../img/admin.png"
                animation={"fade-in 1s"}
                transition={"300ms"}
                display={formik?.values?.role === "admin" ? "block" : "none"}
              />

              <Image
                src="../img/cashier.png"
                animation={"fade-in 1s"}
                transition={"300ms"}
                display={formik?.values?.role === "cashier" ? "block" : "none"}
              />
            </>

            <Box>
              <form onSubmit={formik.handleSubmit}>
                <FormControl mb={4}>
                  <FormLabel>Role</FormLabel>
                  <HStack
                    p={1}
                    justify={"space-between"}
                    bg={"var(--divider)"}
                    borderRadius={8}
                  >
                    <Text
                      w={"50%"}
                      transition={"200ms"}
                      textAlign={"center"}
                      bg={formik.values.role === "admin" ? signInRoleBg : ""}
                      p={1}
                      borderRadius={6}
                      fontWeight={700}
                      fontSize={14}
                      color={
                        formik.values.role === "admin" ? signInRoleColor : ""
                      }
                      opacity={formik.values.role !== "admin" ? 0.5 : 1}
                      cursor={"pointer"}
                      onClick={() => {
                        formik.setFieldValue("role", "admin");
                      }}
                    >
                      ADMIN
                    </Text>
                    <Text
                      w={"50%"}
                      transition={"200ms"}
                      textAlign={"center"}
                      bg={formik.values.role === "cashier" ? signInRoleBg : ""}
                      p={1}
                      borderRadius={6}
                      fontWeight={700}
                      fontSize={14}
                      color={
                        formik.values.role === "cashier" ? signInRoleColor : ""
                      }
                      opacity={formik.values.role !== "cashier" ? 0.5 : 1}
                      cursor={"pointer"}
                      onClick={() => {
                        formik.setFieldValue("role", "cashier");
                      }}
                    >
                      CASHIER
                    </Text>
                  </HStack>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.username ? true : false}
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="sulenq"
                    name="username"
                    onChange={handleForm}
                    value={formik.values.username}
                  />
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.username ? true : false}
                >
                  <FormLabel>Password</FormLabel>
                  <InputPassword formik={formik} handleForm={handleForm} />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                <HStack justify={"space-between"} mb={4}>
                  <Checkbox
                    colorScheme="ap"
                    name="staySignedIn"
                    isChecked={formik.values.staySignedIn}
                    onChange={handleForm}
                  >
                    <Text fontSize={14}>Stay Signed In (1 week) </Text>
                  </Checkbox>

                  <Link to="">
                    <Text fontSize={14} color={"p.500"}>
                      Forgot password?
                    </Text>
                  </Link>
                </HStack>

                {/* SUBMIT BUTTON */}
                <Button
                  type="submit"
                  className="clicky"
                  w={"100%"}
                  colorScheme="bnw"
                  h={"50px"}
                  mb={4}
                  //   borderRadius={"full"}
                >
                  SIGN IN
                </Button>

                <Text fontSize={14} textAlign={"center"} opacity={0.5}>
                  By default you will stay signed in for 24 hours
                </Text>
              </form>
            </Box>
          </SimpleGrid>
        </VStack>
      </Page>
    </>
  );
}
