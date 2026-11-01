import React, { useState } from 'react';
import {
  BellRing,
  Plus,
  Trash2,
  AlertCircle,
  Megaphone,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminAnnouncementsProps {
  onOpenAddAnnouncement: () => void;
}

export const AdminAnnouncements: React.FC<AdminAnnouncementsProps> = ({
  onOpenAddAnnouncement,
}) => {
  const { announcements, deleteAnnouncement } = useApp();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BellRing className="w-6 h-6 text-sky-500" />
            <span>Pengumuman & Siaran Informasi Sekolah</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola pengumuman running text banner, jadwal ujian, dan informasi akademik untuk seluruh warga SMA.
          </p>
        </div>

        <button
          onClick={onOpenAddAnnouncement}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/25 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Pengumuman Baru</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map(item => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    item.isUrgent
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse'
                      : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                  }`}
                >
                  {item.isUrgent ? 'URGENT' : item.category}
                </span>
                <span className="text-xs text-slate-400">
                  Diterbitkan oleh: <strong>{item.author}</strong> • {item.date}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.content}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 self-end sm:self-start">
              <button
                onClick={() => deleteAnnouncement(item.id)}
                className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
                title="Hapus Pengumuman"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
