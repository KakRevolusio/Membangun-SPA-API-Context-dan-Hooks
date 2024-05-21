import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

const RegisterInput = ({ register }) => {
  const { selectLanguage } = useContext(LocaleContext);
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert(selectLanguage({ id: 'Password dan konfirmasi password harus sama.', en: 'Password and password confirm must be same.' }));
    }

    register({
      name,
      email,
      password
    });
  };

  return (
    <div className='input-register'>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='name'>{selectLanguage({ id: 'Nama', en: 'Name' })}</label>
        <input type='text' id='name' value={name} onChange={onNameChange} />
        <label htmlFor='email'>{selectLanguage({ id: 'Email', en: 'Email' })}</label>
        <input type='email' id='email' value={email} onChange={onEmailChange} autoComplete='new-email' />
        <label htmlFor='password'>{selectLanguage({ id: 'Kata Sandi', en: 'Password' })}</label>
        <input type='password' id='password' value={password} onChange={onPasswordChange} autoComplete='new-password' />
        <label htmlFor='confirmPassword'>{selectLanguage({ id: 'Konfirmasi Kata Sandi', en: 'Confirm Password' })}</label>
        <input
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          autoComplete='new-confirm-password'
        />
        <button type='submit'>{selectLanguage({ id: 'Daftar', en: 'Register' })}</button>
      </form>
    </div>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegisterInput;
