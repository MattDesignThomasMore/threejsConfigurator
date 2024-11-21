import { useContext, useState, useEffect } from "react";
import { CustomizationContext } from "../context/CustomizationContex.jsx";
import { Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Text } from "@chakra-ui/react";

export default function SizeCustomizer() {
  const { customization, setCustomization } = useContext(CustomizationContext);

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

  const setDefaultValuesForModel = (layer) => {
    setCustomization((prevState) => ({
      ...prevState,
      layerSize: {
        laces: {
          x: 1,
          y: 1,
          z: 1,
        },
        mesh: {
          x: 1,
          y: 1,
          z: 1,
        },
        caps: {
          x: 1,
          y: 1,
          z: 1,
        },
        inner: {
          x: 1,
          y: 1,
          z: 1,
        },
        sole: {
          x: 1,
          y: 1,
          z: 1,
        },
        stripes: {
          x: 1,
          y: 1,
          z: 1,
        },
        band: {
          x: 1,
          y: 1,
          z: 1,
        },
        patch: {
          x: 1,
          y: 1,
          z: 1,
        },
      },
    }));
  };
  return (
    <>
     
    </>
  );
}