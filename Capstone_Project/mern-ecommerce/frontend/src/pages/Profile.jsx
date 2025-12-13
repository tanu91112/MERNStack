import React, { useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

export default function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/profile');
        setProfile({
          name: res.data.name,
          email: res.data.email
        });
      } catch (err) {
        addNotification({ type: 'error', title: 'Error', message: 'Failed to load profile' });
      }
    };

    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password && password !== confirmPassword) {
      addNotification({ type: 'error', title: 'Error', message: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      const res = await API.put('/auth/profile', {
        name: profile.name,
        email: profile.email,
        ...(password && { password })
      });

      dispatch({ type: 'LOGIN', payload: res.data });
      addNotification({ type: 'success', title: 'Success', message: 'Profile updated successfully' });
    } catch (err) {
      addNotification({ type: 'error', title: 'Error', message: err.response?.data?.message || 'Profile update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password (leave blank to keep current)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            minLength="6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            minLength="6"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}