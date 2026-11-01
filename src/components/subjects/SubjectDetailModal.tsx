import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FileText,
  Video,
  FileCheck2,
  MessageSquare,
  Download,
  Plus,
  Send,
  User,
  Heart,
  Clock,
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { Subject, Material, Assignment, DiscussionPost } from '../../types';
import { useApp } from '../../context/AppContext';

interface SubjectDetailModalProps {
  subject: Subject;
  onClose: () => void;
  onOpenAddMaterial: () => void;
  onOpenAddAssignment: () => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({
  subject,
  onClose,
  onOpenAddMaterial,
  onOpenAddAssignment,
}) => {
  const {
    currentUser,
    materials,
    assignments,
    discussions,
    addDiscussionPost,
    addDiscussionReply,
    submitAssignment,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'materi' | 'tugas' | 'diskusi'>('materi');

  // Previewing a specific material
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Submitting an assignment modal
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFileMock, setSelectedFileMock] = useState<string>('');

  // Discussion new post form
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: string }>({});

  const subjectMaterials = materials.filter(m => m.subjectId === subject.id);
  const subjectAssignments = assignments.filter(a => a.subjectId === subject.id);
  const subjectDiscussions = discussions.filter(d => d.subjectId === subject.id);

  // Handle assignment submit
  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;
    submitAssignment(submittingAssignment.id, submissionText, selectedFileMock);
    setSubmittingAssignment(null);
    setSubmissionText('');
    setSelectedFileMock('');
  };

  // Handle new discussion post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;
    addDiscussionPost(subject.id, newQuestionTitle, newQuestionContent);
    setNewQuestionTitle('');
    setNewQuestionContent('');
  };

  // Handle discussion reply
  const handleSendReply = (postId: string) => {
    const text = replyInputs[postId]?.trim();
    if (!text) return;
    addDiscussionReply(postId, text);
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleDownloadMaterial = (title: string) => {
    addToast(`Mengunduh berkas: "${title}"...`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header with Subject Banner */}
        <div className="relative p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-sky-500 text-white">
                  {subject.code}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-slate-200">
                  Kelas {subject.grade} • {subject.major}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  KKM: {subject.kkm}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {subject.name}
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span>Pengampu: <strong>{subject.teacherName}</strong></span>
                <span>•</span>
                <span>{subject.room}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors shrink-0"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-white/10 pb-0">
            <button
              onClick={() => {
                setActiveTab('materi');
                setSelectedMaterial(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all border-b-2 ${
                activeTab === 'materi'
                  ? 'border-sky-400 text-sky-300 bg-white/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Modul Materi ({subjectMaterials.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('tugas');
                setSelectedMaterial(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all border-b-2 ${
                activeTab === 'tugas'
                  ? 'border-sky-400 text-sky-300 bg-white/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Tugas & Proyek ({subjectAssignments.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('diskusi');
                setSelectedMaterial(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs rounded-t-xl transition-all border-b-2 ${
                activeTab === 'diskusi'
                  ? 'border-sky-400 text-sky-300 bg-white/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Forum Diskusi ({subjectDiscussions.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50 dark:bg-slate-900/60">
          {/* TAB 1: MATERI */}
          {activeTab === 'materi' && (
            <div className="space-y-6">
              {/* Material Detail Reader View */}
              {selectedMaterial ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedMaterial(null)}
                      className="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      ← Kembali ke Daftar Modul
                    </button>
                    <button
                      onClick={() => handleDownloadMaterial(selectedMaterial.title)}
                      className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold hover:bg-sky-100 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Berkas</span>
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          selectedMaterial.type === 'pdf'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : selectedMaterial.type === 'video'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {selectedMaterial.type}
                      </span>
                      <span className="text-xs text-slate-400">
                        {selectedMaterial.duration || selectedMaterial.size} • Diunggah {selectedMaterial.dateAdded}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                      {selectedMaterial.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {selectedMaterial.description}
                    </p>
                  </div>

                  {/* Video Player or PDF Document Content Viewer */}
                  {selectedMaterial.type === 'video' ? (
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-md flex items-center justify-center relative">
                      <iframe
                        src={selectedMaterial.videoUrl}
                        title={selectedMaterial.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 font-sans text-xs leading-relaxed space-y-4 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-300/50 dark:border-slate-700 text-[11px] text-slate-500">
                        <span>Preview Modul Digital Siswa • Hal. 1 - 28</span>
                        <span>Mode Baca Terproteksi</span>
                      </div>
                      <div className="font-mono text-xs">
                        {selectedMaterial.content || 'Konten materi terlampir dalam berkas PDF sekolah.'}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Materials List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Daftar Modul & Bahan Ajar
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Akses modul ringkasan teori, rumus praktis, video tutorial, dan latihan.
                      </p>
                    </div>

                    {currentUser.role === 'guru' && (
                      <button
                        onClick={onOpenAddMaterial}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Unggah Materi</span>
                      </button>
                    )}
                  </div>

                  {subjectMaterials.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                      <p className="text-xs font-semibold">Belum ada materi untuk mata pelajaran ini.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {subjectMaterials.map(mat => (
                        <div
                          key={mat.id}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-3 group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${
                                  mat.type === 'pdf'
                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                    : mat.type === 'video'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                }`}
                              >
                                {mat.type.toUpperCase()}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {mat.duration || mat.size}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                              {mat.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {mat.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
                            <span className="text-[10px] text-slate-400">
                              {mat.downloadCount}x diakses
                            </span>

                            <button
                              onClick={() => setSelectedMaterial(mat)}
                              className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Pelajari Materi</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TUGAS */}
          {activeTab === 'tugas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Tugas & Proyek Siswa
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kumpulkan lembar pengerjaan tepat waktu sebelum tenggat penilaian.
                  </p>
                </div>

                {currentUser.role === 'guru' && (
                  <button
                    onClick={onOpenAddAssignment}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Buat Tugas Baru</span>
                  </button>
                )}
              </div>

              {subjectAssignments.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <FileCheck2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-semibold">Tidak ada tugas aktif untuk mata pelajaran ini.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {subjectAssignments.map(asg => {
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
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                              Bobot: {asg.maxScore} Poin
                            </span>
                            <span className="text-xs text-slate-400">
                              Tenggat: <strong className="text-amber-600 dark:text-amber-400">{dueDateFormatted}</strong>
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {asg.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {asg.instructions}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                          {currentUser.role === 'siswa' && (
                            <button
                              onClick={() => {
                                setSubmittingAssignment(asg);
                                setSelectedFileMock('Tugas_' + asg.subjectName.split(' ')[0] + '_' + currentUser.name.replace(/\s+/g, '_') + '.pdf');
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                asg.status === 'graded'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : asg.status === 'submitted'
                                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                                  : 'bg-sky-500 hover:bg-sky-600 text-white shadow-xs'
                              }`}
                            >
                              {asg.status === 'graded'
                                ? '✓ Sudah Dinilai'
                                : asg.status === 'submitted'
                                ? '✓ Terkirim (Ubah)'
                                : 'Kumpulkan Tugas'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FORUM DISKUSI */}
          {activeTab === 'diskusi' && (
            <div className="space-y-5">
              {/* Form Tulis Pertanyaan Baru */}
              <form
                onSubmit={handleCreatePost}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>Ajukan Pertanyaan Baru ke Guru & Teman Sekelas</span>
                </div>
                <input
                  type="text"
                  placeholder="Judul topik pertanyaan (misal: Bingung rumus pergeseran Wien)..."
                  value={newQuestionTitle}
                  onChange={e => setNewQuestionTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
                />
                <textarea
                  rows={2}
                  placeholder="Jelaskan pertanyaan atau kesulitan Anda secara detail..."
                  value={newQuestionContent}
                  onChange={e => setNewQuestionContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pertanyaan</span>
                  </button>
                </div>
              </form>

              {/* Discussions List */}
              <div className="space-y-4">
                {subjectDiscussions.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-xs font-semibold">Belum ada diskusi untuk mata pelajaran ini.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Jadilah yang pertama mengajukan pertanyaan!</p>
                  </div>
                ) : (
                  subjectDiscussions.map(post => (
                    <div
                      key={post.id}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                    >
                      {/* Post Author */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.authorName}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900 dark:text-white">
                                {post.authorName}
                              </span>
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                                  post.authorRole === 'guru'
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                    : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                                }`}
                              >
                                {post.authorRole}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {new Date(post.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                          <span>{post.likes}</span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      {/* Replies List */}
                      {post.replies.length > 0 && (
                        <div className="space-y-2 pl-4 border-l-2 border-sky-200 dark:border-sky-900/50">
                          {post.replies.map(reply => (
                            <div
                              key={reply.id}
                              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900 dark:text-white">
                                    {reply.authorName}
                                  </span>
                                  <span
                                    className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                                      reply.authorRole === 'guru'
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                        : 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                                    }`}
                                  >
                                    {reply.authorRole}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(reply.createdAt).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Box */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <input
                          type="text"
                          placeholder="Tulis balasan atau tanggapan..."
                          value={replyInputs[post.id] || ''}
                          onChange={e =>
                            setReplyInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendReply(post.id);
                            }
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <button
                          onClick={() => handleSendReply(post.id)}
                          className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Balas</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submission Modal for Student */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Pengumpulan Tugas: {submittingAssignment.title}
              </h3>
              <button
                onClick={() => setSubmittingAssignment(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Pilih / Unggah Berkas Jawaban (PDF / Word / Gambar):
                </label>
                <div className="p-4 rounded-xl border-2 border-dashed border-sky-400/40 bg-sky-50/50 dark:bg-sky-950/20 text-center space-y-2">
                  <FileText className="w-8 h-8 mx-auto text-sky-500" />
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {selectedFileMock || 'Klik untuk memilih berkas jawaban Anda'}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Ukuran maksimum 25 MB • Disimpan aman pada sistem
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Tambahan untuk Guru (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={submissionText}
                  onChange={e => setSubmissionText(e.target.value)}
                  placeholder="Tuliskan rangkuman jawaban singkat atau link Google Drive jika ada..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSubmittingAssignment(null)}
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
    </div>
  );
};
