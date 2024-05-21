import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

function PageNotFound() {
  const { selectLanguage } = useContext(LocaleContext);
  return (
    <section>
      <h2>404</h2>
      <p>{selectLanguage({ id: 'Halaman tidak ditemukan.', en: 'Page not found.' })}</p>
    </section>
  );
}

export default PageNotFound;
