import React from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  ShieldAlert,
  BellRing,
  Plus,
  ArrowRight,
  Sparkles,
  Server,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardProps {
  onOpenAddAnnouncement: () => void;
  onOpenAddUser: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onOpenAddAnnouncement,
  onOpenAddUser,
}) => {
  const {
    currentUser,
    users,
    subjects,
    announcements,
    setActiveTab,
  } = useApp();

  const totalSiswa = users.filter(u => u.role === 'siswa').length;
  const totalGuru = users.filter(u => u.role === 'guru').length;

  return (
    <div className="space-y-6">
      {/* Admin Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md text-xs font-semibold text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pusat Kendali Administrasi & Kurikulum SMAN 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang, Administrator {currentUser.name.split(' ')[0]}! 🛡️
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tahun Pelajaran <strong className="text-white">2026/2027 Semester Gasal</strong>. Kelola hak akses akun pendidik, data peserta didik, broadcast pengumuman sekolah, serta kesiapan bank soal ujian.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddUser}
              className="px-3.5 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Akun</span>
            </button>
            <button
              onClick={onOpenAddAnnouncement}
              className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all"
            >
              <BellRing className="w-4 h-4" />
              <span>+ Buat Pengumuman</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 School Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Siswa */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Peserta Didik
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              720 Siswa
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Kelas X, XI, XII (Terdata {totalSiswa} akun aktif)
            </p>
          </div>
        </div>

        {/* Guru & Staf */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tenaga Pendidik
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              48 Guru
            </span>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              100% Bersertifikasi Pendidik
            </p>
          </div>
        </div>

        {/* Rombel / Kelas */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Rombongan Belajar
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              24 Kelas
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              8 Rombel per Tingkat
            </p>
          </div>
        </div>

        {/* Mata Pelajaran */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Mata Pelajaran SMA
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {subjects.length} Matpel
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              IPA, IPS, & Mapel Umum
            </p>
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management Quick Preview */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Pengguna Terdaftar Baru-baru Ini</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Daftar akun siswa dan pengajar dengan hak akses LMS.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('users')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              Kelola Semua Akun <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800/80">
            {users.slice(0, 5).map(user => (
              <div
                key={user.id}
                className="py-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {user.email} {user.nisn ? `• NISN: ${user.nisn}` : user.nip ? `• NIP: ${user.nip}` : ''}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      user.role === 'siswa'
                        ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        : user.role === 'guru'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    {user.role}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                    title={user.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School Announcements Manager preview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BellRing className="w-4 h-4 text-sky-500" />
                <span>Pengumuman Aktif</span>
              </h3>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
              >
                Kelola
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {announcements.map(ann => (
                <div
                  key={ann.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                        ann.isUrgent
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                      }`}
                    >
                      {ann.isUrgent ? 'URGENT' : ann.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white">
                    {ann.title}
                  </h5>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* System Environment */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Server className="w-4 h-4 text-emerald-500" />
              <span>Status Server LMS & Integrasi</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Vercel Build Target:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Production Ready</span>
              </div>
              <div className="flex justify-between">
                <span>Versi React & Tailwind:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">React 19 + Tailwind v4</span>
              </div>
              <div className="flex justify-between">
                <span>Penyimpanan Data:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">Self-Contained Client State</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
