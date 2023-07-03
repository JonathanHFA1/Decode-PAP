import React from 'react';

const BookList = ({ books }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-20">
      {books.map((book) => (
      <div>
          <div className="book-container bg-stone-900 rounded-xl ">
          {book.volumeInfo.imageLinks && (
            <div className=''>
              <img key={book.id} className="w-[400px] object-cover cursor-pointer max-w-[300px] mx-10" src={book.volumeInfo.imageLinks.smallThumbnail} alt="BookImage" />
              <div className=''>
                <p className='p-2 flex items-center justify-center '>Título - {book.volumeInfo.title}</p>
                
                <p className='p-2 flex items-center justify-center'>Autor - {book.volumeInfo.authors}</p>
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
