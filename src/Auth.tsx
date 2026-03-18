import React, { useState } from 'react';
import { supabase } from './supabase';

export default function Auth({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Erro no login: ' + error.message);
    } else {
      setMessage('Login realizado com sucesso!');
    }

    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage('Erro no cadastro: ' + error.message);
    } else {
      setMessage('Conta criada! Verifique seu email.');
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={onClose}>Fechar</button>

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          Entrar
        </button>

        <button onClick={handleSignUp} disabled={loading}>
          Criar Conta
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
