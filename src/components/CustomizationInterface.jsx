import { useContext } from "react";
import { CustomizationContext } from "../context/CustomizationContex.jsx";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import CustomColorPicker from "./CustomColorPicker.jsx";
import SizeCustomizer from "./SizeCustomizer.jsx";

export default function CustomizationPanel() {
  const { isOpenModal, customization, setIsOpenModal } = useContext(CustomizationContext);

  // Dynamically adjust the sidebar based on the viewport height
  const sidebarHeight = window.innerHeight > 909 ? "auto" : "75vh";
  const overflowSidebar = window.innerHeight > 909 ? "hidden" : "auto";

  const bgColor = useColorModeValue("blueAlpha.900", "gray.800");
  const headerBg = useColorModeValue(
    "linear-gradient(to right, #4CAF50, #81C784)", 
    "linear-gradient(to right, #2C3E50, #4CA1AF)"  
  );
  
  const headerTextColor = useColorModeValue("white", "gray.100");
  const panelShadow = useColorModeValue("0 4px 12px rgba(0, 0, 0, 0.1)", "0 4px 12px rgba(0, 0, 0, 0.3)");

  return (
    <Box
      position="absolute"
      top={0}
      right="2%"
      p={4}
      width="350px"
      zIndex={1000}
      bg={bgColor}
      boxShadow="none" 
      borderRadius="lg"
    >
      {/* Header Section */}
      <Box
        mb={6}
        p={6}
        borderRadius="lg"
        bg={headerBg}
        color={headerTextColor}
        boxShadow="md"
      >
        <Flex justify="space-between" align="center">
          <Text
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            fontFamily="'Poppins', sans-serif"
          >
            Flux - 3D Sneaker Store
          </Text>
          {isOpenModal && (
            <IconButton
              variant="ghost"
              colorScheme="whiteAlpha"
              aria-label="Toggle Menu"
              onClick={() => setIsOpenModal(!isOpenModal)}
              icon={<ChevronUpIcon />}
            />
          )}
        </Flex>
        <Heading
          as="h2"
          size="md"
          mt={3}
          fontFamily="'Poppins', sans-serif"
          fontWeight="light"
          lineHeight="short"
        >
          {customization.layerName
            ? customization.layerName
            : "Klik op de schoen en laat je creativiteit de vrije loop!"}
        </Heading>
      </Box>

      {/* Content Section */}
      <AnimatePresence>
        {isOpenModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: sidebarHeight }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflowY: overflowSidebar,
              overflowX: "hidden",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Stack spacing={6}>
              {/* Color Customization */}
              <Box
                p={6}
                bg={useColorModeValue("gray.50", "gray.700")}
                borderRadius="lg"
                boxShadow="sm"
                _hover={{
                  boxShadow: "lg",
                  transition: "all 0.2s",
                }}
              >
                <Heading
                  as="h3"
                  size="sm"
                  mb={4}
                  color="blackAlpha.900" 
                  fontFamily="'Poppins', sans-serif"
                  fontWeight="medium"
                >
                  Laagkleur
                </Heading>
                <CustomColorPicker />
              </Box>

              {/* Size Customization */}
              <Box
                p={6}
            
                borderRadius="lg"
                boxShadow="sm"
                _hover={{
                  boxShadow: "lg",
                  transition: "all 0.2s",
                }}
              >
            
                <SizeCustomizer />
              </Box>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
