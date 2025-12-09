import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usuários mockados
    const mockUsers = {
      comum: {
        id: 4, 
        email: "luiza@exemplo.com",
        password: "123456",
        tipo: "comum",
        firstName: "Luiza",
        lastName: "Almeida"
      },
      reciclador: {
        id: 3,
        email: 'carlos@example.com',
        password: '123456',
        tipo: 'reciclador',
        firstName: "Carlos",
        lastName: "Silva",
        code: "5678"
      },
    };

    // Verifica o usuário
    const userComum = mockUsers.comum;
    const userReciclador = mockUsers.reciclador;

    if (formData.email === userComum.email && formData.password === userComum.password) {
      localStorage.setItem("user", JSON.stringify(userComum));
      navigate("/user-profile");
    } else if (formData.email === userReciclador.email && formData.password === userReciclador.password) {
      localStorage.setItem("user", JSON.stringify(userReciclador));
      navigate("/recycler-profile");
    } else {
      alert('Email ou senha incorretos!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>E-mail</label>
        <input
          type='email'
          name='email'
          placeholder='seu@email.com'
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Senha</label>
        <input
          type='password'
          name='password'
          placeholder='••••••••'
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <button type='submit' className={styles.submitButton}>
        Entrar
      </button>
    </form>
  );
}
