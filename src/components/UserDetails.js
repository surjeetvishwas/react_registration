import React from "react";

const UserDetails = ({ user, onClose }) => {
  return (
    <div className={`user-details-content ${user ? "active" : ""}`}>
      <span className="close-btn" onClick={onClose}>
        &times;
      </span>
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Contact Number:</strong> {user.contactNumber}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
    </div>
  );
};

export default UserDetails;
