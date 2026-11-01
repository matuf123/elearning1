export type Role = 'siswa' | 'guru' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  nisn?: string;
  nip?: string;
  grade?: 'X' | 'XI' | 'XII';
  major?: 'IPA' | 'IPS' | 'Umum';
  classRoom?: string; // e.g., 'XII MIPA 1'
  phone?: string;
  status: 'active' | 'inactive';
}

export type Major = 'IPA' | 'IPS' | 'Umum';
export type GradeLevel = 'X' | 'XI' | 'XII';

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: 'Wajib' | 'Peminatan';
  major: Major;
  grade: GradeLevel;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  iconName: string;
  color: string;
  bannerImg: string;
  totalMaterials: number;
  totalAssignments: number;
  kkm: number; // Kriteria Ketuntasan Minimal, e.g., 75
  room: string;
  description: string;
}

export type MaterialType = 'pdf' | 'video' | 'article';

export interface Material {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  type: MaterialType;
  fileUrl?: string;
  videoUrl?: string; // e.g. Youtube embed ID or URL
  content?: string;
  dateAdded: string;
  duration?: string; // e.g., "18 Menit" or "24 Halaman"
  size?: string; // e.g., "4.2 MB"
  downloadCount: number;
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  instructions: string;
  dueDate: string; // ISO date string
  maxScore: number;
  allowFileUpload: boolean;
  teacherId: string;
  teacherName: string;
  status?: 'pending' | 'submitted' | 'graded';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  submittedAt: string;
  textAnswer?: string;
  fileName?: string;
  fileSize?: string;
  score?: number; // 0 - 100
  feedback?: string;
  status: 'submitted' | 'graded';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  grade: GradeLevel;
  major: Major;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  questions: QuizQuestion[];
  isPublished: boolean;
  deadline?: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  studentId: string;
  studentName: string;
  score: number;
  totalCorrect: number;
  totalWrong: number;
  totalSkipped: number;
  answers: { [questionId: string]: 'A' | 'B' | 'C' | 'D' | 'E' | null };
  completedAt: string;
  timeSpentSeconds: number;
}

export interface DiscussionReply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface DiscussionPost {
  id: string;
  subjectId: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  authorAvatar: string;
  title: string;
  content: string;
  createdAt: string;
  replies: DiscussionReply[];
  likes: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Akademik' | 'Ujian' | 'Ekstrakurikuler' | 'Umum';
  date: string;
  isUrgent: boolean;
  author: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  startTime: string;
  endTime: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  room: string;
  color: string;
  classRoom: string;
  meetLink?: string;
}

export interface StudentGrade {
  subjectId: string;
  subjectName: string;
  category: 'Wajib' | 'Peminatan';
  kkm: number;
  tugasScore: number;
  utsScore: number;
  uasScore: number;
  finalScore: number;
  predicate: 'A' | 'B' | 'C' | 'D';
  note: string;
}
