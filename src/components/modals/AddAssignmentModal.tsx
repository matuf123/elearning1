import React, { useState } from 'react';
import { X, FileCheck2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AddAssignmentModalProps {
  onClose: () => void;
}

export const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ onClose }) => {
  const { subjects, addAssignment, currentUser } = useApp();

  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('2026-11-20T23:59');
  const [maxScore, setMaxScore] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSubject = subjects.find(s => s.id === subjectId);
    if (!selSubject || !title) return;

    addAssignment({
      subjectId,
      subjectName: selSubject.name,
      title,
      instructions,
      dueDate,
      maxScore,
      allowFileUpload: true,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Buat Tugas Baru untuk Siswa
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
              Mata Pelajaran:
            </label>
            <select
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} (Kelas {s.grade} {s.major})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Judul Tugas / Proyek:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Latihan Soal Mandiri Persamaan Maxwell"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tenggat Waktu (Deadline):
              </label>
              <input
                type="datetime-local"
                required
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Bobot Nilai Maksimal:
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={maxScore}
                onChange={e => setMaxScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Petunjuk Pengerjaan & Ketentuan:
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tuliskan butir soal atau instruksi lengkap cara pengerjaan tugas..."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
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
              Terbitkan Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
