
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

   const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };


  const handleEmailLogin = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <div className="auth-container">
        <img src="health.png" alt="logo.clinicahelp"></img>
        <h2>Login</h2>
        <form className='form-input' onSubmit={handleEmailLogin}>
          <div className="input-container">
            <label htmlFor="email">Seu e-mail:</label>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
          <label htmlFor="password">Sua senha:</label>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>

        <div className="or-container">
          <span>Ou</span>
        </div>

        
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Login com conta Google
        </button>

        
        {error && <p className="error-message">{error}</p>}
      </div>  
  );
};

export default Auth;
