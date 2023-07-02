import React from 'react';

const BookList = ({ books }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-20">
      {books.map((book) => (
      <div>
          <div className="book-container">
          {book.volumeInfo.imageLinks && (
            <div>
              <img key={book.id} className="w-[370px] object-cover h-full cursor-pointer" src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />
              {<div className=''>
                {book.volumeInfo.title}
                <p>By:{book.volumeInfo.authors}</p>
              </div> }
              
            </div>

          )}
        </div>
      </div>
      ))}
    </div>
  );
};

export default BookList;
