import { ICONS } from "../../utils/icontypes";
import styles from "./IconButton.module.css";

export default function IconButton({
    icon,
    onClick,
    variant = "default", // default | danger | success | primary en base a iconbuttonmodule
    size = "md",
    disabled = false,
    title,
}) {
    const IconComponent = ICONS[icon];
    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

    return (
        <button
            className={`${styles.iconBtn} ${styles[variant]} ${styles[size]}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
            type="button"
        >
            {IconComponent && <IconComponent size={iconSize} />}
        </button>
    );
}