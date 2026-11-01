import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

interface EventItem {
  date: number;
  month: string;
  title: string;
  type: 'exam' | 'deadline' | 'holiday' | 'event';
  time: string;
}

const academicEvents: EventItem[] = [
  { date: 5, month: 'Nov', title: 'Tenggat Tugas Fisika Radiasi', type: 'deadline', time: '23:59 WIB' },
  { date: 8, month: 'Nov', title: 'Batas Kumpul Soal Limit Matematika', type: 'deadline', time: '20:00 WIB' },
  { date: 12, month: 'Nov', title: 'Verifikasi Nilai Rapor Sisipan Gasal', type: 'event', time: '08:00 WIB' },
  { date: 17, month: 'Nov', title: 'Hari Pertama UTS Gasal Berbasis Komputer', type: 'exam', time: '07:30 WIB' },
  { date: 21, month: 'Nov', title: 'Try Out UTBK-SNBT 2027 Kelas XII', type: 'exam', time: '08:00 WIB' },
  { date: 25, month: 'Nov', title: 'Peringatan Hari Guru Nasional', type: 'holiday', time: 'Seharian' },
];

export const AcademicCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(5);

  // November 2026 starts on Sunday (1)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
          <Calendar className="w-4 h-4 text-sky-500" />
          <span>Kalender Akademik - November 2026</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500" title="Bulan Sebelumnya">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500" title="Bulan Berikutnya">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 mb-2">
          <span>Min</span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {daysInMonth.map(day => {
            const hasEvent = academicEvents.some(e => e.date === day);
            const isSelected = selectedDate === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`h-8 rounded-lg flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white font-bold shadow-xs'
                    : hasEvent
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold hover:bg-sky-100'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{day}</span>
                {hasEvent && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-rose-500 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events on selected / upcoming */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Agenda Terdekat
          </span>
          <span className="text-[10px] text-slate-400">Semester Gasal</span>
        </div>
        <div className="space-y-2.5">
          {academicEvents.slice(0, 3).map((event, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    event.type === 'exam'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                      : event.type === 'deadline'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {event.date}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                    {event.title}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0 ${
                  event.type === 'exam'
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
                    : event.type === 'deadline'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300'
                    : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300'
                }`}
              >
                {event.type === 'exam' ? 'Ujian' : event.type === 'deadline' ? 'Deadline' : 'Info'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
