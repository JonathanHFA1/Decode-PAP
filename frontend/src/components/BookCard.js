import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loader from './Loader';

const PostCard = ({ id, title, subheader, image, content, comments, likes, showPosts, likesId }) => {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <Link to={`/post/${id}}`}>
        <CardMedia component="img" height="194" image={image} alt="Capa Livro" />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Box component="span" dangerouslySetInnerHTML={{ __html: content.split(' ').slice(0, 10).join(' ') + '...' }}></Box>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="flex gap-[6rem]">
          <Box>
            { loading ? <Loader/>:
            likesId.includes(userInfo && userInfo.id) ? (
              <IconButton onClick={removeLike} aria-label="add to favorites">
                <FavoriteIcon sx={{ color: 'red' }} />
              </IconButton>
            ) : (
              <IconButton onClick={addLike} aria-label="add to favorites">
                <FavoriteBorderIcon sx={{ color: 'red' }} />
              </IconButton>
            )}
            {likes} Like(s)
          </Box>
        </div>
      </CardActions>
      <Collapse timeout="auto" unmountOnExit>
      
      </Collapse>
    </Card>
  );
};
export default PostCard;
