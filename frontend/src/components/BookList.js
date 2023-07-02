import React from 'react';

const BookList = ({ books }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-20">
      {books.map((book) => (
      <div>
          <div className="book-container">
          {book.volumeInfo.imageLinks && (
            <div>
              <img key={book.id} className="w-[300px] object-cover h-full cursor-pointer" src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />
              {/* <div className=' absolute bg-[#01010180] bottom-0 left-0 right-0 text-white p-4 '>
                {book.volumeInfo.title}
                <p>By:{book.volumeInfo.authors}</p>
              </div> */}
              
            </div>

          )}
        </div>
      </div>
      ))}
    </div>
  );
};

export default BookList;
