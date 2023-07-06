  import frontImage from '../images/rBook.png';
  import Navbar from '../components/Navbar';
  import logo from '../images/Logo.png';

  const AboutUs = () => {
    return (
      <>
        <Navbar />
        <div className="flex h-[50%] items-center justify-center text-white lg:h-screen mt-5 sm:mt-0 ">
          <div className="flex flex-col items-center justify-center gap-6 mt-16 sm:mt-0 lg:flex-row sm:gap-0">
            <div className="mt-2  w-full lg:p-20 md:w-[50%] p-3 sm:p-0">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold ">Sobre Nó<s></s></h1>
                <img src={logo} alt="" className="w-[100px]" />
              
              </div>
              <p className="my-3">
                Dentro da loja de livros chamada "Decode Library", uma equipe apaixonada por literatura se reúne para criar uma experiência única para os amantes de livros. Cada membro da equipe traz
                consigo sua paixão pela leitura e conhecimentos especializados, resultando em uma seleção diversificada e cativante de títulos.
              </p>
              <p className="my-3">
                Na Decode Library, você encontrará um ambiente acolhedor e inspirador, projetado para encorajar a descoberta e a exploração. Nossas estantes estão repletas de livros cuidadosamente
                selecionados, agrupados por gênero e temática, para facilitar a busca pelo próximo tesouro literário. Nossa equipe está sempre pronta para oferecer recomendações personalizadas e
                compartilhar seu entusiasmo pelos livros.
              </p>
              <p className="my-3">
                Na Decode Library, acreditamos no poder das palavras e no valor da leitura. Estamos comprometidos em ajudar os leitores a encontrar as histórias que os transportarão para novos mundos,
                desafiarão suas perspectivas e despertarão sua criatividade. Junte-se a nós nessa jornada literária e descubra o prazer de decodificar as histórias que esperam por você na Decode
                Library.
              </p>{' '}
            </div>
            <div className="flex w-[100%] justify-center sm:w-[50%] ">
              <img src={frontImage} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  };

  export default AboutUs;
