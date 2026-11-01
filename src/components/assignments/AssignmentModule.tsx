import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  FileText,
  MessageSquare,
  Award,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Assignment, Submission } from '../../types';

interface AssignmentModuleProps {
  onOpenAddAssignment: () => void;
}

export const AssignmentModule: React.FC<AssignmentModuleProps> = ({ onOpenAddAssignment }) => {
  const {
    currentUser,
    assignments,
    submissions,
    submitAssignment,
    gradeSubmission,
  } = useApp();

  const [filterTab, setFilterTab] = useState<'semua' | 'pending' | 'submitted' | 'graded'>('semua');

  // Submitting modal state (for student)
  const [activeSubmitAsg, setActiveSubmitAsg] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [mockFileName, setMockFileName] = useState('');

  // Grading modal state (for teacher)
  const [activeGradingSub, setActiveGradingSub] = useState<Submission | null>(null);
  const [gradingScore, setGradingScore] = useState<number>(85);
  const [gradingFeedback, setGradingFeedback] = useState<string>('');

  // Filtering assignments
  const filteredAssignments = assignments.filter(asg => {
    if (filterTab === 'semua') return true;
    return asg.status === filterTab;
  });

  // Handle student submit
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmitAsg) return;
    submitAssignment(
      activeSubmitAsg.id,
      submissionText,
      mockFileName || `Tugas_${activeSubmitAsg.subjectName.split(' ')[0]}_${currentUser.name.replace(/\s+/g, '_')}.pdf`
    );
    setActiveSubmitAsg(null);
    setSubmissionText('');
    setMockFileName('');
  };

  // Handle teacher grade
  const handleTeacherGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGradingSub) return;
    gradeSubmission(activeGradingSub.id, Number(gradingScore), gradingFeedback);
    setActiveGradingSub(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-sky-500" />
            <span>Portal Penugasan & Evaluasi Siswa</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {currentUser.role === 'siswa'
              ? 'Pantau tenggat waktu, serahkan berkas laporan/praktikum, dan cek catatan koreksi dari guru.'
              : 'Periksa berkas tugas yang dikirimkan siswa, masukkan nilai angka, dan berikan evaluasi.'}
          </p>
        </div>

        {currentUser.role === 'guru' && (
          <button
            onClick={onOpenAddAssignment}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/25 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat Tugas Baru</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit text-xs font-semibold">
        <button
          onClick={() => setFilterTab('semua')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterTab === 'semua'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Semua Tugas ({assignments.length})
        </button>
        <button
          onClick={() => setFilterTab('pending')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterTab === 'pending'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Belum Selesai ({assignments.filter(a => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterTab('submitted')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterTab === 'submitted'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Terkirim ({assignments.filter(a => a.status === 'submitted').length})
        </button>
        <button
          onClick={() => setFilterTab('graded')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterTab === 'graded'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sudah Dinilai ({assignments.filter(a => a.status === 'graded').length})
        </button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map(asg => {
          const submission = submissions.find(s => s.assignmentId === asg.id);
          const isOverdue = new Date(asg.dueDate) < new Date();
          const dueDateFormatted = new Date(asg.dueDate).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={asg.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-500/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 uppercase">
                      {asg.subjectName}
                    </span>
                    <span className="text-xs text-slate-400">
                      Guru: <strong>{asg.teacherName}</strong>
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {asg.title}
                  </h3>
                </div>

                {/* Status Badges */}
                <div className="shrink-0 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      asg.status === 'graded'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : asg.status === 'submitted'
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                        : isOverdue
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {asg.status === 'graded'
                      ? '✓ Dinilai'
                      : asg.status === 'submitted'
                      ? '✓ Terkirim'
                      : isOverdue
                      ? 'Lewat Tenggat'
                      : 'Belum Selesai'}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {asg.instructions}
              </p>

              {/* Teacher Grading Feedback Box if graded */}
              {submission && submission.status === 'graded' && (
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-500" />
                      Hasil Evaluasi Guru
                    </span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      Nilai: {submission.score} / 100
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                    "{submission.feedback || 'Hasil pengerjaan sangat memuaskan!'}"
                  </p>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>
                    Batas Pengumpulan: <strong>{dueDateFormatted}</strong>
                  </span>
                </div>

                {/* Role based actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {currentUser.role === 'siswa' && (
                    <button
                      onClick={() => {
                        setActiveSubmitAsg(asg);
                        setMockFileName(
                          `Tugas_${asg.subjectName.split(' ')[0]}_${currentUser.name.replace(/\s+/g, '_')}.pdf`
                        );
                      }}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {asg.status === 'submitted' || asg.status === 'graded'
                          ? 'Perbarui Pengumpulan'
                          : 'Kumpulkan Tugas'}
                      </span>
                    </button>
                  )}

                  {currentUser.role === 'guru' && submission && (
                    <button
                      onClick={() => {
                        setActiveGradingSub(submission);
                        setGradingScore(submission.score || 85);
                        setGradingFeedback(
                          submission.feedback || 'Analisis sangat baik dan sistematis!'
                        );
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{submission.status === 'graded' ? 'Ubah Nilai' : 'Beri Nilai Tugas'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Submit Modal */}
      {activeSubmitAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Kumpulkan Tugas: {activeSubmitAsg.title}
              </h3>
              <button
                onClick={() => setActiveSubmitAsg(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Pilih Berkas Jawaban (PDF / Docs / Gambar):
                </label>
                <div className="p-4 rounded-xl border-2 border-dashed border-sky-400/50 bg-sky-50/50 dark:bg-sky-950/20 text-center space-y-2">
                  <FileText className="w-8 h-8 mx-auto text-sky-500" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {mockFileName}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Format: PDF, Word, atau JPG/PNG • Maksimal 25 MB
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Jawaban atau Teks Tambahan:
                </label>
                <textarea
                  rows={3}
                  value={submissionText}
                  onChange={e => setSubmissionText(e.target.value)}
                  placeholder="Ketikkan ringkasan hasil pengerjaan atau keterangan tugas..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveSubmitAsg(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md transition-all"
                >
                  Kirim Lembar Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Grading Modal */}
      {activeGradingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Penilaian Tugas Siswa
              </h3>
              <button
                onClick={() => setActiveGradingSub(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
              <div>
                <strong>Siswa:</strong> {activeGradingSub.studentName} ({activeGradingSub.studentClass})
              </div>
              <div>
                <strong>Berkas:</strong> <span className="font-mono text-sky-600">{activeGradingSub.fileName}</span>
              </div>
              {activeGradingSub.textAnswer && (
                <div className="pt-1">
                  <strong>Catatan Siswa:</strong>
                  <p className="italic text-slate-600 dark:text-slate-300">"{activeGradingSub.textAnswer}"</p>
                </div>
              )}
            </div>

            <form onSubmit={handleTeacherGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Skor Nilai Angka (0 - 100):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradingScore}
                  onChange={e => setGradingScore(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Umpan Balik Guru (Feedback):
                </label>
                <textarea
                  rows={3}
                  value={gradingFeedback}
                  onChange={e => setGradingFeedback(e.target.value)}
                  placeholder="Tuliskan evaluasi atau saran pengembangan materi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveGradingSub(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all"
                >
                  Simpan Nilai & Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
