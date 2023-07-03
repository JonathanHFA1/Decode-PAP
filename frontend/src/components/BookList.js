import React from 'react';
import { Box } from '@mui/system';

const BookList = ({ books }) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2 p-20">
      
      {books.map((book) => (
        
        <div>
          <div className="bg-stone-900 rounded-xl ">{
            book.volumeInfo.imageLinks && (
              <div className="">
                <img key={book.id} className="object-cover cursor-pointer w-[350px] h-[450px] mx-10" src={book.volumeInfo.imageLinks.smallThumbnail} alt="BookImage" />
                <div className="">
                  <Box sx={{   display:'flex', justifyContent:'center'}}>
                  <p className="width:'80%'flex items-center justify-center p-2 text-[14px] ">Título - {book.volumeInfo.title}</p>
                  </Box>
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
