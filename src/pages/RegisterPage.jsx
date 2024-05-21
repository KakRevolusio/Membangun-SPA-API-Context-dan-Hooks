import React, { useContext } from 'react';
import RegisterInput from '../components/RegisterInput';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/network-data';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const { selectLanguage } = useContext(LocaleContext);
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error, message } = await register(user);
    if (!error) {
      alert('User created successfully');
      navigate('/');
    }
  }

  return (
    <section className='register-page'>
      <h2>{selectLanguage({ id: 'Isi form untuk mendaftar akun.', en: 'Fill the form to register account.' })}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {selectLanguage({ id: 'Sudah punya akun?', en: 'Already have an account' })}{' '}
        <Link to='/'>{selectLanguage({ id: 'Login di sini', en: 'Login here' })}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
