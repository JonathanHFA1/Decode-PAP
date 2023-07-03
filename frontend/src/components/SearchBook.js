import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import Navbar from './Navbar';
import BookModal from './BookModal';

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

  return (
    <>
      <Navbar />
      <div className="h-[200px] w-full flex flex-col items-center justify-center">
        <p className="text-white text-2xl font-bold mb-5">O que procuras ?</p>
        <input
          className="bg-[#3d3d3d] text-white border-none outline-none p-2 rounded-xl"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div className="text-white">
        <BookList books={books} openModal={openModal} />
      </div>
      {selectedBook && (
        <BookModal book={selectedBook} isOpen={true} onRequestClose={closeModal} />
      )}
    </>
  );
};


export default SearchBook;
