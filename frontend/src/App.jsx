
import LoginForm from './Components/LoginForm';
import UsersList from './Components/UsersList';
import UserSearch from './Components/UserSearch';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser'; 
import './App.css';

const App = () => {
 
  return (
    <div className='main-container'>  
      <h1>User Management</h1>
      <LoginForm />
      <UserSearch />
      <UsersList />
      <AddUser />
      <EditUser userId={1} /> {/* Example userId, replace with actual logic */} 
    </div>
  );
}

export default App;

