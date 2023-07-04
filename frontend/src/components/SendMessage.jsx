import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

const CustomTextField = styled(TextField)({
  '& label': {
    color: 'red', // Defina a cor desejada para a label aqui
  },
});

const style = {
  container: `flex flex-row items-center justify-between px-4 py-2`,
  input: `flex-grow rounded-l-lg border border-gray-300 px-2 py-1 focus:outline-none hover:border-white`,
  button: `ml-2 px-4 py-1 text-white rounded-r-lg focus:outline-none hover:bg-orange-600 transition-colors`,
};

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    try {
      // Adicionar a mensagem à coleção do Firestore
      await addDoc(collection(db, 'messages'), {
        text: message,
        timestamp: new Date(),
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      });

      setMessage(''); // Limpar o campo de input após enviar a mensagem
    } catch (error) {
      console.error('Erro ao enviar a mensagem: ', error);
    }
  };

  return (
    <form className={style.container} onSubmit={sendMessage}>
      <TextField
        className={style.input}
        size='small'
        value={message}
        color='info'
        onChange={(e) => setMessage(e.target.value)}
        label='Digite uma mensagem...'
        sx={{ color:'white' }}
        InputProps={{ style: { background: '#fff', color: 'black' } }} // Personalizar o fundo e a cor do texto do input
      />
      <Button sx={{ bgcolor: '#FF4E16' }} variant='contained' color='primary' type='submit' className={style.button}>
        Enviar
      </Button>
    </form>
  );
};

export default SendMessage;
