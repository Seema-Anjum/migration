import { useEffect, useState } from 'react';
import API from '../Api';
import './App.css'; 

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    alert("User deleted");
    fetchUsers(); // Refresh list
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button className="button" onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
