import { useState } from 'react';
import API from '../Api';

const EditUser = ({ userId }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    await API.put(`/users/${userId}`, form);
    alert("User updated");
  };

  return (
    <form onSubmit={handleUpdate}>
      <input className='input' name="name" placeholder="Name" onChange={handleChange} />
      <input className='input' name="email" placeholder="Email" onChange={handleChange} />
      <input className='input' name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit" className='button'>Update User</button>
    </form>
  );
};

export default EditUser;
