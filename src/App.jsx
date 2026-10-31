import UserList from './UserList';

function App() {
  return (
    <div className="app">
      <header>
        <h1>User Directory</h1>
        <p>Data from the JSONPlaceholder API</p>
      </header>
      <UserList />
    </div>
  );
}

export default App;
