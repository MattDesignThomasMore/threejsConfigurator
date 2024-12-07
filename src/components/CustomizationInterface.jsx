import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { CustomizationContext } from "../context/CustomizationContex.jsx";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import CustomColorPicker from "./CustomColorPicker.jsx";
import SizeCustomizer from "./SizeCustomizer.jsx";

export default function CustomizationPanel() {
  const { isOpenModal, customization, setIsOpenModal } = useContext(CustomizationContext);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  const sidebarHeight = window.innerHeight > 909 ? "auto" : "75vh";
  const overflowSidebar = window.innerHeight > 909 ? "hidden" : "auto";

  const bgColor = useColorModeValue("blueAlpha.900", "gray.800");
  const headerBg = useColorModeValue(
    "linear-gradient(to right, #4CAF50, #81C784)",
    "linear-gradient(to right, #2C3E50, #4CA1AF)"
  );

  const headerTextColor = useColorModeValue("white", "gray.100");

  const handleGoToOrder = () => {
    navigate("/order");
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Kan de camera niet openen:", err);
    }
  };

  const takeSnapshot = async () => {
    try {
   
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });
  
      const video = document.createElement("video");
      video.srcObject = stream;
  
      await new Promise((resolve) => (video.onloadedmetadata = resolve));
      video.play();
  
     
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "screenshot.png";
      link.click();
  
    
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (error) {
      console.error("Fout bij het maken van een screenshot:", error);
    }
  };
  
  


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
            SWEAR - 3D Sneaker Store
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
            : "Click on the shoe and let your creativity run wild!"}
        </Heading>
      </Box>
  
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
                Layer color
                </Heading>
                <CustomColorPicker />
              </Box>
  
             
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
  

      <Button
        onClick={takeSnapshot}
        colorScheme="white" 
  bg="white"         
  color="black"      
  width="100%"
  mt={8}
  borderRadius="md"
  size="lg"
>
       Take a snapshot
      </Button>
      
     
      <Button
        onClick={handleGoToOrder}
        colorScheme="#5acd75;"
        width="100%"
        mt={8}
        borderRadius="md"
        size="lg"
      >
Checkout
      </Button>
      
      <video ref={videoRef} autoPlay style={{ display: "none" }} onCanPlay={startCamera} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Box>
  );
};  