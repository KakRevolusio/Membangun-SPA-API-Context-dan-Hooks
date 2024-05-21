import React, { useContext, useEffect, useState } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { getArchivedNotes } from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';

function ArsipPage() {
  const { selectLanguage } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(() => searchParams.get('keyword') || '');

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase()));

  if (loading) {
    return <Loading />;
  }

  return (
    <section className='homepage'>
      <h2>{selectLanguage({ id: 'Catatan Arsip', en: 'Archived Note' })}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArsipPage;
