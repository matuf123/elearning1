import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Shield,
  Trash2,
  KeyRound,
  CheckCircle,
  XCircle,
  UserCheck,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User, Role } from '../../types';

interface AdminUserManagementProps {
  onOpenAddUser: () => void;
}

export const AdminUserManagement: React.FC<AdminUserManagementProps> = ({ onOpenAddUser }) => {
  const {
    users,
    updateUserStatus,
    deleteUser,
    addToast,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('semua');

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'semua' || user.role === roleFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.nisn && user.nisn.includes(searchQuery)) ||
      (user.nip && user.nip.includes(searchQuery));
    return matchesRole && matchesSearch;
  });

  const handleResetPassword = (name: string) => {
    addToast(`Tautan reset password berhasil dikirim ke email ${name}.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-500" />
            <span>Manajemen Akun Pengguna Sekolah</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola hak akses portal bagi Siswa SMA, Dewan Guru Pengampu, dan Staf Tata Usaha.
          </p>
        </div>

        <button
          onClick={onOpenAddUser}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/25 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Pengguna Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, email, NISN, atau NIP..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
          {['semua', 'siswa', 'guru', 'admin'].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                roleFilter === r
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                <th className="py-3.5 px-4">Pengguna</th>
                <th className="py-3.5 px-4">Peran (Role)</th>
                <th className="py-3.5 px-4">Identitas (NISN/NIP)</th>
                <th className="py-3.5 px-4">Kelas / Rombel</th>
                <th className="py-3.5 px-4 text-center">Status Akun</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredUsers.map(user => {
                const isCurrent = user.id === currentUser.id;

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-700 font-bold">
                                Anda
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 text-[11px]">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                          user.role === 'siswa'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : user.role === 'guru'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {user.nisn || user.nip || '-'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {user.classRoom || (user.role === 'guru' ? 'Dewan Guru SMA' : 'Tata Usaha')}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() =>
                          updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')
                        }
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          user.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                        title="Klik untuk ubah status aktif/nonaktif"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        <span className="capitalize">{user.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleResetPassword(user.name)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Reset Password"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                        {!isCurrent && (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600"
                            title="Hapus Akun"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
