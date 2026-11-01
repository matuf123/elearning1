import React, { useRef } from 'react';
import {
  GraduationCap,
  Printer,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GradesModule: React.FC = () => {
  const { currentUser, grades } = useApp();

  const averageGrade = (
    grades.reduce((sum, g) => sum + g.finalScore, 0) / (grades.length || 1)
  ).toFixed(1);

  const totalSubjects = grades.length;
  const passedSubjects = grades.filter(g => g.finalScore >= g.kkm).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-sky-500" />
            <span>Rekap Nilai & Rapor Hasil Belajar Siswa</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Laporan Capaian Kompetensi Semester Gasal Tahun Ajaran 2026/2027 • Kurikulum Merdeka
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-sky-500/25 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Lembar Rapor Resmi</span>
        </button>
      </div>

      {/* Summary KPI Cards (Hidden on print or styled nicely) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Nilai Rata-rata Semester
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {averageGrade}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold ml-1">
              / 100 (Predikat A)
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Status Ketuntasan Belajar
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              100%
            </span>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-bold ml-1">
              ({passedSubjects} dari {totalSubjects} Matpel)
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Peringkat Akademik Kelas
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Peringkat 2
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold ml-1">
              dari 36 Siswa
            </span>
          </div>
        </div>
      </div>

      {/* Official Printable Rapor Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-6">
        {/* Kop Surat Sekolah SMA Resmi */}
        <div className="text-center pb-6 border-b-2 border-slate-900 dark:border-slate-100 space-y-1">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">
            PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
          </h2>
          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">
            DINAS PENDIDIKAN • SMA NEGERI 1 EDUKASI
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Jalan Pendidikan No. 45, Kebayoran Baru, Jakarta Selatan • Telp: (021) 7890123 • NPSN: 20104812
          </p>
          <div className="pt-2 text-xs font-extrabold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            LAPORAN CAPAIAN HASIL BELAJAR SISWA (RAPOR)
          </div>
        </div>

        {/* Student Biodata Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-32 text-slate-500 dark:text-slate-400 font-medium">Nama Peserta Didik</span>
              <span className="font-bold text-slate-900 dark:text-white">: {currentUser.name}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500 dark:text-slate-400 font-medium">Nomor Induk Siswa (NISN)</span>
              <span className="font-bold text-slate-900 dark:text-white">: {currentUser.nisn || '0064281920'}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500 dark:text-slate-400 font-medium">Sekolah</span>
              <span className="font-bold text-slate-900 dark:text-white">: SMA Negeri 1 Edukasi</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-32 text-slate-500 dark:text-slate-400 font-medium">Kelas / Rombel</span>
              <span className="font-bold text-slate-900 dark:text-white">: {currentUser.classRoom || 'XII MIPA 1'}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500 dark:text-slate-400 font-medium">Fase / Semester</span>
              <span className="font-bold text-slate-900 dark:text-white">: Fase F / 1 (Gasal)</span>
            </div>
            <div className="flex">
              <span className="w-32 text-slate-500 dark:text-slate-400 font-medium">Tahun Ajaran</span>
              <span className="font-bold text-slate-900 dark:text-white">: 2026/2027</span>
            </div>
          </div>
        </div>

        {/* Table of Grades */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-y border-slate-200 dark:border-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3 w-10 text-center">No</th>
                <th className="py-3 px-3">Mata Pelajaran</th>
                <th className="py-3 px-2 text-center w-14">KKM</th>
                <th className="py-3 px-2 text-center w-14">Tugas</th>
                <th className="py-3 px-2 text-center w-14">UTS</th>
                <th className="py-3 px-2 text-center w-14">UAS</th>
                <th className="py-3 px-2 text-center w-16">Nilai Akhir</th>
                <th className="py-3 px-2 text-center w-12">Predikat</th>
                <th className="py-3 px-3 min-w-[200px]">Capaian Kompetensi / Catatan Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {grades.map((grade, index) => {
                const isPassed = grade.finalScore >= grade.kkm;

                return (
                  <tr
                    key={grade.subjectId}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-3 text-center text-slate-400 font-bold">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {grade.subjectName}
                      </div>
                      <span className="text-[10px] text-slate-400">{grade.category}</span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-600 dark:text-slate-400">
                      {grade.kkm}
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-700 dark:text-slate-300">
                      {grade.tugasScore}
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-700 dark:text-slate-300">
                      {grade.utsScore}
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-700 dark:text-slate-300">
                      {grade.uasScore}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-extrabold text-sm text-sky-600 dark:text-sky-400">
                      {grade.finalScore}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`px-2 py-0.5 rounded font-extrabold text-xs ${
                          grade.predicate === 'A'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        }`}
                      >
                        {grade.predicate}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {grade.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-700">
                <td colSpan={6} className="py-3 px-4 text-right text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Rata-rata Nilai Keseluruhan:
                </td>
                <td className="py-3 px-2 text-center text-sm font-black text-sky-600 dark:text-sky-400">
                  {averageGrade}
                </td>
                <td className="py-3 px-2 text-center font-bold text-emerald-600">
                  A
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-500 italic">
                  Status: TUNTAS (Memenuhi seluruh kriteria kelulusan akademik)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Official Signatures Section */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs">
          <div>
            <p className="text-slate-500 dark:text-slate-400">Mengetahui,</p>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">Orang Tua / Wali Siswa</p>
            <div className="h-16 flex items-center justify-center text-slate-300">
              (.......................................)
            </div>
            <p className="text-[11px] text-slate-400">Tanda Tangan & Nama Terang</p>
          </div>

          <div>
            <p className="text-slate-500 dark:text-slate-400">Jakarta, 1 November 2026</p>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">Wali Kelas XII MIPA 1</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs italic">
                [Telah Ditandatangani Secara Digital]
              </span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">Dra. Siti Rahmawati, M.Pd</p>
            <p className="text-[10px] text-slate-400 font-mono">NIP: 197805122003122001</p>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="text-slate-500 dark:text-slate-400">Kepala Sekolah,</p>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">SMAN 1 Edukasi</p>
            <div className="h-16 flex items-center justify-center">
              <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                VERIFIED LMS QR: 2026-SMA1-EDUSMA
              </span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">Dr. H. Suryana, M.Si</p>
            <p className="text-[10px] text-slate-400 font-mono">NIP: 196901041995121002</p>
          </div>
        </div>
      </div>
    </div>
  );
};
