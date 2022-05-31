import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'
import Editor from '../editor/editor'
import Preview from '../preview/preview'
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const location = useLocation()
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(location && location.id)
  const navigate = useNavigate();
  
  const onLogout = () => {
    authService.logout();
  };

  const createOrUpdateCard = card => {
    setCards(() => {
      const updated = [...cards];
      const finded = updated.findIndex(v => v.id === card.id)
      if (finded > -1) {
        updated[finded] = card
      } else {
        updated.push(card)
      }
      return updated
    })
    cardRepository.saveCard(userId, card)
  };

  const deleteCard = card => {
    setCards((card) => {
      const updated = {...cards};
      delete updated[card.id];
      return updated
    })
    cardRepository.removeCard(userId, card)
  };


  useEffect(() => {
    if (!userId) {
      return
    }
    const stopSync = cardRepository.syncCard(userId, cards => {
      setCards(cards)
    })
    return () => stopSync()
  }, [userId]);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid)
      } else {
        navigate('/');
      }
    });
  });


  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards}/>
      </div>
      <Footer />
    </section>
  );
};

export default Maker;