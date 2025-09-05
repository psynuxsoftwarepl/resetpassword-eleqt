import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'; // Make sure this path is correct

const figurines = [
  'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f512.png', // lock
  'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4dd.png', // pencil
  'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f511.png', // key
];

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validation
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://backend-6q56.onrender.com/api/v1/user/password/reset/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(data.message || 'Reset Password Successfully.');
      } else {
        setMessage(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setMessage('Error resetting password.');
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-content">
        <div className="figurines">
          {figurines.map((src, i) => (
            <img key={i} src={src} alt="figurine" className="figurine" />
          ))}
        </div>
        <div className="reset-card">
          <h2>Reset Your Password</h2>
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
            </div>
            <div className="input-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save Password'}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
