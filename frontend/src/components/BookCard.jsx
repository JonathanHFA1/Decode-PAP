import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ModalCompra from './ModalCompra';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import TextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';

//modal
const PostCard = ({ id, title, subheader, image, content, comments, likes, showPosts, likesId }) => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const { userInfo } = useSelector((state) => state.signIn);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  //confirmar envio
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  //preco
  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * 40);
    setRandomNumber(newRandomNumber);
  }, []);

  //enviar email
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_9f97tto', 'template_4c4wcyk', form.current, 'hWhQE814mtmVHSrl3').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    setOpenSnackbar(true);
  };

  //add like
  const addLike = async () => {
    try {
      const { data } = await axios.put(`/api/addlike/post/${id}`);
      // console.log("likes", data.post);
      // if (data.success == true) {
      //     showPosts();
      // }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };
  //remove like
  const removeLike = async () => {
    try {
      const { data } = await axios.put(`/api/removelike/post/${id}`);
      // console.log("remove likes", data.post);
      // if (data.success == true) {
      //     showPosts();
      // }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: "345px",height:"550px", bgcolor: '#252525' }}>
        <CardHeader
          className="text-white"
          title={title}
          // subheader={subheader}
        />
        <Link to={`/post/${id}}`}>
          <CardMedia className="h-[300px]" component="img" height="194" image={image} alt="Capa Livro" />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <p className="text-white">Descrição livro</p>
            <Box component="span" className="text-white" dangerouslySetInnerHTML={{ __html: content.split(' ').slice(0, 10).join(' ') + '...' }}></Box>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div className="flex gap-[6rem]">
            <Box>
              <div className="flex items-center justify-center">
                {loading ? (
                  <Loader />
                ) : likesId.includes(userInfo && userInfo.id) ? (
                  <IconButton onClick={removeLike} aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: 'red' }} />
                  </IconButton>
                ) : (
                  <IconButton onClick={addLike} aria-label="add to favorites">
                    <FavoriteBorderIcon sx={{ color: 'red' }} />
                  </IconButton>
                )}
                <p className="text-white "> {likes} Like(s)</p>
              </div>
            </Box>
            <div>
              <button onClick={() => setOpenModal(true)} className="bg-[#FF4E16]  hover:bg-orange-700 h-[43px] rounded-full py-2 px-4 font-bold text-white">
                Comprar
              </button>
            </div>
            <ModalCompra isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
              <div className="flex gap-5 ">
                <div className='w-1/2'>
                  <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
                    <div className="mb-5">
                      <h3 className="mt-10 text-2xl font-semibold text-white">Dados Pessoais</h3>
                      <hr className="border-t-2 border-orange-600" />
                    </div>

                    <TextField
                      id="email"
                      label="Email"
                      variant="standard"
                      name="from_email"
                      className="w-full"
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      InputProps={{
                        style: { color: 'white' },
                      }}
                    />
                    <TextField
                      id="name"
                      label="Nome"
                      variant="standard"
                      name="from_name"
                      className="w-full"
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      InputProps={{
                        style: { color: 'white' },
                      }}
                    />
                    <TextField
                      id="endereco"
                      label="Endereço"
                      variant="standard"
                      name="endereco"
                      className="w-full"
                      InputLabelProps={{
                        style: { color: 'white' },
                      }}
                      InputProps={{
                        style: { color: 'white' },
                      }}
                    />

                    <input type="hidden" name="title" value={title} />
                    <input type="hidden" name="price" value={randomNumber} />
                  <div className='w-full'>
                  <p className="text-xl text-white" name="valor">
                      Valor do Livro: {randomNumber} €
                    </p>
                  </div>

                    <div className="my-5">
                      <input type="submit" value="Enviar" className="bg-[#FF4E16] hover:bg-orange-700 h-[43px] rounded-full py-2 px-4 font-bold text-white" />
                    </div>
                  </form>
                  <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Compra Realizada com sucesso!" />
                </div>
                <div>
                  <form className="flex flex-wrap w-full gap-3 p-5">
                    {' '}
                    <div className="mb-5">
                      <h3 className="mt-5 text-2xl font-semibold text-white">Dados do Cartão</h3>
                      <hr className="border-t-2 border-orange-600" />
                    </div>
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
            </ModalCompra>
          </div>
        </CardActions>
      </Card>
    </>
  );
};
export default PostCard;
