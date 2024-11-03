// src/Auth.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './index.css'; // Import the styles

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleAuth = async (event) => {
    event.preventDefault();
    if (isSignUp) {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) console.log('Error signing up:', error.message);
      else console.log('User signed up:', user);
    } else {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) console.log('Error signing in:', error.message);
      else console.log('User signed in:', user);
    }
  };

  return (
    <div className="container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Auth;
