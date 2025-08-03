import { useState } from 'react';
import API from '../Api';

const SearchUser = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchUsers = async () => {
    try {
      const res = await API.get(`/users/search?name=${query}`);
      setResults(res.data);
      alert("User Present");
    } catch (error) {
      setResults([]);
      alert("No matching users found");
    }
  };

  return (
    <div>
      <input
        type="text"
        className='input'
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="button" onClick={searchUsers}>Search</button>

      {results.length > 0 && (
        <ul>
          {results.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
