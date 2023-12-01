import React, { useState } from 'react';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setUserIdError('');
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ name, user_id: userId, email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setNameError(data.errors.name);
        setUserIdError(data.errors.user_id);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        // Handle successful signup
        // For example, redirect to home page
        window.location.assign('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label htmlFor="user_id">Id</label>
      <input
        type="text"
        name="user_id"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <div className="user_id error">{userIdError}</div>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="name error">{nameError}</div>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="email error">{emailError}</div>

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="password error">{passwordError}</div>
      
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;
