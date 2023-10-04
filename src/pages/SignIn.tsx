import Container from "../components/Container";
import {
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
import adminUsers from "../const/adminUsers";
import { setCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
import cashierUsers from "../const/cashierUsers";
import { useComponentsBg } from "../const/colorModeValues";

export default function SignIn() {
  const signInRoleBg = useColorModeValue("b", "w");
  const signInRoleColor = useColorModeValue("wt", "bt");
  const navigate = useNavigate();
  const cfg = useComponentsBg();

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
      type AuthState = {
        token: string;
        idPublic: number;
        username: string;
        role: "admin" | "cashier";
        name: string;
        age: number;
        phone: string;
        storeName: string;
        expires: number;
      };
      let authState: AuthState;

      if (values.role === "admin") {
        let isMatch = adminUsers.find((u) => {
          if (
            values.username === u.username &&
            values.password === u.password
          ) {
            const token = process.env.REACT_APP_ADMIN_TOKEN;
            // console.log(token);
            setCookie("token", token, {
              expires: values.staySignedIn ? 7 : 1,
            });
            resetForm();

            if (token) {
              authState = {
                token: token,
                idPublic: u.idPublic,
                username: u.username,
                role: u.role,
                name: u.name,
                age: u.age,
                phone: u.phone,
                storeName: u.storeName,
                expires: values.staySignedIn ? 7 : 1,
              };
            }
            setCookie("authState", JSON.stringify(authState), {
              expires: authState.expires,
            });
            navigate("/admin");
            return true;
          }
          return false;
        });

        if (!isMatch) {
          console.log("username and password did not match");
          alert("username and password did not match");
        }
      } else if (values.role === "cashier") {
        let isMatch = cashierUsers.find((u) => {
          if (
            values.username === u.username &&
            values.password === u.password
          ) {
            const token = process.env.REACT_APP_CASHIER_TOKEN;
            // console.log(token);
            setCookie("token", token, {
              expires: values.staySignedIn ? 7 : 1,
            });
            resetForm();

            if (token) {
              authState = {
                token: token,
                idPublic: u.idPublic,
                username: u.username,
                role: u.role,
                name: u.name,
                age: u.age,
                phone: u.phone,
                storeName: u.storeName,
                expires: values.staySignedIn ? 7 : 1,
              };
            }
            setCookie("authState", JSON.stringify(authState), {
              expires: authState.expires,
            });
            navigate("/cashier");
            return true;
          }
          return false;
        });

        if (!isMatch) {
          console.log("username and password did not match");
          alert("username and password did not match");
        }
      } else {
        console.log("Invalid Role, valid roles are ADMIN or CASHIER");
        alert("Invalid Role, valid roles are ADMIN or CASHIER");
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
      <VStack zIndex={99} position={"sticky"} top={0} left={0} {...cfg} p={2}>
        <NavHeader title={"Sign In"} backPath={"/"} />
      </VStack>

      <Container>
        <VStack
          w={"100%"}
          minH={"calc(100vh - 70px)"}
          py={8}
          justify={"center"}
        >
          <SimpleGrid w={"100%"} columns={[1, null, 2]} gap={12}>
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

            <VStack justify={"center"} gap={0}>
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <FormControl mb={4}>
                  <FormLabel>Role</FormLabel>
                  <HStack
                    p={1}
                    justify={"space-between"}
                    bg={"var(--divider)"}
                    borderRadius={6}
                  >
                    <Text
                      w={"50%"}
                      transition={"200ms"}
                      textAlign={"center"}
                      bg={formik.values.role === "admin" ? signInRoleBg : ""}
                      p={1}
                      borderRadius={6}
                      fontWeight={600}
                      fontSize={[12, 13, null]}
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
                      fontWeight={600}
                      fontSize={[12, 13, null]}
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
                    <Text>Stay Signed In (1 week) </Text>
                  </Checkbox>

                  <Link to="">
                    <Text color={"p.500"}>Forgot password?</Text>
                  </Link>
                </HStack>

                {/* SUBMIT BUTTON */}
                <Button
                  type="submit"
                  className="clicky"
                  w={"100%"}
                  colorScheme="bnw"
                  mb={4}
                  borderRadius={"full"}
                  h={"44px !important"}
                >
                  SIGN IN
                </Button>

                <Text textAlign={"center"} opacity={0.5}>
                  By default you will stay signed in for 24 hours
                </Text>
              </form>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
}
