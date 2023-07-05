import React from 'react';
import SignIn from './SignIn';
import LogOut from './LogOut';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const style = {
  nav: `bg-orange-700 rounded-lg h-20 text-xl flex justify-between items-center p-4`,
  heading: `text-white text-3xl`,
};

const Navbar = () => {
  // Obtém o estado atual do usuário autenticado
  const [user] = useAuthState(auth);

  return (
    <div className={style.nav}>
      {/* Exibe o título do navbar */}
      <h1 className={style.heading}>Expressa a tua opinião</h1>
      {/* Renderiza o componente de LogOut se houver um usuário autenticado, caso contrário, renderiza o componente SignIn */}
      {user ? <LogOut /> : <SignIn />}
    </div>
  );
};

export default Navbar;
