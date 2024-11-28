

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

export default function CustomColorPicker({ setNameToDrop }) {
  const { customization, setCustomization } = useContext(CustomizationContext);
  const [colorOnCircle, setColorOnCircle] = useState("#1A0E3E");
  const [hexColorPicker, setHexColorPicker] = useState(customization.layerColor[customization.layerName]);
  const [name, setName] = useState(""); // State voor naam
  const [draggedName, setDraggedName] = useState(null); // State voor drag-and-drop

  useEffect(() => {
    setHexColorPicker(customization.layerColor[customization.layerName]);
  }, [customization.layerName]);

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

  const handleDragStart = (e) => {
    setDraggedName(name);
    setNameToDrop(name); // Stuur de naam naar de parent (Scene) component
  };

  return (
    <>
      <Circle
        colors={["#1A0E3E", "#1F1A70", "#DB488B", "#FF83F6", "#3ED0EB"]}
        color={colorOnCircle}
        onChange={(color) => handleColorChangeOnCircle(color)}
      />

      <StyledColorPicker
        style={{ width: "230px" }}
        color={hexColorPicker}
        onChange={(color) => handleColorPicker(color)}
      />

      {/* Naam invoeren */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor style={{ color: "black", fontWeight: "bold", fontSize: "18px" }} for="nameInput">Jouw initialen</label>
        <input
  id="nameInput"
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    display: "block",
    marginTop: "10px",
    padding: "5px",
    fontSize: "16px",
    color: "black", // Dit maakt de tekst binnen de input zwart
  }}
/>

      </div>

      {/* Naam weergeven en slepen */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
        }}
        draggable
        onDragStart={handleDragStart}
      >
        <p style={{ margin: 0, color: "black" }}> {name || "Geen initialen toegevoegd"}</p>
      </div>

      {/* Dropzone */}
      <div
        style={{
          marginTop: "20px",
          height: "100px",
          border: "2px dashed #ccc",
          textAlign: "center",
          lineHeight: "100px",
          color: "black",
        }}
        onDrop={(e) => {
          e.preventDefault();
          alert(`Initialen "${draggedName}" gedropt in de omgeving!`);

        }}
        onDragOver={(e) => e.preventDefault()}
      >
        Sleep je initialen hier!
      </div>
    </>
  );
}
