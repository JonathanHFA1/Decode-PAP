import React from 'react';

const BACKGROUND_STYLE = {
  backgroundColor: 'rgb(0,0,0, 0.7)',
  zIndex: '1000',
};

const MODAL_STYLE = {
  transform: 'translate(-50%,-50%)',
};

export default function Modal({ isOpen, setModalOpen, children }) {
  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE} className="fixed top-0  bottom-0 left-0 right-0 p-[150px]  rounded-xl  text-black">
        <div style={MODAL_STYLE} className="fixed top-[50%] left-[50%] p-[50px] bg-[#252525] rounded-xl text-black ">
          <div className="flex flex-col items-center justify-end">
            <div>{children}</div>
            <div className="flex items-start w-full">
              <button onClick={setModalOpen} className="bg-[#FF4E16] hover:bg-orange-700 h-[43px] rounded-full py-2 px-6 font-bold text-white">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// position: 'fixed',
// top: 0,
// left: 0,
// right: 0,
// bottom: 0,
// backgroundColor: 'rgba(0, 0, 0, .7)',
// zIndex: 1000
