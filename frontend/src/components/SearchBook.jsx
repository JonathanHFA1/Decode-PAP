import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import Navbar from './Navbar';
import BookModal from './BookModal';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    getBooks();
  }, [input]);

  const getBooks = async () => {
    const encodedInput = encodeURIComponent(input); // Encode the input value
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedInput}&key=AIzaSyBqVY7j1KVVj9XLkdGSDi-cPmjYTL9oodQ
    `;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.items);
      if (data.items) {
        setBooks(data.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };
  const [isLabelVisible, setLabelVisible] = useState(true);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full h-200">
        <div className="flex justify-start w-[95%] my-10">
          <h1 className="mb-5 text-3xl font-bold text-white">A nossa biblioteca</h1>
        </div>
        <TextField
          className="p-2 text-white bg-gray-500 border-none outline-none rounded-xl w-[300px]"
          type="text"
          value={input}
          label="Procure por algo...."
          onChange={(e) => {
            setInput(e.target.value);
            setLabelVisible(e.target.value === ''); // Define a visibilidade da label com base no valor do campo
          }}
          InputLabelProps={{
            style: {
              color: 'white',
              marginLeft: '50px',
              transform: 'translateY(-50%)',
              top: '50%',
              opacity: isLabelVisible ? 1 : 0, // Define a opacidade da label com base na visibilidade
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="text-white">
        <BookList books={books} openModal={openModal} />
      </div>
      {selectedBook && <BookModal book={selectedBook} isOpen={true} onRequestClose={closeModal} />}
    </>
  );
};

export default SearchBook;
