import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./FormInput.module.css";

export function FormInput({ 
  label, 
  type = "text", 
  name,
  placeholder, 
  value, 
  onChange, 
  error,
  icon: Icon,
  required = false 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {Icon && (
          <Icon size={20} className={styles.inputIcon} />
        )}
        
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ''} ${Icon ? styles.withIcon : ''}`}
          required={required}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.togglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}