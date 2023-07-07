import * as React from 'react';
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
import { useState } from 'react';
import Loader from './Loader';

//modal

const PostCard = ({ id, title, subheader, image, content, comments, likes, showPosts, likesId }) => {
  const [openModal, setOpenModal] = useState(false);

  const { userInfo } = useSelector((state) => state.signIn);
  const [loading, setLoading] = useState(false);

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
    <Card sx={{ maxWidth: 345, bgcolor: '#252525' }}>
      <div className="flex items-start justify-center text-white">
        <p>Título do Livro</p>
      </div>
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
          <Box >
         <div className='flex items-center justify-center'>
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
            <p className='text-white '> {likes} Like(s)</p>
         </div>
          </Box>
          <div>
            <button onClick={() => setOpenModal(true)} className="bg-[#FF4E16]  hover:bg-orange-700 h-[43px] rounded-full py-2 px-4 font-bold text-white">
              Comprar
            </button>
          </div>
          <ModalCompra isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
            <div className="z-50 px-4 py-6 text-left bg-[#252525] rounded-lg">
              <h1 className="mb-4 text-2xl font-medium leading-6 text-white">Coloque seus dados de compra</h1>

              <div className="space-y-4">
                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nome" />
                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email" />
                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Endereço" />
                <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Outra informação" />
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
