import React, { useEffect, useState } from 'react';
import BookList from './BookList';

const SearchBook = () => {
  const [books, setbooks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getBooks();
  }, [input]);

  const getBooks = async () => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}:keyes&key=AIzaSyBqVY7j1KVVj9XLkdGSDi-cPmjYTL9oodQ`);
    const data = await res.json();
    console.log(data.items);
    if (data.items) {
      setbooks(data.items);
    }
  };
  return (
    <>
      <div className="h-[200px] w-full flex justify-center items-center">
        <input
        className='bg-[#3d3d3d] border-none outline-none p-2 text-white'
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <BookList books={books} />
    </>
  );
};

export default SearchBook;
