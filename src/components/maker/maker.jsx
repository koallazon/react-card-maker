import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'
import Editor from '../editor/editor'
import Preview from '../preview/preview'
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: '1',
      name: '태규',
      company: 'bbangyatv',
      theme: 'light',
      email: 'koallazon@gmai.com',
      message: 'thanks you',
      fileName: 'kaollazon',
      fileURL: null,
    },
        {
      id: '2',
      name: '호제3',
      company: 'bbangyatv',
      theme: 'light',
      email: 'koallazon@gmai.com2',
      message: 'thanks you',
      fileName: 'kaollazon',
      fileURL: null,
    }
    ,    {
      id: '1',
      name: '태규3',
      company: 'bbangyatv',
      theme: 'light',
      email: 'koallazon@gmai.com3',
      message: 'thanks you',
      fileName: 'kaollazon',
      fileURL: null,
    }

  ]);
  const history = useNavigate();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        history.push('/');
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards}/>
      </div>
      <Footer />
    </section>
  );
};

export default Maker;