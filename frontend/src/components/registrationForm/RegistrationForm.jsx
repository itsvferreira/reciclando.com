import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

export function RegistrationForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    tipoUsuario: "comum",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cep: "",
    cidade: "",
    estado: "",
    cpf: "",
    telefone: "",
    materiaisAceitos: {
      eletronicos: false,
      papeis: false,
      vidro: false,
      plastico: false,
      metal: false,
      organico: false
    },
    disponibilidade: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      materiaisAceitos: {
        ...prev.materiaisAceitos,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro realizado:", formData);
    alert(`Cadastro realizado com sucesso!\n\nNome: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}`);
    onSwitchToLogin();
  };

  const isReciclador = formData.tipoUsuario === "reciclador";

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Tipo de Conta */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Tipo de Conta</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipoUsuario"
              value="comum"
              checked={formData.tipoUsuario === "comum"}
              onChange={handleChange}
              className={styles.radio}
            />
            <span className={styles.radioText}>Usuário Comum</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="tipoUsuario"
              value="reciclador"
              checked={formData.tipoUsuario === "reciclador"}
              onChange={handleChange}
              className={styles.radio}
            />
            <span className={styles.radioText}>Reciclador</span>
          </label>
        </div>
      </div>

    
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nome</label>
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          value={formData.firstName}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Sobrenome</label>
        <input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

     
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

      
      <div className={styles.rowGroup}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>CEP</label>
          <input
            type="text"
            name="cep"
            placeholder="00000-000"
            value={formData.cep}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Cidade</label>
          <input
            type="text"
            name="cidade"
            placeholder="Sua cidade"
            value={formData.cidade}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      
      <div className={styles.rowGroup}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Estado</label>
          <input
            type="text"
            name="estado"
            placeholder="UF"
            value={formData.estado}
            onChange={handleChange}
            className={styles.input}
            maxLength={2}
          />
        </div>
        
      </div>

    
      <div className={styles.inputGroup}>
        <label className={styles.label}>Telefone de Contato</label>
        <input
          type="tel"
          name="telefone"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      
      {isReciclador && (
        <>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Materiais que você aceita</label>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="eletronicos"
                  checked={formData.materiaisAceitos.eletronicos}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span>Eletrônicos</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="papeis"
                  checked={formData.materiaisAceitos.papeis}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span>Papéis</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="vidro"
                  checked={formData.materiaisAceitos.vidro}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span>Vidro</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="plastico"
                  checked={formData.materiaisAceitos.plastico}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span>Plástico</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="metal"
                  checked={formData.materiaisAceitos.metal}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span>Metal</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="organico"
                  checked={formData.materiaisAceitos.organico}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span>Orgânico</span>
              </label>
            </div>
          </div>

          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Disponibilidade</label>
            <input
              type="text"
              name="disponibilidade"
              placeholder="Ex: Segunda a Sexta, 10h às 18h"
              value={formData.disponibilidade}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </>
      )}

      <button type="submit" className={styles.submitButton}>
        Criar Conta
      </button>
    </form>
  );
}