import React, { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [text, setText] = useState('');

  const hendleChange = e => setText(e.currentTarget.value.toLowerCase());

  const hendleSubmit = e => {
    e.preventDefault();

    if (text.trim() === '') {
      alert('Введите имя картинки');
      return;
    }
    onSubmit(text);
    setText('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={hendleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.lable}></span>
        </button>
        <input
          value={text}
          onChange={hendleChange}
          className={s.input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search movies"
        />
      </form>
    </header>
  );
}
