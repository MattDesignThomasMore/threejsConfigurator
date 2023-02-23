import { useContext, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import styled from "@emotion/styled";
import Circle from "@uiw/react-color-circle";
import { CustomizationContext } from "../context/CustomizationContex.jsx";

const StyledColorPicker = styled(HexColorPicker)`
  &.react-colorful {
    width: 100%;
    height: 200px;
  }

  & .react-colorful__hue {
    height: 30px;
  }
`;

export default function CustomColorPicker() {
  const { isOpenModal, customization, setCustomization } = useContext(CustomizationContext);
  const [colorOnCircle, setColorOnCircle] = useState("#1A0E3E");
  const [hexColorPicker, setHexColorPicker] = useState("#e3d8d8");

  function handleColorPicker(color) {
    setHexColorPicker(color);
    setCustomization((prevState) => ({
      ...prevState,
      layerColor: {
        ...prevState.layerColor,
        [customization.layerName]: color,
      },
    }));
  }

  const handleColorChangeOnCircle = (color) => {
    setColorOnCircle(color.hex);
    setHexColorPicker(color.hex);
    setCustomization((prevState) => ({
      ...prevState,
      layerColor: {
        ...prevState.layerColor,
        [customization.layerName]: color.hex,
      },
    }));
  };

  return (
    <>
      <Circle
        colors={["#1A0E3E", "#1F1A70", "#DB488B", "#FF83F6", "#3ED0EB"]}
        color={colorOnCircle}
        onChange={(color) => {
          handleColorChangeOnCircle(color);
        }}
      />

      <StyledColorPicker
        style={{ width: "230px" }}
        color={hexColorPicker}
        onChange={(color) => {
          handleColorPicker(color);
        }}
      />
    </>
  );
}
