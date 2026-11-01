import React, { useState } from 'react';
import { X, BellRing, Megaphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AddAnnouncementModalProps {
  onClose: () => void;
}

export const AddAnnouncementModal: React.FC<AddAnnouncementModalProps> = ({ onClose }) => {
  const { addAnnouncement, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Akademik' | 'Ujian' | 'Ekstrakurikuler' | 'Umum'>('Akademik');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      content,
      category,
      isUrgent,
      author: currentUser.name,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Buat Siaran Pengumuman Sekolah
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
              Kategori Pengumuman:
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Akademik">Akademik & Pembelajaran</option>
              <option value="Ujian">Ujian & Evaluasi (UTS/UAS)</option>
              <option value="Ekstrakurikuler">Ekstrakurikuler & OSIS</option>
              <option value="Umum">Informasi Umum Sekolah</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Judul Pengumuman:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Jadwal Pelaksanaan Ujian Akhir Semester"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Isi Pengumuman:
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tuliskan detail pengumuman yang akan disiarkan ke siswa dan guru..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <input
              type="checkbox"
              id="urgent"
              checked={isUrgent}
              onChange={e => setIsUrgent(e.target.checked)}
              className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
            />
            <label htmlFor="urgent" className="text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
              Tayangkan di Running Text Banner Utama (Urgent)
            </label>
          </div>

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
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md"
            >
              Terbitkan Pengumuman
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
