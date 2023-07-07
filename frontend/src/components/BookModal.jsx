import React from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState , useEffect} from 'react';
import ModalCompra from './ModalCompra';
import TextField from '@mui/material/TextField';

const BookModal = ({ book, isOpen, onRequestClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * 40);
    setRandomNumber(newRandomNumber);
  }, []);

  const truncatedDescription = book.volumeInfo.description ? `${book.volumeInfo.description.slice(0, 1000)}...` : 'No description available.';
  const handleExpiryDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 4);
    const month = value.slice(0, 2);
    const year = value.slice(2);

    if (value.length >= 2) {
      setExpiryDate(`${month}/${year}`);
    } else {
      setExpiryDate(value);
    }
  };


  return (
    <>
      <Modal open={isOpen} onClose={onRequestClose}>
        <div className="relative z-30 flex flex-col items-center justify-center h-full p-6 bg-white bg-opacity-80">
          <IconButton
            aria-label="Close"
            onClick={onRequestClose}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className="flex flex-row gap-6 ">
            <img className="object-cover w-[300px] h-[400px]" src={book.volumeInfo.imageLinks?.smallThumbnail} alt="BookImage" />
            <div className="flex flex-col ">
              <Typography variant="h5" gutterBottom>
                {book.volumeInfo.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Author: {book.volumeInfo.authors?.[0] || 'Author not available'}
              </Typography>
              <Typography variant="body1">{truncatedDescription}</Typography>
            </div>
            <button onClick={() => setOpenModal(true)} className="bg-[#FF4E16]  hover:bg-orange-700 h-[43px] rounded-full py-2 px-4 font-bold text-white">
              Comprar
            </button>
            <ModalCompra
              isOpen={openModal}
              setModalOpen={() => setOpenModal(!openModal)}
              style={{ zIndex: 50 }} // Define o zIndex para que o modal de compra fique à frente
            >
              <div className="p-6 bg-[#252525] rounded-lg">
                <h1 className="mb-4 text-2xl font-medium leading-6 text-white ">Preencha os seus dados</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                  <h3>Dados Pessoais</h3>
<hr />
                    <TextField
                      id="email"
                      label="Email"
                      variant="standard"
                      className="w-full"
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      InputProps={{
                        style: { color: 'white' },
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      id="name"
                      label="Nome"
                      variant="standard"
                      className="w-full"
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      InputProps={{
                        style: { color: 'white' },
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                <div>
                  <h3>Dados do Cartão</h3>
                <form className="flex flex-wrap w-full gap-3 p-5">
                    <TextField
                      label="Número do cartão"
                      variant="outlined"
                      fullWidth
                      inputProps={{
                        maxLength: 16,
                        inputMode: 'numeric',
                        style: { color: 'white' },
                      }}
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      placeholder="0000 0000 0000"
                      required
                    />
                    <TextField
                      label="Data de validade"
                      variant="outlined"
                      fullWidth
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      inputProps={{
                        maxLength: 5,
                        inputMode: 'numeric',
                        style: { color: 'white' },
                      }}
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      placeholder="MM/YY"
                      required
                    />
                    <TextField
                      label="CVC/CVV"
                      variant="outlined"
                      fullWidth
                      inputProps={{
                        maxLength: 3,
                        inputMode: 'numeric',
                        style: { color: 'white' },
                      }}
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      placeholder="•••"
                      required
                    />
                  </form>
                </div>
                </div>
              </div>
              <p className='text-2xl text-white'>Valor do Livro: {randomNumber} €</p>

              <div className="my-5">
                <button className="bg-[#FF4E16] hover:bg-orange-700 h-[43px] rounded-full py-2 px-4 font-bold text-white">Comprar</button>{' '}
                
              </div>
            </ModalCompra>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookModal;
