import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

const LoginInput = ({ login }) => {
  const { selectLanguage } = useContext(LocaleContext);
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({
      email,
      password
    });
  };

  return (
    <div className='input-login'>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' value={email} onChange={onEmailChange} autoComplete='new-email' />
        <label htmlFor='password'>{selectLanguage({ id: 'Kata Sandi', en: 'Password' })}</label>
        <input type='password' id='password' value={password} onChange={onPasswordChange} autoComplete='new-password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginInput;
