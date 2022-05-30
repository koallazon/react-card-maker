import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'
import Editor from '../editor/editor'
import Preview from '../preview/preview'
import styles from './maker.module.css';

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: '태규',
      company: 'bbangyatv',
      theme: 'light',
      email: 'koallazon@gmai.com',
      message: 'thanks you',
      fileName: 'kaollazon',
      fileURL: null,
    },
    {
      id: 2,
      name: '호제3',
      company: 'bbangyatv',
      theme: 'light',
      email: 'koallazon@gmai.com2',
      message: 'thanks you',
      fileName: 'kaollazon',
      fileURL: null,
    },
    {
      id: 3,
      name: '태규3',
      company: 'bbangyatv',
      theme: 'light',
      email: 'koallazon@gmai.com3',
      message: 'thanks you',
      fileName: 'kaollazon',
      fileURL: null,
    }

  ]);
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
      }
      return updated
    })
  };

  const deleteCard = card => {
    setCards((card) => {
      const updated = {...cards};
      delete updated[card.id];
      return updated
    })
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
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