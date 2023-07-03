import React from 'react';
import {auth} from '../firebase'
import {Box} from '@mui/material';


const style = {
  message: `flex items-center m-4 py- px-2 rounded-tl-full rounded-tr-full`,
  name: `absolute flex  max-w-screen-sm  w-full text-white text-xs mb-5 `,
  sent: `bg-[#395dff] text-white !text-end flex-row-reverse text-end  float-right rounded-bl-full md: text-black`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};

const Message = ({ message }) => {
  const messageClass = 
  message.uid === auth.currentUser.uid
  ? `${style.sent}`
  : `${style.received}`

  return (
    <div className='color-white '>
      <div className={`${style.message} ${messageClass}`}>
        <div className='w-full'>
        <div className='flex items-center '>
          <p className={style.name}>{message.name} </p>
        </div>
        <div className='flex items-center m-2 px-2 rounded-tl-full rounded-tr-full '>
        <p className=' text-xs md:text-base'>{message.text}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Message;