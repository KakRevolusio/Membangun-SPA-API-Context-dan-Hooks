import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArsipPage from './pages/ArsipPage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import PageNotFound from './pages/PageNotFound';
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleLocale = () => {
    setLocale(prevLocale => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const selectLanguage = ({ id, en }) => {
    if (id === undefined || en === undefined) {
      return 'language options is empty';
    }
    return locale === 'id' ? id : en;
  };

  const localeContextValue = useMemo(() => ({
    locale,
    toggleLocale,
    selectLanguage
  }), [locale]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme]);

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className='app-container'>
            <header>
              <Navigation />
            </header>
            <main>
              <Routes>
                <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path='/register' element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className='app-container'>
          <header>
            <Navigation logout={onLogout} name={authedUser.name} toggleTheme={toggleTheme} />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/archives' element={<ArsipPage />} />
              <Route path='/notes/new' element={<AddPage />} />
              <Route path='/notes/:id' element={<DetailPage />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
