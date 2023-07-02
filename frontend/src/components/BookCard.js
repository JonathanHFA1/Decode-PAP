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
        <CardMedia component="img" height="194" image={image} alt="Paella dish" />
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
          <Box>
            {comments}
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </Box>
        </div>
      </CardActions>
      <Collapse timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8
            minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring
            often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low,
            add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any
            mussels that don&apos;t open.)
          </Typography>
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
