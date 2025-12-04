import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Usuários mockados
    const mockUsers = {
      comum: {
        email: "usuario@teste.com",
        password: "123456",
        tipo: "comum"
      },
      reciclador: {
        email: "reciclador@teste.com",
        password: "123456",
        tipo: "reciclador"
      }
    };

    // Verifica o usuário
    const userComum = mockUsers.comum;
    const userReciclador = mockUsers.reciclador;

    if (formData.email === userComum.email && formData.password === userComum.password) {
      localStorage.setItem("user", JSON.stringify(userComum));
      navigate("/how-to-recycle"); //temporário
    } else if (formData.email === userReciclador.email && formData.password === userReciclador.password) {
      localStorage.setItem("user", JSON.stringify(userReciclador));
      navigate("/how-to-recycle"); //temporário
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Senha</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Entrar
      </button>

    

      
    </form>
  );
}