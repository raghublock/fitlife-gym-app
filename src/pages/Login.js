import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import config from '../config'; // 🚀 Config import kiya

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // 🔗 Dynamic API URL from config
  const API_URL = config.apiUrl;

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in...');

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Token ko browser mein save karein
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminName', data.admin.name);
        toast.success(`Welcome to ${config.appName}! 🎉`, { id: toastId });
        navigate('/dashboard'); // Login ke baad Dashboard par bhejein
      } else {
        toast.error(data.error || 'Login failed', { id: toastId });
      }
    } catch (err) {
      toast.error('Server error. Please try again.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-t-8 border-indigo-600">
        
        {/* 🚀 Dynamic Header Section */}
        <div className="text-center mb-8">
          <span className="text-6xl drop-shadow-md">{config.mainEmoji}</span>
          <h2 className="text-3xl font-black text-slate-800 mt-4 uppercase tracking-tighter">{config.appName}</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{config.branchName} Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:bg-white outline-none font-bold text-slate-700 transition-all" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:bg-white outline-none font-bold text-slate-700 transition-all" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-widest shadow-xl mt-4">
            Login to Dashboard 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
