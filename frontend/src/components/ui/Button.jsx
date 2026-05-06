import { ICONS } from "../../utils/icons";

export default function Button({
    children,
    onClick,
    variant = "primary",   // opciones: primary | ghost | danger | success en base a index.css
    size = "md",           // sm | md | lg
    icon,                  // key de ICONS
    iconPosition = "left", // left o right
    disabled = false,
    type = "button",
    style = {},
}) {
    const IconComponent = icon ? ICONS[icon] : null;
    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size}`}
            onClick={onClick}
            disabled={disabled}
            style={style}
        >
            {IconComponent && iconPosition === "left" && (
                <IconComponent size={iconSize} />
            )}
            {children}
            {IconComponent && iconPosition === "right" && (
                <IconComponent size={iconSize} />
            )}
        </button>
    );
}