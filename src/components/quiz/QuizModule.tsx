import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Plus,
  BookOpen,
  Check,
  X as XIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Quiz, QuizQuestion, QuizResult } from '../../types';

interface QuizModuleProps {
  onOpenAddQuiz: () => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ onOpenAddQuiz }) => {
  const { currentUser, quizzes, submitQuizResult, quizResults } = useApp();

  // Active quiz session state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: 'A' | 'B' | 'C' | 'D' | 'E' | null }>({});
  const [doubtQuestions, setDoubtQuestions] = useState<{ [qId: string]: boolean }>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);

  // Result state
  const [completedResult, setCompletedResult] = useState<QuizResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(true);

  // Timer effect during active quiz
  useEffect(() => {
    if (!activeQuiz || completedResult) return;

    if (secondsRemaining <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, secondsRemaining, completedResult]);

  // Start exam
  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setDoubtQuestions({});
    setSecondsRemaining(quiz.durationMinutes * 60);
    setCompletedResult(null);
  };

  // Select an option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!activeQuiz) return;
    const qId = activeQuiz.questions[currentQuestionIndex].id;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: key,
    }));
  };

  // Toggle doubt (ragu-ragu)
  const handleToggleDoubt = () => {
    if (!activeQuiz) return;
    const qId = activeQuiz.questions[currentQuestionIndex].id;
    setDoubtQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Final submit exam
  const handleFinalSubmit = () => {
    if (!activeQuiz) return;

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    activeQuiz.questions.forEach(q => {
      const ans = userAnswers[q.id];
      if (!ans) {
        skippedCount++;
      } else if (ans === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const finalScore = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const timeSpent = activeQuiz.durationMinutes * 60 - secondsRemaining;

    const result: QuizResult = {
      id: 'res_' + Date.now(),
      quizId: activeQuiz.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      score: finalScore,
      totalCorrect: correctCount,
      totalWrong: wrongCount,
      totalSkipped: skippedCount,
      answers: userAnswers,
      completedAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
    };

    submitQuizResult(result);
    setCompletedResult(result);
    setIsConfirmSubmitOpen(false);

    // Trigger confetti if score >= passingScore
    if (finalScore >= activeQuiz.passingScore) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. LIVE EXAM VIEW
  if (activeQuiz && !completedResult) {
    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    const isUnder2Mins = secondsRemaining < 120;
    const answeredCount = Object.values(userAnswers).filter(Boolean).length;
    const unansweredCount = activeQuiz.questions.length - answeredCount;

    return (
      <div className="space-y-4 max-w-5xl mx-auto">
        {/* Exam Navigation Bar */}
        <div className="sticky top-20 z-20 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-extrabold flex items-center justify-center text-xs">
              CBT
            </span>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                {activeQuiz.title}
              </h2>
              <span className="text-[11px] text-slate-400">
                Soal {currentQuestionIndex + 1} dari {activeQuiz.questions.length} • {activeQuiz.subjectName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Badge */}
            <div
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm ${
                isUnder2Mins
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>

            <button
              onClick={() => setIsConfirmSubmitOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Selesai Ujian
            </button>
          </div>
        </div>

        {/* Main Exam Area (Question Card + Question Grid Navigator) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Box (3 cols) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between min-h-[480px]">
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                  Nomor {currentQuestionIndex + 1}
                </span>

                <button
                  onClick={handleToggleDoubt}
                  className={`text-xs px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                    doubtQuestions[currentQuestion.id]
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>
                    {doubtQuestions[currentQuestion.id] ? 'Ditandai Ragu-ragu' : 'Tandai Ragu-ragu'}
                  </span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                {currentQuestion.question}
              </div>

              {/* Options A - E */}
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map(option => {
                  const isSelected = userAnswers[currentQuestion.id] === option.key;

                  return (
                    <button
                      key={option.key}
                      onClick={() => handleSelectOption(option.key)}
                      className={`w-full flex items-start gap-3.5 p-3.5 rounded-2xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-xs ring-2 ring-sky-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {option.key}
                      </div>
                      <div className="pt-1 leading-relaxed flex-1">
                        {option.text}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-xs text-slate-400 font-medium">
                {currentQuestionIndex + 1} / {activeQuiz.questions.length}
              </span>

              {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsConfirmSubmitOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Kumpulkan Ujian</span>
                </button>
              )}
            </div>
          </div>

          {/* Question Grid Navigator (1 col) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
              Navigasi Soal
            </h3>

            {/* Grid of numbers */}
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
              {activeQuiz.questions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isDoubt = !!doubtQuestions[q.id];
                const isCurrent = currentQuestionIndex === idx;

                let btnColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (isDoubt) {
                  btnColor = 'bg-amber-400 text-slate-950 font-bold';
                } else if (isAnswered) {
                  btnColor = 'bg-emerald-500 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl text-xs flex items-center justify-center transition-all ${btnColor} ${
                      isCurrent ? 'ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500 shrink-0" />
                <span>Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400 shrink-0" />
                <span>Ragu-ragu ({Object.values(doubtQuestions).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 shrink-0" />
                <span>Belum dijawab ({unansweredCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Konfirmasi Kumpulkan */}
        {isConfirmSubmitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Kumpulkan Lembar Jawaban?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Anda telah menjawab <strong>{answeredCount}</strong> dari {activeQuiz.questions.length} soal.
                  {unansweredCount > 0 && (
                    <span className="text-rose-500 block font-semibold mt-1">
                      Peringatan: Masih ada {unansweredCount} butir soal yang belum dijawab!
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => setIsConfirmSubmitOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Periksa Kembali
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-md"
                >
                  Ya, Submit Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. SCORECARD & PEMBAHASAN VIEW
  if (completedResult && activeQuiz) {
    const isPassed = completedResult.score >= activeQuiz.passingScore;

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Scorecard Hero */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xl space-y-4 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xl shadow-sky-500/25">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isPassed
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {isPassed ? '🎉 Lulus Melampaui KKM' : '⚠️ Perlu Remedial Materi'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
              Hasil Skor Ujian Simulasi
            </h2>
            <p className="text-xs text-slate-400">
              {activeQuiz.title} • {currentUser.name} ({currentUser.classRoom})
            </p>
          </div>

          {/* Big Score Display */}
          <div className="py-2">
            <span className="text-5xl font-black text-slate-900 dark:text-white">
              {completedResult.score}
            </span>
            <span className="text-xl font-bold text-slate-400"> / 100</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              KKM Kelulusan: {activeQuiz.passingScore}
            </p>
          </div>

          {/* Metric Summary */}
          <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto py-3 border-y border-slate-100 dark:border-slate-800 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Benar</span>
              <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                {completedResult.totalCorrect}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Salah</span>
              <p className="text-base font-extrabold text-rose-600 dark:text-rose-400">
                {completedResult.totalWrong}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Kosong</span>
              <p className="text-base font-extrabold text-slate-500">
                {completedResult.totalSkipped}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Waktu</span>
              <p className="text-base font-extrabold text-sky-600 dark:text-sky-400">
                {formatTimer(completedResult.timeSpentSeconds)}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartQuiz(activeQuiz)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Simulasi</span>
            </button>
            <button
              onClick={() => {
                setActiveQuiz(null);
                setCompletedResult(null);
              }}
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Kembali ke Menu Kuis
            </button>
          </div>
        </div>

        {/* Pembahasan Soal Interaktif */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Review & Pembahasan Soal Lengkap</span>
            </h3>
            <span className="text-xs text-slate-400">
              Pelajari kunci jawaban & penjelasan teoritis
            </span>
          </div>

          <div className="space-y-4">
            {activeQuiz.questions.map((question, index) => {
              const studentAnswer = completedResult.answers[question.id];
              const isCorrect = studentAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Soal Nomor {index + 1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-extrabold uppercase text-[10px] flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <Check className="w-3 h-3" /> Benar (+20)
                        </>
                      ) : (
                        <>
                          <XIcon className="w-3 h-3" /> Salah (0)
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {question.question}
                  </p>

                  {/* Options with feedback */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {question.options.map(opt => {
                      const isOptionSelected = studentAnswer === opt.key;
                      const isOptionCorrect = question.correctAnswer === opt.key;

                      let optBorder = 'border-slate-200 dark:border-slate-800';
                      let optBg = 'bg-slate-50/50 dark:bg-slate-800/30';
                      if (isOptionCorrect) {
                        optBorder = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        optBorder = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-xl border ${optBorder} ${optBg} flex items-start gap-2`}
                        >
                          <span className="font-bold shrink-0">{opt.key}.</span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation Box */}
                  <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-xs space-y-1">
                    <span className="font-bold text-sky-800 dark:text-sky-300 block text-[11px] uppercase tracking-wider">
                      💡 Pembahasan & Langkah Penyelesaian:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. QUIZ LIST DASHBOARD
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-sky-500" />
            <span>Simulasi Kuis & Bank Soal Ujian (CBT SMA)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Latihan soal UTBK-SNBT, kuis harian, dan simulasi PAS dengan timer akurat, navigasi interaktif, dan skor instan.
          </p>
        </div>

        {currentUser.role === 'guru' && (
          <button
            onClick={onOpenAddQuiz}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-md shadow-sky-500/25 flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat Paket Kuis Baru</span>
          </button>
        )}
      </div>

      {/* Available Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map(quiz => (
          <div
            key={quiz.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-500/50 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 uppercase">
                  {quiz.subjectName}
                </span>
                <span className="text-xs text-slate-400">
                  Kelas {quiz.grade} {quiz.major}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                {quiz.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {quiz.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Durasi</span>
                <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {quiz.durationMinutes} Menit
                </p>
              </div>
              <div className="border-x border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Jumlah Soal</span>
                <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {quiz.totalQuestions} Butir
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">KKM Lulus</span>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {quiz.passingScore} Poin
                </p>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => handleStartQuiz(quiz)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Mulai Ujian Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Riwayat Nilai Simulasi */}
      {quizResults.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Riwayat Hasil Simulasi yang Baru Diselesaikan</span>
          </h3>
          <div className="space-y-2">
            {quizResults.map(res => (
              <div
                key={res.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {res.studentName}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Benar: {res.totalCorrect} • Salah: {res.totalWrong} • Waktu: {formatTimer(res.timeSpentSeconds)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-sky-600 dark:text-sky-400">
                    {res.score}
                  </span>
                  <span className="text-slate-400 text-xs">/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
