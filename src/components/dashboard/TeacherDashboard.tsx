import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  FileCheck2,
  TrendingUp,
  Plus,
  Printer,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Submission } from '../../types';

interface TeacherDashboardProps {
  onOpenAddMaterial: () => void;
  onOpenAddAssignment: () => void;
  onOpenAddQuiz: () => void;
  onOpenPrintReport: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onOpenAddMaterial,
  onOpenAddAssignment,
  onOpenAddQuiz,
  onOpenPrintReport,
}) => {
  const {
    currentUser,
    subjects,
    materials,
    submissions,
    gradeSubmission,
    setActiveTab,
    setSelectedSubjectId,
  } = useApp();

  const [activeGradingSub, setActiveGradingSub] = useState<Submission | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');
  const gradedSubmissions = submissions.filter(s => s.status === 'graded');

  const handleOpenGradingModal = (sub: Submission) => {
    setActiveGradingSub(sub);
    setScoreInput(sub.score || 85);
    setFeedbackInput(sub.feedback || 'Kerja bagus, analisis sangat logis dan sistematis!');
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGradingSub) return;
    gradeSubmission(activeGradingSub.id, Number(scoreInput), feedbackInput);
    setActiveGradingSub(null);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Guru Pengampu • Kurikulum Merdeka</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Bertugas, {currentUser.name}! 📚
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              NIP: <span className="font-mono text-emerald-300">{currentUser.nip}</span>. Kelola bahan ajar interaktif, evaluasi hasil tugas siswa, dan pantau perkembangan nilai akademik secara komprehensif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddMaterial}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Unggah Materi</span>
            </button>
            <button
              onClick={onOpenAddAssignment}
              className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Tugas</span>
            </button>
            <button
              onClick={onOpenPrintReport}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rekap Presensi</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Siswa Yang Diampu
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              144 Siswa
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              4 Kelas (XII MIPA 1 - 4)
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Materi Terpublikasi
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {materials.length} Modul
            </span>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              PDF, Video, & Ringkasan
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tugas Perlu Dinilai
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {pendingSubmissions.length} Masuk
            </span>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> Menunggu evaluasi & nilai
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Rata-rata Nilai Kelas
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              89.2
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              96% Siswa di atas KKM (75)
            </p>
          </div>
        </div>
      </div>

      {/* Grading Queue & Subjects Diampu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antrean Tugas Siswa Perlu Dinilai */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-500" />
                <span>Antrean Tugas Masuk Dari Siswa</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Koreksi lembar jawaban, berikan umpan balik konstruktif, dan input nilai angka.
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {pendingSubmissions.length} Belum Dinilai
            </span>
          </div>

          <div className="space-y-3">
            {pendingSubmissions.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Semua Tugas Sudah Tuntas Dinilai!
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Tidak ada antrean lembar jawaban siswa yang belum diperiksa saat ini.
                </p>
              </div>
            ) : (
              pendingSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {sub.studentName}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {sub.studentClass}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Berkas: <span className="font-mono text-sky-600 dark:text-sky-400">{sub.fileName}</span> ({sub.fileSize})
                    </p>
                    {sub.textAnswer && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-1">
                        "{sub.textAnswer}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleOpenGradingModal(sub)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Beri Nilai & Review</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Recently Graded Section */}
          {gradedSubmissions.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Tugas Yang Baru Dinilai
              </h4>
              <div className="space-y-2">
                {gradedSubmissions.map(sub => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {sub.studentName}
                      </span>{' '}
                      <span className="text-slate-500 dark:text-slate-400">({sub.studentClass})</span>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Catatan: "{sub.feedback}"
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                        {sub.score}
                      </span>
                      <span className="text-[10px] text-slate-400">/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mata Pelajaran Yang Diampu */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>Mata Pelajaran Diampu</span>
              <button
                onClick={() => setActiveTab('subjects')}
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
              >
                Lihat Semua
              </button>
            </h3>

            <div className="mt-4 space-y-3">
              {subjects.slice(0, 3).map(subj => (
                <div
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    setActiveTab('subjects');
                  }}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {subj.code} • KKM: {subj.kkm}
                    </span>
                    <span className="text-xs text-slate-400">Kelas {subj.grade}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">
                    {subj.name}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span>{subj.totalMaterials} Modul</span>
                    <span>{subj.totalAssignments} Tugas</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                      Kelola <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Bank Soal shortcut */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-sky-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-sky-500" />
              <span>Simulasi Ujian Digital</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Anda dapat merancang paket soal simulasi UTBK dan kuis harian dengan timer otomatis dan koreksi instan untuk mempermudah evaluasi berkala siswa.
            </p>
            <button
              onClick={onOpenAddQuiz}
              className="mt-3 w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              + Buat Paket Soal Baru
            </button>
          </div>
        </div>
      </div>

      {/* Modal Penilaian Tugas Siswa */}
      {activeGradingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Form Penilaian & Umpan Balik Siswa
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeGradingSub.studentName} • {activeGradingSub.studentClass}
                </p>
              </div>
              <button
                onClick={() => setActiveGradingSub(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Submission Preview Details */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Berkas yang Diunggah:</span>
                <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">
                  {activeGradingSub.fileName}
                </span>
              </div>
              {activeGradingSub.textAnswer && (
                <div>
                  <span className="text-slate-500 font-medium">Jawaban / Catatan Siswa:</span>
                  <p className="mt-1 p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 leading-relaxed">
                    {activeGradingSub.textAnswer}
                  </p>
                </div>
              )}
            </div>

            {/* Form Input Score & Feedback */}
            <form onSubmit={handleSaveGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nilai Angka (Skala 0 - 100):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreInput}
                  onChange={e => setScoreInput(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Umpan Balik Guru (Feedback Konstruktif):
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={e => setFeedbackInput(e.target.value)}
                  placeholder="Tuliskan catatan apresiasi atau evaluasi perbaikan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveGradingSub(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all"
                >
                  Simpan Nilai Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
