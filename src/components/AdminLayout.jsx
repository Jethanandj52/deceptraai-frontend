import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { isAuthenticated } from '../utils/auth';

/** AdminLayout — every recruiter page is wrapped in this: sidebar + topbar + protected redirect. */
export default function AdminLayout({ title, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) navigate('/login');
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-navy text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
