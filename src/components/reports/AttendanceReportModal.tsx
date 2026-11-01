import React from 'react';
import { X, Printer, CheckCircle, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AttendanceReportModalProps {
  onClose: () => void;
}

const mockClassStudents = [
  { no: 1, nisn: '0064281920', name: 'Ahmad Rizky Pratama', gender: 'L', hadir: 18, izin: 1, sakit: 0, alpa: 0, tugas: 95, uts: 92, akhir: 94 },
  { no: 2, nisn: '0065123984', name: 'Nadia Putri Kusuma', gender: 'P', hadir: 19, izin: 0, sakit: 0, alpa: 0, tugas: 90, uts: 88, akhir: 89 },
  { no: 3, nisn: '0067891234', name: 'Dimas Bagas Satrio', gender: 'L', hadir: 17, izin: 2, sakit: 0, alpa: 0, tugas: 85, uts: 86, akhir: 86 },
  { no: 4, nisn: '0068112233', name: 'Anindya Kirana Larasati', gender: 'P', hadir: 19, izin: 0, sakit: 0, alpa: 0, tugas: 92, uts: 90, akhir: 91 },
  { no: 5, nisn: '0069334455', name: 'Farhan Dwi Ramadhan', gender: 'L', hadir: 18, izin: 0, sakit: 1, alpa: 0, tugas: 88, uts: 84, akhir: 86 },
  { no: 6, nisn: '0067556677', name: 'Gita Maharani Putri', gender: 'P', hadir: 19, izin: 0, sakit: 0, alpa: 0, tugas: 94, uts: 91, akhir: 93 },
  { no: 7, nisn: '0068778899', name: 'Kevin Jonathan Tan', gender: 'L', hadir: 18, izin: 1, sakit: 0, alpa: 0, tugas: 89, uts: 88, akhir: 89 },
  { no: 8, nisn: '0069990011', name: 'Zahra Aulia Rachman', gender: 'P', hadir: 19, izin: 0, sakit: 0, alpa: 0, tugas: 96, uts: 94, akhir: 95 },
];

export const AttendanceReportModal: React.FC<AttendanceReportModalProps> = ({ onClose }) => {
  const { currentUser } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Control Bar */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <FileText className="w-4 h-4 text-sky-500" />
            <span>Pratinjau Cetak: Daftar Presensi & Nilai Siswa</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen Sekarang</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg text-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 space-y-6">
          {/* Letterhead */}
          <div className="text-center pb-4 border-b-2 border-black space-y-1">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
              PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
            </h2>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-black">
              DINAS PENDIDIKAN • SMA NEGERI 1 EDUKASI
            </h3>
            <p className="text-[10px] text-slate-600 font-medium">
              Jalan Pendidikan No. 45, Kebayoran Baru, Jakarta Selatan • Telp: (021) 7890123
            </p>
            <div className="pt-2 text-xs font-black uppercase tracking-widest text-slate-900">
              LEMBAR REKAPITULASI PRESENSI & NILAI HARIAN SISWA
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-800">
            <div>
              <p>Mata Pelajaran: <strong>Fisika Peminatan</strong></p>
              <p>Guru Pengampu: <strong>{currentUser.name}</strong></p>
            </div>
            <div>
              <p>Kelas / Rombel: <strong>XII MIPA 1</strong></p>
              <p>Semester / TP: <strong>Gasal / 2026-2027</strong></p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-collapse border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] border border-slate-300">
                  <th className="p-2 border border-slate-300 text-center w-8">No</th>
                  <th className="p-2 border border-slate-300 w-24">NISN</th>
                  <th className="p-2 border border-slate-300">Nama Siswa</th>
                  <th className="p-2 border border-slate-300 text-center w-8">L/P</th>
                  <th className="p-2 border border-slate-300 text-center w-10">Hadir</th>
                  <th className="p-2 border border-slate-300 text-center w-8">Izin</th>
                  <th className="p-2 border border-slate-300 text-center w-8">Sakit</th>
                  <th className="p-2 border border-slate-300 text-center w-8">Alpa</th>
                  <th className="p-2 border border-slate-300 text-center w-12">Tugas</th>
                  <th className="p-2 border border-slate-300 text-center w-12">UTS</th>
                  <th className="p-2 border border-slate-300 text-center w-14">Nilai Akhir</th>
                </tr>
              </thead>
              <tbody>
                {mockClassStudents.map(student => (
                  <tr key={student.no} className="border border-slate-300 text-xs">
                    <td className="p-2 text-center border border-slate-300">{student.no}</td>
                    <td className="p-2 font-mono border border-slate-300">{student.nisn}</td>
                    <td className="p-2 font-bold border border-slate-300">{student.name}</td>
                    <td className="p-2 text-center border border-slate-300">{student.gender}</td>
                    <td className="p-2 text-center border border-slate-300">{student.hadir}</td>
                    <td className="p-2 text-center border border-slate-300">{student.izin}</td>
                    <td className="p-2 text-center border border-slate-300">{student.sakit}</td>
                    <td className="p-2 text-center border border-slate-300">{student.alpa}</td>
                    <td className="p-2 text-center font-mono border border-slate-300">{student.tugas}</td>
                    <td className="p-2 text-center font-mono border border-slate-300">{student.uts}</td>
                    <td className="p-2 text-center font-bold font-mono border border-slate-300 text-sky-700">
                      {student.akhir}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature */}
          <div className="pt-6 flex justify-end text-xs">
            <div className="text-center w-60">
              <p>Jakarta, 1 November 2026</p>
              <p className="font-bold mt-1">Guru Mata Pelajaran,</p>
              <div className="h-16 flex items-center justify-center font-mono text-[11px] text-emerald-700 font-bold italic">
                [Tanda Tangan Digital Diverifikasi]
              </div>
              <p className="font-bold underline">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 font-mono">NIP: {currentUser.nip || '197805122003122001'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
