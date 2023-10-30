import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export function Searchdar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setName(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() === '') {
      toast.error('Sorry! Enter a keyword');
      return;
    }
    onSubmit(name);
    setName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <ImSearch style={{ width: 18, height: 18 }} />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
