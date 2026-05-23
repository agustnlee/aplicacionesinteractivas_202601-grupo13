import { useState } from "react";
import { ICONS } from "../../utils/icontypes";

function InputPassword({
  value,
  onChange,
  placeholder = "Ingrese Contraseña",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const IconComponent = showPassword ? ICONS.eye : ICONS.eyeOff;

  return (
    <div
        className="password-input-container"
        style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%"
        }}
    >
      <input
        type={showPassword ? "text" : "password"}
        style={{ flex: 1 }}
        name="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
            border: "none",
            background: "transparent",
            cursor: "pointer"
        }}
      >
        <IconComponent size={16} />
      </button>
    </div>
  )
}

export default InputPassword;