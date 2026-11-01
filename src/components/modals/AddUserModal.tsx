import React, { useState } from 'react';
import { X, UserPlus, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

interface AddUserModalProps {
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const { addUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('siswa');
  const [nisn, setNisn] = useState('');
  const [nip, setNip] = useState('');
  const [classRoom, setClassRoom] = useState('XII MIPA 1');
  const [major, setMajor] = useState<'IPA' | 'IPS' | 'Umum'>('IPA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addUser({
      name,
      email,
      role,
      nisn: role === 'siswa' ? nisn || '006' + Math.floor(1000000 + Math.random() * 9000000) : undefined,
      nip: role === 'guru' || role === 'admin' ? nip || '198' + Math.floor(10000000000000 + Math.random() * 90000000000000) : undefined,
      classRoom: role === 'siswa' ? classRoom : undefined,
      major: role === 'siswa' ? major : undefined,
      grade: 'XII',
      avatar:
        role === 'siswa'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      status: 'active',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-purple-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tambah Pengguna Baru
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Peran Akun (Role):
            </label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as Role)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="siswa">Siswa (Peserta Didik)</option>
              <option value="guru">Guru (Tenaga Pendidik)</option>
              <option value="admin">Administrator / Kurikulum</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Nama Lengkap & Gelar:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Rian Anggara / Dra. Tri Wahyuni, M.Pd"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Alamat Email Akun:
            </label>
            <input
              type="email"
              required
              placeholder="nama.pengguna@sman1-edusma.sch.id"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {role === 'siswa' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  NISN Siswa:
                </label>
                <input
                  type="text"
                  placeholder="0064281920"
                  value={nisn}
                  onChange={e => setNisn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kelas & Rombel:
                </label>
                <select
                  value={classRoom}
                  onChange={e => setClassRoom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                >
                  <option value="XII MIPA 1">XII MIPA 1</option>
                  <option value="XII MIPA 2">XII MIPA 2</option>
                  <option value="XII IPS 1">XII IPS 1</option>
                  <option value="XII IPS 2">XII IPS 2</option>
                  <option value="XI MIPA 1">XI MIPA 1</option>
                  <option value="X-1">X-1 (Umum)</option>
                </select>
              </div>
            </div>
          )}

          {(role === 'guru' || role === 'admin') && (
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Induk Pegawai (NIP):
              </label>
              <input
                type="text"
                placeholder="198204152008011005"
                value={nip}
                onChange={e => setNip(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none font-mono"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md"
            >
              Simpan Pengguna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
