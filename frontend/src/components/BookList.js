import React from 'react';

const BookList = ({ books }) => {
  return (
    <div className="flex flex-wrap flex-row  items-center justify-center gap-2 p-20">
      
      {books.map((book) => (
        
        <div>
          <div className="bg-stone-900 rounded-xl ">{
            book.volumeInfo.imageLinks && (
              <div className="">
                <img key={book.id} className="object-cover cursor-pointer max-w-[300px] h-[450px] mx-10" src={book.volumeInfo.imageLinks.smallThumbnail} alt="BookImage" />
                <div className="">
                  <p className="flex items-center justify-center p-2 ">Título - {book.volumeInfo.title}</p>
                  <p className="flex items-center justify-center p-2">Autor - {book.volumeInfo.authors}</p>
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
