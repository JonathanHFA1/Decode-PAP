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

const Home = () => {
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
      <Navbar />

      <div className="flex items-center justify-center w-full mt-14 ">
        {/* Home First */}
        <div className="flex gap-10 max-w-7xl">
          {/* Container Left */}
          <div className="flex-col items-start justify-center m-3 lg:flex">
            <h1 className="mb-10 mx-4 md:mx-0 text-[40px] md:text-[60px]">Bem-vindo à nossa biblioteca online</h1>
            <p className=" mb-10 mx-4 md:mx-0 block text-white text-[20px]">Descruba os romances, histórias míticas, biografias e muito mais na nossa biblioteca. Requisite o seu próximo livro de uma forma fácil e em poucos passos</p>
            <div className="flex">
              <button className="visible w-full mb-10  ">
                <a href="/livros">
                  <span className=" bg-[#FF4E16]  hover:bg-orange-700 h-[43px] w-[360px] rounded-full py-2 px-4 font-bold text-white">Pedir Livro</span>
                </a>
              </button>
            </div>
          </div>
          {/* Container Right */}
          <div className="items-center justify-center hidden m-3 ml-10 lg:flex">
            <img className="w-[1400px] h-full" src={frontImage} alt="Front Livros" />
          </div>
        </div>
      </div>

      {/* Home Second Container */}
      <div className="flex items-center justify-center w-full bg-slate-100">
        {/* Home Second */}
        <div className="flex flex-col max-w-7xl">
          {/* Home Title*/}
          <div className="flex flex-col m-6 ">
            <h1 className="mb-5 mb:mb-10 text-black text-[40px] md:text-[60px]">Sempre com novidades</h1>
            <p className=" mb-5 mb:mb-10 block text-[20px] text-black">Veja os novos livros que apareceram!</p>
          </div>
          {/* Book Container */}
          <div className="">
            {/* Home Books*/}
            <div className="flex flex-col items-center justify-center lg:flex-row">
              {/* Container 1 */}
              <div className="flex flex-row">
                <Box sx={{  minHeight: '50vh' }}>
                  <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 0, md: 12 }}>
                        {posts &&
                          posts.map((post, index) => (
                           <>
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
                           </>
                          ))}
                      </Grid>
                    </Box>
                  </Container>
                </Box>

              </div>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Home;
