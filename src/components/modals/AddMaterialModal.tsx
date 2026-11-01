import React, { useState } from 'react';
import { X, Upload, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialType } from '../../types';

interface AddMaterialModalProps {
  onClose: () => void;
}

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({ onClose }) => {
  const { subjects, addMaterial } = useApp();

  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<MaterialType>('pdf');
  const [duration, setDuration] = useState('24 Halaman');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSubject = subjects.find(s => s.id === subjectId);
    if (!selSubject || !title) return;

    addMaterial({
      subjectId,
      subjectName: selSubject.name,
      title,
      description,
      type,
      duration: type === 'video' ? '15 Menit' : duration,
      size: type === 'pdf' ? '3.5 MB' : undefined,
      content: content || 'Materi pembelajaran resmi kurikulum SMA Negeri 1 Edukasi.',
      videoUrl: type === 'video' ? videoUrl : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Unggah Modul / Bahan Ajar Baru
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
              Judul Modul / Topik:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Modul Bab 3: Medan Magnetik & Induksi Faraday"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tipe Materi:
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as MaterialType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="pdf">Dokumen PDF</option>
                <option value="video">Video Pembelajaran</option>
                <option value="article">Artikel / Ringkasan</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Keterangan Panjang:
              </label>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="misal: 28 Halaman / 20 Menit"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Deskripsi Singkat Materi:
            </label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan kompetensi dasar atau poin penting yang dibahas..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {type === 'video' ? (
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Link Embed YouTube Video:
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
          ) : (
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Isi Teks / Rangkuman Modul:
              </label>
              <textarea
                rows={3}
                placeholder="Tuliskan rumus atau catatan penting yang bisa langsung dibaca siswa..."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md"
            >
              Publikasikan Materi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
