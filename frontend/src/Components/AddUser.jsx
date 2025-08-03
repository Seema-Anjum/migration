import { useState, useEffect} from 'react';
import API from '../Api';

const AddUser = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
const [users, setUsers] = useState([]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/users', form);
    alert("User added successfully");
    fetchUsers(); // Refresh user list after addition
    setForm({ name: '', email: '', password: '' }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='input' name="name" value={form.name} placeholder="Name" onChange={handleChange} />
      <input className='input' name="email" value={form.email} placeholder="Email" onChange={handleChange} />
      <input className='input' name="password" value={form.password} placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit" className='button'>Add User</button>
    </form>
  );
};

export default AddUser;
