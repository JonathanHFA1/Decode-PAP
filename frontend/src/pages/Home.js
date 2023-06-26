import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box } from '@mui/system';
import { Container, Grid } from '@mui/material';
import BookCard from '../components/BookCard';
const Home = () => {
  return (
    <>
      <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 0, md: 12 }}>
              <Grid item xs={2} sm={4} md={4}>
                <BookCard />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
