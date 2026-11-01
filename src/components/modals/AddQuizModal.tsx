import React, { useState } from 'react';
import { X, Award, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuizQuestion } from '../../types';

interface AddQuizModalProps {
  onClose: () => void;
}

export const AddQuizModal: React.FC<AddQuizModalProps> = ({ onClose }) => {
  const { subjects, addQuiz } = useApp();

  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [passingScore, setPassingScore] = useState(75);

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q_' + Date.now(),
      question: 'Tuliskan butir soal pilihan ganda di sini...',
      options: [
        { key: 'A', text: 'Pilihan Jawaban A' },
        { key: 'B', text: 'Pilihan Jawaban B' },
        { key: 'C', text: 'Pilihan Jawaban C' },
        { key: 'D', text: 'Pilihan Jawaban D' },
        { key: 'E', text: 'Pilihan Jawaban E' },
      ],
      correctAnswer: 'A',
      explanation: 'Penjelasan konsep ilmiah dan langkah penyelesaian matematis.',
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: 'q_' + Date.now() + Math.random(),
        question: 'Soal baru...',
        options: [
          { key: 'A', text: 'Opsi A' },
          { key: 'B', text: 'Opsi B' },
          { key: 'C', text: 'Opsi C' },
          { key: 'D', text: 'Opsi D' },
          { key: 'E', text: 'Opsi E' },
        ],
        correctAnswer: 'A',
        explanation: 'Pembahasan kunci jawaban.',
      },
    ]);
  };

  const handleQuestionChange = (index: number, val: string) => {
    setQuestions(prev =>
      prev.map((q, i) => (i === index ? { ...q, question: val } : q))
    );
  };

  const handleExplanationChange = (index: number, val: string) => {
    setQuestions(prev =>
      prev.map((q, i) => (i === index ? { ...q, explanation: val } : q))
    );
  };

  const handleCorrectAnswerChange = (index: number, key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setQuestions(prev =>
      prev.map((q, i) => (i === index ? { ...q, correctAnswer: key } : q))
    );
  };

  const handleOptionTextChange = (
    qIndex: number,
    optKey: 'A' | 'B' | 'C' | 'D' | 'E',
    text: string
  ) => {
    setQuestions(prev =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        return {
          ...q,
          options: q.options.map(o => (o.key === optKey ? { ...o, text } : o)),
        };
      })
    );
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSubject = subjects.find(s => s.id === subjectId);
    if (!selSubject || !title) return;

    addQuiz({
      subjectId,
      subjectName: selSubject.name,
      title,
      description,
      grade: selSubject.grade,
      major: selSubject.major,
      durationMinutes,
      totalQuestions: questions.length,
      passingScore,
      questions,
      isPublished: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Buat Paket Kuis / Ujian CBT Baru
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
              Judul Paket Ujian / Kuis:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Penilaian Harian Fisika Bab 4: Teori Relativitas"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Durasi Ujian (Menit):
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ambang Batas Kelulusan (KKM):
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={passingScore}
                onChange={e => setPassingScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Petunjuk Singkat Peserta Ujian:
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Pilihlah salah satu jawaban yang paling tepat..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Questions Builder Section */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Daftar Butir Soal Pilihan Ganda ({questions.length})
              </span>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold hover:bg-sky-100 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Soal</span>
              </button>
            </div>

            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-600 dark:text-sky-400">
                    Soal No. {idx + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(idx)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={q.question}
                    onChange={e => handleQuestionChange(idx, e.target.value)}
                    placeholder="Ketik pertanyaan..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Options A - E */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-500">Pilihan Opsi:</span>
                  {q.options.map(opt => (
                    <div key={opt.key} className="flex items-center gap-2">
                      <span className="w-6 font-bold text-center text-slate-600 dark:text-slate-400">
                        {opt.key}.
                      </span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={e => handleOptionTextChange(idx, opt.key, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Select Correct Answer */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-bold text-emerald-600">Kunci Jawaban Benar:</span>
                  <select
                    value={q.correctAnswer}
                    onChange={e =>
                      handleCorrectAnswerChange(idx, e.target.value as 'A' | 'B' | 'C' | 'D' | 'E')
                    }
                    className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {['A', 'B', 'C', 'D', 'E'].map(k => (
                      <option key={k} value={k}>
                        Opsi {k}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="font-semibold text-slate-500">Penjelasan & Pembahasan:</span>
                  <textarea
                    rows={2}
                    value={q.explanation}
                    onChange={e => handleExplanationChange(idx, e.target.value)}
                    placeholder="Langkah penyelesaian..."
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md"
            >
              Terbitkan Paket Ujian
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
