import { Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import footerImage from '../assets/Footer.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (isValidEmail) {
      setSnackbarMessage('Inscrição Completa!');
    } else {
      setSnackbarMessage('Insira um Email Válido');
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderSnackbar = (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={1000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
    />
  );

  return (
    <>
      <div className="flex h-[700px] flex-col items-center justify-center gap-10 md:gap-[260px] lg:h-[400px] lg:flex-row bg-[#252525]">
        <div className="">
          <h1 className="ml-5">Inscreva-se na nossa newsletter</h1>
          <p className="ml-5 text-white">Receba notícias e as novidades que o espera.</p>
          <div className="mt-10 flex flex-col items-center justify-center ml-0 sm:flex-row">
            <input
              className='m-[10px] h-[46px] w-[360px] rounded-[100px] border-2 p-5'
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Digite seu email..."
            />
            <button className='bg-[#FF4E16]  hover:bg-orange-700 h-[43px] w-[120px] rounded-full py-2 px-4 font-bold text-white'>
              <a href={"/"} onClick={handleSubmit}>Registar</a>
            </button>
          </div>
        </div>
        <img className="" src={footerImage} alt="Front Livros" />
      </div>
      {renderSnackbar}
    </>
  );
};

export default Footer;
