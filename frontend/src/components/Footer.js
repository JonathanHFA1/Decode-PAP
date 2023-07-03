import { Box } from '@mui/material';
import React from 'react';
import footerImage from '../assets/Footer.png';

const Footer = () => {
  return (
    <>
     <div className="flex h-[700px] flex-col items-center justify-center gap-10 md:gap-[260px] lg:h-[400px] lg:flex-row bg-[#252525]">
        {/* Footer */}
        <div className="">
          <h1 className="ml-5">Inscreva-se na nossa newsletter</h1>
          <p className="ml-5">Receba notícias e as novidades que o espera.</p>
          <div className="flex flex-col items-center justify-center ml-0 sm:flex-row">
            <input label="Digite seu email..." />
            {/* Modal */}
            <button className='bg-[#FF4E16]  hover:bg-orange-700 h-[43px] w-[120px] rounded-full py-2 px-4 font-bold text-white'>
              {" "}
              <a href={"/"}>Registar</a>
            </button>
            {/*onClick={handleModalOpen} 
            <Modal
              rounded
              text="Voltar"
              title={t("titleModalHome")}
              isOpen={isModalOpen}
              onClose={handleModalClose}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="mt-5 text-sm text-white">{t("modalHome")}</p>
              </div>
            </Modal> */}
          </div>
        </div>

      <img className="" src={footerImage} alt="Front Livros" />      </div>
    </>
  );
};

export default Footer;
