import React from 'react';
import { Box } from '@mui/system';

const BookList = ({ books, openModal }) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-6 md:grid-cols-2 lg:grid-cols-4 md:p-12">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col justify-center duration-500 bg-stone-700 hover:bg-stone-900 rounded-xl"
          onClick={() => openModal(book)}
        >
          <div className=" rounded-xl">
            {book.volumeInfo.imageLinks && (
              <div className="">
                <img
                  className="object-cover cursor-pointer w-full h-[450px]"
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  alt="BookImage"
                />
                <div className="">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <p className="width:'80%'flex items-center justify-center p-2 text-[14px]">
                      Título -{' '}
                      {book.volumeInfo.title.length > 20
                        ? `${book.volumeInfo.title.slice(0, 20)}...`
                        : book.volumeInfo.title}
                    </p>
                  </Box>
                  <p className="flex items-center justify-center p-2">
                    Autor -{' '}
                    {book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? (
                      book.volumeInfo.authors[0].length > 20
                        ? `${book.volumeInfo.authors[0].slice(0, 20)}...`
                        : book.volumeInfo.authors[0]
                    ) : (
                      'Author not available'
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
