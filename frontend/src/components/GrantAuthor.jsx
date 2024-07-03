import { useState, useEffect } from 'react';
import axios from 'axios';

const GrantAuthor = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleGrantAuthor = async () => {
    if (selectedUser) {
      try {
        await axios.patch(`/api/users/${selectedUser}/grant-author/`);
        alert('Author privileges granted successfully!');
        // Optionally update UI or fetch users again
      } catch (error) {
        console.error('Failed to grant author privileges:', error);
        alert('Failed to grant author privileges');
      }
    } else {
      alert('Please select a user');
    }
  };

  return (
    <div>
      <h2>Grant Author Privileges</h2>
      <select onChange={(e) => handleUserSelect(e.target.value)}>
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <button onClick={handleGrantAuthor}>Grant Author</button>
    </div>
  );
};

export default GrantAuthor;
