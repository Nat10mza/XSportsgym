import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      backgroundColor="transparent"
      variant="unstyled"
      marginRight="auto"
    >
      {colorMode === "dark" ? (
        <SunIcon color="grey.050" backgroundColor="transparent" />
      ) : (
        <MoonIcon color="black.700" />
      )}
    </Button>
  );
};

export default ToggleColorMode;
