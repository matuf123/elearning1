import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  GraduationCap,
  Layers,
  FileText,
  FileCheck2,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Subject, Major, GradeLevel } from '../../types';
import { SubjectDetailModal } from './SubjectDetailModal';

interface SubjectsModuleProps {
  onOpenAddMaterial: () => void;
  onOpenAddAssignment: () => void;
}

export const SubjectsModule: React.FC<SubjectsModuleProps> = ({
  onOpenAddMaterial,
  onOpenAddAssignment,
}) => {
  const {
    subjects,
    currentUser,
    selectedSubjectId,
    setSelectedSubjectId,
  } = useApp();

  const [selectedMajor, setSelectedMajor] = useState<string>('Semua');
  const [selectedGrade, setSelectedGrade] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected subject for detail modal
  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || null;

  // Filtering
  const filteredSubjects = subjects.filter(subject => {
    const matchesMajor =
      selectedMajor === 'Semua' || subject.major === selectedMajor;
    const matchesGrade =
      selectedGrade === 'Semua' || subject.grade === selectedGrade;
    const matchesQuery =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMajor && matchesGrade && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Module Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-sky-500" />
            <span>Mata Pelajaran SMA (Kurikulum Merdeka)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Daftar seluruh mata pelajaran wajib dan peminatan lengkap dengan modul materi, penugasan, dan forum tanya jawab.
          </p>
        </div>

        {currentUser.role === 'guru' && (
          <button
            onClick={onOpenAddMaterial}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/25 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Unggah Materi Baru</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari matpel atau guru..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
          {/* Jurusan Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
            {['Semua', 'IPA', 'IPS', 'Umum'].map(major => (
              <button
                key={major}
                onClick={() => setSelectedMajor(major)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedMajor === major
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {major}
              </button>
            ))}
          </div>

          {/* Tingkat Kelas Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
            {['Semua', 'X', 'XI', 'XII'].map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedGrade === grade
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {grade === 'Semua' ? 'Semua Kelas' : `Kelas ${grade}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
            Tidak ada mata pelajaran yang cocok
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Coba ubah filter jurusan, tingkat kelas, atau kata kunci pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map(subject => (
            <div
              key={subject.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              {/* Card Banner */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={subject.bannerImg}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-white font-mono font-bold text-[11px] border border-white/20">
                    {subject.code}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase backdrop-blur-md ${
                      subject.major === 'IPA'
                        ? 'bg-blue-500/80 text-white'
                        : subject.major === 'IPS'
                        ? 'bg-amber-500/80 text-white'
                        : 'bg-emerald-500/80 text-white'
                    }`}
                  >
                    {subject.category} • {subject.major}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                    Kelas {subject.grade} SMA
                  </span>
                  <h3 className="font-extrabold text-lg text-white leading-tight">
                    {subject.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>

                {/* Teacher Info */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <img
                    src={subject.teacherAvatar}
                    alt={subject.teacherName}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                      Guru Pengampu
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {subject.teacherName}
                    </p>
                  </div>
                </div>

                {/* Subject Metrics */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Materi</span>
                    <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {subject.totalMaterials} Modul
                    </p>
                  </div>
                  <div className="border-x border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Tugas</span>
                    <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {subject.totalAssignments} Sesi
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">KKM</span>
                    <p className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {subject.kkm}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedSubjectId(subject.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5 transition-all group-hover:shadow-lg"
                >
                  <span>Buka Modul Belajar</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subject Detail Modal */}
      {activeSubject && (
        <SubjectDetailModal
          subject={activeSubject}
          onClose={() => setSelectedSubjectId(null)}
          onOpenAddMaterial={onOpenAddMaterial}
          onOpenAddAssignment={onOpenAddAssignment}
        />
      )}
    </div>
  );
};
