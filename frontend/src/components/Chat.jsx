import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';

const style = {
  main: `flex flex-col p-4 md:p-8`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    // Consulta a coleção 'messages' do Firestore e ordena os documentos pelo campo 'timestamp'
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    
    // Configura um ouvinte de alterações na coleção para receber atualizações em tempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        // Recupera os dados de cada documento e os adiciona ao array 'messages'
        messages.push({ ...doc.data(), id: doc.id });
      });
      // Atualiza o estado 'messages' com o novo array de mensagens
      setMessages(messages);
    });

    // Cancela a inscrição do ouvinte quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <main className={style.main}>
        {/* Renderiza a lista de mensagens */}
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      {/* Renderiza o componente SendMessage para enviar novas mensagens */}
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
};

export default Chat;
