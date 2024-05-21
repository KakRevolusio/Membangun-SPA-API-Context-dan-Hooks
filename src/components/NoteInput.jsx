import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

const NoteInput = ({ state, onTitleChange, onBodyInput }) => {
  const { selectLanguage } = useContext(LocaleContext);

  return (
    <div className='add-new-page__input'>
      <input
        className='add-new-page__input__title'
        placeholder={selectLanguage({ id: 'Catatan rahasia', en: 'Secret note' })}
        value={state.title}
        onChange={onTitleChange}
        spellCheck='false'
      />
      <div
        className='add-new-page__input__body'
        contentEditable='true'
        data-placeholder={selectLanguage({ id: 'Sebenarnya, saya adalah ....', en: 'Actually, I am ...' })}
        onInput={onBodyInput}
        spellCheck='false'
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

NoteInput.propTypes = {
  state: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyInput: PropTypes.func.isRequired
};

export default NoteInput;
