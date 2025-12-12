import { useState } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import styles from './Login.module.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main>
      <div
        className='container d-flex align-items-center justify-content-center'
        style={{ maxWidth: '900px' }}
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Bem-vindo ao Reciclando.com</h1>
            <p className={styles.subtitle}>Cadastre-se ou faça login</p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Entrar
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`}
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
    </main>
  );
}
