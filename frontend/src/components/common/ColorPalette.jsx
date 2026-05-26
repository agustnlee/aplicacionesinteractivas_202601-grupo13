import { useState } from "react";
import IconButton from "../ui/IconButton";
import styles from "./ColorPalette.module.css";

const COLOR_ARRAY = [
        "#d72b31",
        "#e94a22",
        "#f69e31",
        "#b7ba03",
        "#60c04c",
        "#21917b",
        "#225575",
        "#5f3675",
];

export default function ColorPalette({ onConfirm }) {
    const [color,  setColor]  = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hover,  setHover]  = useState(null);

    const handleSelect = (c) => {
        setColor(c);
        setHover(null);
        if (onConfirm) onConfirm(c);
        setIsOpen(false);
    };

    const previewColor = hover ?? color;

    return (
        <div className={styles.wrapper}>
            <div className={styles.trigger}>
                <IconButton
                    variant="primary"
                    icon="palette"
                    onClick={() => setIsOpen(o => !o)}
                />
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.grid}>
                        {COLOR_ARRAY.map((c) => (
                            <div
                                key={c}
                                className={styles.colorDot}
                                style={{ backgroundColor: c }}
                                onClick={() => handleSelect(c)}
                                onMouseEnter={() => setHover(c)}
                                onMouseLeave={() => setHover(null)}
                            />
                        ))}
                    </div>

                    <div
                        className={styles.preview}
                        style={{ backgroundColor: previewColor ?? "var(--border-subtle)" }}
                    />
                </div>
            )}
        </div>
    );
}