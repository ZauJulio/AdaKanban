import { ReactElement, cloneElement } from "react";
import { ButtonProps, Button } from "@chakra-ui/react";

export interface ButtonIconProps extends ButtonProps {
  children: ReactElement;
  color?: string;
}

export default function ButtonIcon(props: ButtonIconProps) {
  const { children, color, ...rest } = props;

  return (
    <Button
      backgroundColor="gray.500"
      color="white"
      borderRadius="50%"
      padding="2"
      size="sm"
      _hover={{ bg: "teal.600" }}
      _focus={{ bg: "teal.600" }}
      {...rest}
    >
      {cloneElement(children, { color: color })}
    </Button>
  );
}
