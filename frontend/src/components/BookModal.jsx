import React from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BookModal = ({ book, isOpen, onRequestClose }) => {
  const truncatedDescription = book.volumeInfo.description
    ? `${book.volumeInfo.description.slice(0, 1000)}...`
    : 'No description available.';

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <div className="flex flex-col items-center justify-center h-full bg-opacity-80 bg-white p-6 relative">
        <IconButton
          aria-label="Close"
          onClick={onRequestClose}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="flex flex-row gap-6">
          <img
            className="object-cover w-[300px] h-[400px]"
            src={book.volumeInfo.imageLinks?.smallThumbnail}
            alt="BookImage"
          />
          <div className="flex flex-col">
            <Typography variant="h5" gutterBottom>
              {book.volumeInfo.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Author: {book.volumeInfo.authors?.[0] || 'Author not available'}
            </Typography>
            <Typography variant="body1">{truncatedDescription}</Typography>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
