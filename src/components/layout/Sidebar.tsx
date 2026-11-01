import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  Award,
  CalendarDays,
  GraduationCap,
  Users,
  BellRing,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const { currentUser, activeTab, setActiveTab, setSelectedSubjectId } = useApp();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedSubjectId(null);
    onCloseMobileMenu();
  };

  // Build nav items dynamically based on role
  const getNavItems = () => {
    if (currentUser.role === 'siswa') {
      return [
        { id: 'dashboard', label: 'Dashboard Siswa', icon: LayoutDashboard },
        { id: 'subjects', label: 'Mata Pelajaran (Matpel)', icon: BookOpen },
        { id: 'assignments', label: 'Tugas Belajar', icon: FileCheck2 },
        { id: 'quizzes', label: 'Simulasi Kuis & UTBK', icon: Award },
        { id: 'schedule', label: 'Jadwal Pelajaran', icon: CalendarDays },
        { id: 'grades', label: 'Rekap Nilai & Rapor', icon: GraduationCap },
      ];
    } else if (currentUser.role === 'guru') {
      return [
        { id: 'dashboard', label: 'Dashboard Guru', icon: LayoutDashboard },
        { id: 'subjects', label: 'Manajemen Materi', icon: BookOpen },
        { id: 'assignments', label: 'Koreksi & Nilai Tugas', icon: FileCheck2 },
        { id: 'quizzes', label: 'Bank Soal & Kuis', icon: Award },
        { id: 'schedule', label: 'Jadwal Mengajar', icon: CalendarDays },
        { id: 'reports', label: 'Cetak Presensi & Rapor', icon: Printer },
      ];
    } else {
      // Admin
      return [
        { id: 'dashboard', label: 'Dashboard Admin', icon: LayoutDashboard },
        { id: 'users', label: 'Kelola Pengguna', icon: Users },
        { id: 'subjects', label: 'Daftar Matpel SMA', icon: BookOpen },
        { id: 'announcements', label: 'Pengumuman Sekolah', icon: BellRing },
        { id: 'schedule', label: 'Kalender Akademik', icon: CalendarDays },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={onCloseMobileMenu}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between overflow-y-auto ${
          isMobileMenuOpen ? 'left-0' : '-left-64 md:left-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* User profile snippet */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-slate-800/60 dark:to-slate-800/30 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-sky-500/30 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.role === 'siswa'
                    ? `${currentUser.classRoom} • NISN: ${currentUser.nisn}`
                    : currentUser.role === 'guru'
                    ? `NIP: ${currentUser.nip?.substring(0, 10)}...`
                    : 'Admin Kurikulum'}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                    Aktif Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Menu Utama ({currentUser.role.toUpperCase()})
            </p>
            <nav className="space-y-1 mt-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all text-left ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer School Badge */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 text-center">
            <div className="flex items-center justify-center gap-1.5 text-sky-700 dark:text-sky-300 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SMAN 1 Edukasi</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Akreditasi A • NPSN: 20104812
            </p>
            <p className="text-[9px] text-slate-400 mt-1">
              Kurikulum Merdeka 2026/2027
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
