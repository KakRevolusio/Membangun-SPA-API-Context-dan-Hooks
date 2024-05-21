import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const Loading = () => {
  const { theme } = useContext(ThemeContext);
  const loaderSrc = theme === 'dark' ? '/images/loader-white.gif' : '/images/loader-black.gif';

  return (
    <div className='loader-container'>
      <img src={loaderSrc} className='loader' />
    </div>
  );
}

export default Loading;
