import React from 'react';
import {
  BookOpen,
  FileCheck2,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Video,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AcademicCalendar } from './AcademicCalendar';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    subjects,
    assignments,
    materials,
    schedules,
    grades,
    setActiveTab,
    setSelectedSubjectId,
  } = useApp();

  // Compute stats
  const averageGrade = (
    grades.reduce((sum, g) => sum + g.finalScore, 0) / (grades.length || 1)
  ).toFixed(1);

  const pendingAssignments = assignments.filter(a => a.status !== 'graded');

  // Filter today's schedule (e.g. Senin)
  const todaySchedules = schedules.filter(s => s.day === 'Senin');

  const handleOpenSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setActiveTab('subjects');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full bg-indigo-500/15 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-sky-300 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Portal Siswa Berprestasi • SMAN 1 Edukasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang Kembali, {currentUser.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Anda terdaftar di kelas <strong className="text-white">{currentUser.classRoom}</strong> ({currentUser.major}) dengan NISN <span className="font-mono text-sky-300">{currentUser.nisn}</span>. Tetap semangat mempersiapkan Ujian Tengah Semester & UTBK SNBT 2027!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('quizzes')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Award className="w-4 h-4" />
              <span>Mulai Simulasi Kuis</span>
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md border border-white/10 flex items-center gap-2 transition-all"
            >
              <span>Lihat Rapor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Matpel Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Mata Pelajaran
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {subjects.length} Matpel
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-500 font-semibold">100% Aktif</span> • Kelas XII MIPA
            </p>
          </div>
        </div>

        {/* Tugas Mendatang */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Tugas Mendatang
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {pendingAssignments.length} Tugas
            </span>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> Perlu segera dikumpulkan
            </p>
          </div>
        </div>

        {/* Nilai Rata-rata */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Nilai Rata-rata
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {averageGrade}
            </span>
            <span className="ml-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              / 100 (Predikat A)
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Melampaui KKM Sekolah (75)
            </p>
          </div>
        </div>

        {/* Kehadiran */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Presensi Kehadiran
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              98.4%
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Disiplin kehadiran semester gasal
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout (2 Cols: Left Activities + Right Calendar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Jadwal Hari Ini (Senin) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Jadwal Pelajaran Hari Ini (Senin)
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('schedule')}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                Lihat Semua Jadwal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {todaySchedules.map((item, index) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      {item.startTime} - {item.endTime}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.subjectName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.teacherName} • <span className="font-medium text-slate-600 dark:text-slate-300">{item.room}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {index === 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Sesi Berjalan
                      </span>
                    )}
                    {item.meetLink && (
                      <a
                        href={item.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Google Meet</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tugas Mendatang Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-sky-500" />
                <span>Tugas Yang Perlu Diselesaikan</span>
              </h3>
              <button
                onClick={() => setActiveTab('assignments')}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                Lihat Portal Tugas <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {assignments.map(asg => {
                const isOverdue = new Date(asg.dueDate) < new Date();
                const dueDateFormatted = new Date(asg.dueDate).toLocaleDateString('id-ID', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={asg.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                          {asg.subjectName}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Bobot: {asg.maxScore} Poin
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {asg.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {asg.instructions}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-700/60">
                      <div className="text-left md:text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          Tenggat Waktu
                        </div>
                        <div
                          className={`text-xs font-semibold ${
                            isOverdue
                              ? 'text-rose-500'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {dueDateFormatted}
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('assignments')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          asg.status === 'graded'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : asg.status === 'submitted'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : 'bg-sky-500 hover:bg-sky-600 text-white shadow-xs'
                        }`}
                      >
                        {asg.status === 'graded'
                          ? 'Sudah Dinilai'
                          : asg.status === 'submitted'
                          ? 'Terkirim'
                          : 'Kerjakan'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Materi Terkini Feed */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-500" />
                <span>Materi Pembelajaran Baru Diunggah</span>
              </h3>
              <button
                onClick={() => setActiveTab('subjects')}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                Jelajahi Semua Modul <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materials.slice(0, 4).map(mat => (
                <div
                  key={mat.id}
                  onClick={() => handleOpenSubject(mat.subjectId)}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all flex items-start gap-3 group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      mat.type === 'pdf'
                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                        : mat.type === 'video'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                        : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                    }`}
                  >
                    {mat.type === 'pdf' ? (
                      <FileText className="w-4 h-4" />
                    ) : mat.type === 'video' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase">
                      {mat.subjectName}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-sky-500 transition-colors">
                      {mat.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{mat.duration || mat.size}</span>
                      <span>•</span>
                      <span>{mat.downloadCount} kali diunduh</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Academic Calendar & Announcements */}
        <div className="space-y-6">
          <AcademicCalendar />

          {/* Quick Learning Tips Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Tips Belajar Efektif SMA
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Terapkan metode Pomodoro 25 menit fokus latihan soal UTBK dan 5 menit istirahat. Manfaatkan tab <strong>Forum Diskusi</strong> untuk bertanya langsung pada guru jika menemui rumus yang rumit!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
