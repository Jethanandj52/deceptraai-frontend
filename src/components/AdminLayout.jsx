import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { isAuthenticated } from '../utils/auth';

export default function AdminLayout({ title, children }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 min-w-0 flex flex-col">

        <Topbar
          title={title}
          setIsOpen={setIsOpen}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="flex-1 w-full p-4 sm:p-5 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>

      </div>
    </div>
  );
}