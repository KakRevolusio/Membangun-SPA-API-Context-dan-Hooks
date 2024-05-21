import React, { useContext, useEffect, useState } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import ButtonAction from '../components/ButtonAction';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { getActiveNotes } from '../utils/network-data';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

function HomePage() {
  const { selectLanguage } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const onAddButtonHandler = () => {
    navigate('/notes/new');
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter(({ title }) => {
    return title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <section className='homepage'>
      <h2>{selectLanguage({ id: 'Catatan Aktif', en: 'Active Note' })}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className='homepage__action'>
        <ButtonAction
          title={selectLanguage({ id: 'Tambah', en: 'Add' })}
          onClick={onAddButtonHandler}
          icon={<FiPlus />}
        />
      </div>
    </section>
  );
}
export default HomePage;
