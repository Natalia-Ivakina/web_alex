import { useRef, useState } from "react";
import "../styles/ManageVideoForm.css";

const ColorPickerButton = ({ onColorChange }) => {
  const colorInputRef = useRef(null);
  const [newColor, setNewColor] = useState("ffffff");

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value.slice(1); // remove #
    setNewColor(selectedColor);
    onColorChange(selectedColor);
  };

  return (
    <div id="color-picker">
      <button id="changeColor" onClick={openColorPicker}>
        <span className="tooltip">Set color</span>
      </button>
      <input
        type="color"
        ref={colorInputRef}
        value={`#${newColor}`}
        onChange={handleColorChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ColorPickerButton;
