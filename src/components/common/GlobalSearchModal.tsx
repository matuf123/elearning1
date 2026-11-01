import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, CheckCircle2, User, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    subjects,
    materials,
    assignments,
    users,
    setActiveTab,
    setSelectedSubjectId,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredSubjects = trimmed
    ? subjects.filter(
        s =>
          s.name.toLowerCase().includes(trimmed) ||
          s.code.toLowerCase().includes(trimmed) ||
          s.description.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredMaterials = trimmed
    ? materials.filter(
        m =>
          m.title.toLowerCase().includes(trimmed) ||
          m.subjectName.toLowerCase().includes(trimmed) ||
          m.description.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredAssignments = trimmed
    ? assignments.filter(
        a =>
          a.title.toLowerCase().includes(trimmed) ||
          a.subjectName.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredTeachers = trimmed
    ? users.filter(
        u =>
          u.role === 'guru' &&
          (u.name.toLowerCase().includes(trimmed) || u.email.toLowerCase().includes(trimmed))
      )
    : [];

  const hasResults =
    filteredSubjects.length > 0 ||
    filteredMaterials.length > 0 ||
    filteredAssignments.length > 0 ||
    filteredTeachers.length > 0;

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    setActiveTab('subjects');
    setIsSearchOpen(false);
  };

  const handleSelectAssignment = () => {
    setActiveTab('assignments');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Input bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ketik nama mata pelajaran, judul materi, tugas, atau nama guru..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 space-y-4">
          {!trimmed && (
            <div className="py-8 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Pencarian Cepat EduSMA
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Cari materi pembelajaran Fisika, Matematika, tugas sekolah, ujian, atau direktori guru pengampu.
              </p>
            </div>
          )}

          {trimmed && !hasResults && (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Tidak ada hasil untuk "{query}"
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Coba gunakan kata kunci lain seperti "Fisika", "Limit", "Gelombang", atau "Tugas".
              </p>
            </div>
          )}

          {/* Subjects */}
          {filteredSubjects.length > 0 && (
            <div className="pt-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-500" /> Mata Pelajaran SMA ({filteredSubjects.length})
              </h4>
              <div className="space-y-1">
                {filteredSubjects.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                        {sub.name} ({sub.code})
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Kelas {sub.grade} {sub.major} • {sub.teacherName}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {filteredMaterials.length > 0 && (
            <div className="pt-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-500" /> Materi Pembelajaran ({filteredMaterials.length})
              </h4>
              <div className="space-y-1">
                {filteredMaterials.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => handleSelectSubject(mat.subjectId)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-sky-500">
                        {mat.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {mat.subjectName} • {mat.type.toUpperCase()} • {mat.duration || mat.size}
                      </div>
                    </div>
                    <span className="text-xs text-sky-500 font-medium shrink-0 flex items-center gap-1">
                      Buka Materi <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Assignments */}
          {filteredAssignments.length > 0 && (
            <div className="pt-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tugas & Evaluasi ({filteredAssignments.length})
              </h4>
              <div className="space-y-1">
                {filteredAssignments.map(asg => (
                  <button
                    key={asg.id}
                    onClick={handleSelectAssignment}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-500">
                        {asg.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {asg.subjectName} • Tenggat:{' '}
                        {new Date(asg.dueDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teachers */}
          {filteredTeachers.length > 0 && (
            <div className="pt-3">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" /> Guru Pengampu ({filteredTeachers.length})
              </h4>
              <div className="space-y-1">
                {filteredTeachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40"
                  >
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-300 dark:ring-slate-700"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {teacher.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        NIP: {teacher.nip || '-'} • {teacher.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
