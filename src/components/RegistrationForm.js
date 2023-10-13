import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!/^\d{10}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = "Invalid contact number";
      valid = false;
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
      valid = false;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    if (existingUsers.some((user) => user.email === formData.email.trim())) {
      newErrors.email = "Email has already been submitted";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const registeredUser = {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        bio: formData.bio,
        timestamp: new Date().toISOString(),
      };

      const existingUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const updatedUsers = [...existingUsers, registeredUser];

      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        bio: "",
      });

      window.location.reload();
    } else {
      console.log("Form contains errors");
    }
  };
  const handleFocus = (e) => {
    e.target.parentElement.classList.add("input-focused");
  };

  const handleBlur = (e) => {
    e.target.parentElement.classList.remove("input-focused");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Full Name"
        required
      />
      <span className="error">{errors.fullName}</span>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Email"
        required
      />
      <span className="error">{errors.email}</span>

      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Contact Number"
        required
      />
      <span className="error">{errors.contactNumber}</span>

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Bio"
        required
      />
      <span className="error">{errors.bio}</span>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
