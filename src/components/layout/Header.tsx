import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  UserCheck,
  BookOpen,
  Shield,
  Menu,
  X,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const {
    currentUser,
    switchRole,
    theme,
    toggleTheme,
    setIsSearchOpen,
    notifications,
    markNotificationsAsRead,
    announcements,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const urgentAnnouncement = announcements.find(a => a.isUrgent) || announcements[0];

  const handleRoleSelect = (role: Role) => {
    switchRole(role);
    setIsRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Running Marquee Announcement Bar */}
      {urgentAnnouncement && (
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white text-xs py-1.5 px-4 flex items-center justify-between overflow-hidden shadow-inner">
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="flex items-center gap-1 font-semibold px-2 py-0.5 bg-white/20 rounded text-[11px] uppercase tracking-wider shrink-0">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              Info Penting
            </span>
            <div className="truncate text-slate-100 font-medium">
              <span className="font-semibold">{urgentAnnouncement.title}:</span> {urgentAnnouncement.content}
            </div>
          </div>
          <span className="text-[11px] text-sky-100 shrink-0 ml-4 hidden md:inline">
            TP 2026/2027 • SMAN 1 Edukasi
          </span>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  Edu<span className="text-sky-500">SMA</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  LMS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block -mt-1 font-medium">
                SMA Negeri 1 Edukasi
              </p>
            </div>
          </div>
        </div>

        {/* Center: Quick Search Trigger Button */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all shadow-xs group"
          >
            <span className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
              <span className="text-slate-500 dark:text-slate-400">Cari materi, tugas, atau matpel...</span>
            </span>
            <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Actions: Search (Mobile), DarkMode, Notifications, Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Cari"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
                if (!isNotifDropdownOpen) markNotificationsAsRead();
              }}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              )}
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Notifikasi Akademik</h4>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">Semua dibaca</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-3"
                    >
                      <span
                        className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                          notif.type === 'success'
                            ? 'bg-emerald-500'
                            : notif.type === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-sky-500'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                          {notif.text}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Role Switcher (Mock Authentication) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left group"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-sky-500/30"
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                      currentUser.role === 'siswa'
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        : currentUser.role === 'guru'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {currentUser.role === 'siswa'
                    ? currentUser.classRoom
                    : currentUser.role === 'guru'
                    ? 'Guru Mata Pelajaran'
                    : 'Admin Kurikulum'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
            </button>

            {/* Role Switcher Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Ganti Peran Pengguna (Mock Auth)
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Uji coba aplikasi dengan hak akses berbeda:
                  </p>
                </div>

                <div className="p-1 space-y-1">
                  {/* Siswa Option */}
                  <button
                    onClick={() => handleRoleSelect('siswa')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                      currentUser.role === 'siswa'
                        ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/60 text-sky-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Peran: Siswa (SMA)</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Ahmad Rizky (XII MIPA 1)
                      </div>
                    </div>
                  </button>

                  {/* Guru Option */}
                  <button
                    onClick={() => handleRoleSelect('guru')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                      currentUser.role === 'guru'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Peran: Guru Pengampu</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Dra. Siti Rahmawati, M.Pd
                      </div>
                    </div>
                  </button>

                  {/* Admin Option */}
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                      currentUser.role === 'admin'
                        ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-600 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Peran: Administrator</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Bambang Haryanto, S.Kom
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
