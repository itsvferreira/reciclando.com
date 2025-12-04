import React, { useState } from "react";
import { LoginForm } from "../components/loginForm/LoginForm";
import { RegistrationForm } from "../components/registrationForm/RegistrationForm";
import "../index.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Bem-vindo ao Recicla.com</h1>
          <p className="subtitle">Cadastre-se ou faça login</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${isLogin ? "tabActive" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button
            className={`tab ${!isLogin ? "tabActive" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>

        {isLogin ? (
          <LoginForm />
        ) : (
          <RegistrationForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}