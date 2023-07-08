import { Box } from '@mui/material';
import React, { useState, useRef } from 'react';
import footerImage from '../assets/Footer.png';
import emailjs from '@emailjs/browser';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

const Footer = () => {
  const [from_email, setFromEmail] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ig8r95u', 'template_c9ivi5l', form.current, 'hWhQE814mtmVHSrl3').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    setFromEmail('');

    setOpenSnackbar(true);
  };


  return (
    <>
      <div className="flex h-[700px] flex-col items-center justify-center gap-10 md:gap-[260px] lg:h-[400px] lg:flex-row bg-[#252525]">
        <div className="flex flex-col gap-4">
          <h1 className="">Inscreva-se na nossa newsletter</h1>
          <p className="text-white ">Receba notícias e as novidades que o espera.</p>
          <div>
            <form className="flex" ref={form} onSubmit={sendEmail}>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                name="from_email"
                className="w-full"
                onChange={(e) => setFromEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />{' '}
              <input type="submit" value="Enviar" className="mt-2 bg-[#FF4E16] hover:bg-orange-700 h-[43px] rounded-full py-2 px-4 font-bold text-white" />
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Email enviado com sucesso!" />
          </div>
        </div>
        <img className="" src={footerImage} alt="Front Livros" />
      </div>
    </>
  );
};

export default Footer;
