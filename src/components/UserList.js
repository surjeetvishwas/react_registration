import React, { useState, useEffect } from "react";
import UserDetails from "./UserDetails";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setUsers(existingUsers);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalActive(false);
  };

  return (
    <div className="registered-users-list">
      <h2>Registered Users for the Event</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Date of Submission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.bio}</td>
              <td>{new Date(user.timestamp).toLocaleString()}</td>
              <td>
                <button className="btn" onClick={() => handleUserClick(user)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className={`user-details-modal ${isModalActive ? "active" : ""}`}>
          <UserDetails user={selectedUser} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default UserList;
