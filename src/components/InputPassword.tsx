import { Box, Icon, IconButton, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

interface InputPasswordProps {
  formik: any;
  handleForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputPassword({
  formik,
  handleForm,
}: InputPasswordProps) {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState<any>(Eye);

  return (
    <Box position={"relative"}>
      <Input
        ref={inputPasswordRef}
        type="password"
        placeholder="type your password"
        name="password"
        onFocus={(e) => {
          e.target.select();
        }}
        onChange={handleForm}
        value={formik.values.password}
      />
      <IconButton
        aria-label="showPassword"
        colorScheme="bnw"
        icon={<Icon as={icon} fontSize={18} />}
        className="sm-clicky"
        position={"absolute"}
        right={0}
        top={0}
        zIndex={2}
        onClick={() => {
          if (inputPasswordRef.current) {
            if (inputPasswordRef.current.type === "password") {
              inputPasswordRef.current.type = "text";
              setIcon(EyeSlash);
            } else {
              inputPasswordRef.current.type = "password";
              setIcon(Eye);
            }
          }
        }}
      />
    </Box>
  );
}
