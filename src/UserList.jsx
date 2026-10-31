import { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Runs once, when the component first appears
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="message">Loading users...</p>;
  }

  if (error) {
    return <p className="message error">Could not load users: {error}</p>;
  }

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Click once to open the details, click again to close them
  const toggleUser = (id) => {
    setSelectedUserId(selectedUserId === id ? null : id);
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 && <p className="message">No users match "{search}".</p>}

      <div className="user-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card" onClick={() => toggleUser(user.id)}>
            <div className="avatar">{user.name.charAt(0)}</div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p className="company">{user.company.name}</p>

            {selectedUserId === user.id ? (
              <div className="details">
                <p>
                  <strong>Address:</strong> {user.address.street}, {user.address.suite},{' '}
                  {user.address.city} {user.address.zipcode}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Website:</strong> {user.website}
                </p>
                <span className="hint">Click to close ▲</span>
              </div>
            ) : (
              <span className="hint">Click for details ▼</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
