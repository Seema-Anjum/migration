import { useState } from 'react';
import API from '../Api';
import { login } from '../auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await API.post('/users/login', { email, password });
    login(res.data.token);
    alert('Login successful!');
    if(!res.data.token){
      alert('Login failed. Please check your credentials.');
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className='input' value={email} onChange={onChangeEmail} placeholder="Email" />
      <input className='input' type="password" value={password} onChange={onChangePassword}
       autoComplete="current-password" placeholder="Password" />
      <button type="submit" className='button'>Login</button>
    </form>
  );
}

export default LoginForm;