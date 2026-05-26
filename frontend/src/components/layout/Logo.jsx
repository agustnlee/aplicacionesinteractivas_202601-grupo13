import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";

import styles from "./Logo.module.css";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`${styles.link} ${className}`.trim()}
      aria-label="Ir al inicio — CrediGest"
    >
      <div className={styles.iconWrap}>
        <Landmark className={styles.icon} aria-hidden />
      </div>
      <span className={styles.brand}>CrediGest</span>
    </Link>
  );
}
