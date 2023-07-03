import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@mui/system';
import { Container, Grid } from '@mui/material';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import frontImage from '../assets/book.png';

const Livros = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //display books
  const showPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/posts/show');
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    showPosts();
  }, []);
  return (
    <>
    <Navbar/>
    <Box sx={{ minHeight: '100vh' }}>
      <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 0, md: 12 }}>
            {posts &&
              posts.map((post, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <BookCard
                    id={post._id}
                    title={post.title}
                    content={post.content}
                    image={post.image ? post.image.url : ''}
                    subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                    comments={post.comments.length}
                    likes={post.likes.length}
                    likesId={post.likes}
                    showPosts={showPosts}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default Livros;
