import styles from "./ModalForm.module.css"; 

export default function ModalForm({ 
    label, 
    name, 
    value, 
    onChange, 
    type = "text", 
    placeholder = "", 
    disabled = false 
}) {
    return (
        <div className={styles.fieldGroup}>
            <label className={styles.label}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
                disabled={disabled}
            />
        </div>
    );
}