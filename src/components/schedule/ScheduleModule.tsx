import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Video,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ScheduleModule: React.FC = () => {
  const { schedules, currentUser } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Senin');

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  const filteredSchedule = schedules.filter(s => s.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-sky-500" />
            <span>Jadwal Pelajaran & Sesi Belajar SMA</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelas <strong>{currentUser.classRoom || 'XII MIPA 1'}</strong> • Tahun Ajaran 2026/2027 Semester Gasal
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedDay === day
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Items Timeline */}
      <div className="space-y-4">
        {filteredSchedule.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400">
            <CalendarDays className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Tidak ada jadwal pelajaran untuk hari ini.</p>
          </div>
        ) : (
          filteredSchedule.map((item, idx) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Time Badge */}
                <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 text-center shrink-0 min-w-[110px]">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    <Clock className="w-3 h-3" /> Sesi {idx + 1}
                  </div>
                  <div className="font-mono font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                    {item.startTime} - {item.endTime}
                  </div>
                </div>

                {/* Subject and Teacher details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.classRoom}
                    </span>
                    {idx === 0 && selectedDay === 'Senin' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse">
                        Sesi Berjalan
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {item.subjectName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {item.teacherName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {item.room}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Google Meet Virtual Classroom */}
              <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                {item.meetLink ? (
                  <a
                    href={item.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    <span>Masuk Google Meet</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    Tatap Muka di Kelas
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
