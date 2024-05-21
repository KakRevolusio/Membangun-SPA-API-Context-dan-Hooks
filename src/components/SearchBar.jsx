import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

const SearchBar = ({ keyword, keywordChange }) => {
  const { selectLanguage } = useContext(LocaleContext);
  
  return (
    <section className='search-bar'>
      <input
        type='text'
        placeholder={selectLanguage({ id: 'Cari berdasarkan judul ...', en: 'Search by title...' })}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
};

export default SearchBar;
