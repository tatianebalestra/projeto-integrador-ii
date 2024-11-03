// src/Home.jsx
import React from 'react';
import { supabase } from './supabaseClient';
import './index.css'; // Change to index.css

const Home = () => {
  const user = supabase.auth.getUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Reload to reflect auth state change
  };

  return (
    <div className="home-container">
      <div className="user-info">
        <h1>Bem vindo de volta!, {user?.email}!</h1>
        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Home;
