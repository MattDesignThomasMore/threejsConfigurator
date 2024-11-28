import { useContext, useState } from "react";
import { CustomizationContext } from "../context/CustomizationContex.jsx";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  Box,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export default function SizeCustomizer() {
  const { customization, setCustomization } = useContext(CustomizationContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSliderChange = (value, axis) => {
    setCustomization((prevState) => ({
      ...prevState,
      layerSize: {
        ...prevState.layerSize,
        [customization.layerName]: {
          ...prevState.layerSize[customization.layerName],
          [axis]: value,
        },
      },
    }));
  };

  const setDefaultValuesForLayer = (layer) => {
    setCustomization((prevState) => ({
      ...prevState,
      layerSize: {
        ...prevState.layerSize,
        [layer]: {
          x: 1,
          y: 1,
          z: 1,
        },
      },
    }));
  };

  const setDefaultValuesForModel = () => {
    setCustomization((prevState) => ({
      ...prevState,
      layerSize: {
        laces: { x: 1, y: 1, z: 1 },
        mesh: { x: 1, y: 1, z: 1 },
        caps: { x: 1, y: 1, z: 1 },
        inner: { x: 1, y: 1, z: 1 },
        sole: { x: 1, y: 1, z: 1 },
        stripes: { x: 1, y: 1, z: 1 },
        band: { x: 1, y: 1, z: 1 },
        patch: { x: 1, y: 1, z: 1 },
      },
    }));
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={onOpen} color="black" style={{ marginLeft: "-20px" }}>
        Open maat configurator
      </Button>

      {/* Modal for the Size Customizer */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent marginTop="30px">
          <ModalHeader>Grootte van de schoenlagen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              {/* Slider for Breedte */}
              <HStack spacing={6} align="center" justify="space-between">
                <Text color="black">Breedte</Text>
                <Slider
                  aria-label="slider-width"
                  value={customization.layerSize[customization.layerName].x}
                  min={0}
                  max={3}
                  step={0.2}
                  onChange={(v) => handleSliderChange(v, "x")}
                  w="80%"
                >
                  <SliderTrack bg="green.100">
                    <SliderFilledTrack bg="green.400" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </HStack>

              {/* Slider for Hoogte */}
              <HStack spacing={6} align="center" justify="space-between">
                <Text color="black">Hoogte</Text>
                <Slider
                  aria-label="slider-height"
                  value={customization.layerSize[customization.layerName].y}
                  min={0}
                  max={3}
                  step={0.2}
                  onChange={(v) => handleSliderChange(v, "y")}
                  w="80%"
                >
                  <SliderTrack bg="green.100">
                    <SliderFilledTrack bg="green.400" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </HStack>

              {/* Slider for Diepte */}
              <HStack spacing={6} align="center" justify="space-between">
                <Text color="black" marginBottom={"10px"}>
                  Diepte
                </Text>
                <Slider
                  aria-label="slider-depth"
                  value={customization.layerSize[customization.layerName].z}
                  min={0}
                  max={3}
                  step={0.2}
                  onChange={(v) => handleSliderChange(v, "z")}
                  w="80%"
                >
                  <SliderTrack bg="green.100">
                    <SliderFilledTrack bg="green.400" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
