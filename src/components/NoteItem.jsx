import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import LocaleContext from '../contexts/LocaleContext';
import { showFormattedDate } from './../utils/index';
import { Link } from 'react-router-dom';

const NoteItem = ({ id, title, body, createdAt }) => {
  const { selectLanguage } = useContext(LocaleContext);

  return (
    <article className='note-item'>
      <h3 className='note-item__title'>
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className='note-item__createdAt'>
        {selectLanguage({ id: showFormattedDate(createdAt, 'id-ID'), en: showFormattedDate(createdAt, 'en-US') })}
      </p>
      <p className='note-item__body'>{parser(body)}</p>
    </article>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default NoteItem;
