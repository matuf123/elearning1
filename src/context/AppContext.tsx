import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  Subject,
  Material,
  Assignment,
  Submission,
  Quiz,
  QuizResult,
  Announcement,
  ScheduleItem,
  StudentGrade,
  DiscussionPost,
} from '../types';
import {
  mockUsers,
  mockSubjects,
  mockMaterials,
  mockAssignments,
  mockSubmissions,
  mockQuizzes,
  mockAnnouncements,
  mockSchedule,
  mockGrades,
  mockDiscussions,
} from '../data/mockData';

interface AppNotification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

interface AppContextType {
  currentUser: User;
  switchRole: (role: Role) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (id: string | null) => void;
  
  // Data
  users: User[];
  subjects: Subject[];
  materials: Material[];
  assignments: Assignment[];
  submissions: Submission[];
  quizzes: Quiz[];
  quizResults: QuizResult[];
  announcements: Announcement[];
  schedules: ScheduleItem[];
  grades: StudentGrade[];
  discussions: DiscussionPost[];

  // Mutations
  addMaterial: (material: Omit<Material, 'id' | 'dateAdded' | 'downloadCount'>) => void;
  deleteMaterial: (id: string) => void;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;
  submitAssignment: (asgId: string, textAnswer?: string, fileName?: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  submitQuizResult: (result: QuizResult) => void;
  addDiscussionPost: (subjectId: string, title: string, content: string) => void;
  addDiscussionReply: (discussionId: string, content: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUserStatus: (id: string, status: 'active' | 'inactive') => void;
  deleteUser: (id: string) => void;

  // Search & Notifications
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  notifications: AppNotification[];
  markNotificationsAsRead: () => void;
  addToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Default to Siswa
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // States
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [schedules] = useState<ScheduleItem[]>(mockSchedule);
  const [grades, setGrades] = useState<StudentGrade[]>(mockGrades);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(mockDiscussions);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n1',
      text: 'Tugas Analisis Radiasi Benda Hitam telah dinilai: 95/100',
      time: '10 menit lalu',
      read: false,
      type: 'success',
    },
    {
      id: 'n2',
      text: 'Materi baru diunggah di Fisika Peminatan Kelas XII',
      time: '2 jam lalu',
      read: false,
      type: 'info',
    },
    {
      id: 'n3',
      text: 'Jadwal UTS Gasal akan segera dimulai dalam 14 hari',
      time: '1 hari lalu',
      read: true,
      type: 'warning',
    },
  ]);

  // Handle dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const switchRole = (role: Role) => {
    const targetUser = users.find(u => u.role === role) || users[0];
    setCurrentUser(targetUser);
    setActiveTab('dashboard');
    setSelectedSubjectId(null);
    addToast(`Beralih ke mode ${role.toUpperCase()}: ${targetUser.name}`, 'info');
  };

  const addToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      text: message,
      time: 'Baru saja',
      read: false,
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Material Actions
  const addMaterial = (newMat: Omit<Material, 'id' | 'dateAdded' | 'downloadCount'>) => {
    const created: Material = {
      ...newMat,
      id: 'mat_' + Date.now(),
      dateAdded: new Date().toISOString().split('T')[0],
      downloadCount: 0,
    };
    setMaterials(prev => [created, ...prev]);
    addToast(`Materi "${created.title}" berhasil diunggah!`, 'success');
  };

  const deleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    addToast('Materi berhasil dihapus.', 'info');
  };

  // Assignment Actions
  const addAssignment = (newAsg: Omit<Assignment, 'id' | 'status'>) => {
    const created: Assignment = {
      ...newAsg,
      id: 'asg_' + Date.now(),
      status: 'pending',
    };
    setAssignments(prev => [created, ...prev]);
    addToast(`Tugas baru "${created.title}" berhasil dibuat!`, 'success');
  };

  const submitAssignment = (asgId: string, textAnswer?: string, fileName?: string) => {
    const newSub: Submission = {
      id: 'sub_' + Date.now(),
      assignmentId: asgId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentClass: currentUser.classRoom || 'XII MIPA 1',
      submittedAt: new Date().toISOString(),
      textAnswer,
      fileName: fileName || 'Jawaban_Tugas_' + currentUser.name.replace(/\s+/g, '_') + '.pdf',
      fileSize: '2.1 MB',
      status: 'submitted',
    };

    setSubmissions(prev => [newSub, ...prev]);
    setAssignments(prev =>
      prev.map(a => (a.id === asgId ? { ...a, status: 'submitted' } : a))
    );
    addToast('Tugas Anda berhasil dikirim ke guru!', 'success');
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === submissionId ? { ...s, score, feedback, status: 'graded' } : s
      )
    );
    // Find assignment to update grade in recap
    const sub = submissions.find(s => s.id === submissionId);
    if (sub) {
      const asg = assignments.find(a => a.id === sub.assignmentId);
      if (asg) {
        setGrades(prev =>
          prev.map(g =>
            g.subjectId === asg.subjectId
              ? {
                  ...g,
                  tugasScore: Math.round((g.tugasScore + score) / 2),
                  finalScore: Math.round((g.utsScore + g.uasScore + score) / 3),
                }
              : g
          )
        );
      }
    }
    addToast(`Nilai (${score}/100) dan masukan telah tersimpan.`, 'success');
  };

  // Quiz Actions
  const addQuiz = (newQuiz: Omit<Quiz, 'id'>) => {
    const created: Quiz = {
      ...newQuiz,
      id: 'quiz_' + Date.now(),
    };
    setQuizzes(prev => [created, ...prev]);
    addToast(`Paket Ujian "${created.title}" berhasil diterbitkan!`, 'success');
  };

  const submitQuizResult = (result: QuizResult) => {
    setQuizResults(prev => [result, ...prev]);
    addToast(`Hasil ujian tersimpan! Skor: ${result.score}/100`, result.score >= 75 ? 'success' : 'warning');
  };

  // Discussions
  const addDiscussionPost = (subjectId: string, title: string, content: string) => {
    const post: DiscussionPost = {
      id: 'disc_' + Date.now(),
      subjectId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      title,
      content,
      createdAt: new Date().toISOString(),
      replies: [],
      likes: 1,
    };
    setDiscussions(prev => [post, ...prev]);
    addToast('Pertanyaan baru telah diterbitkan di forum!', 'success');
  };

  const addDiscussionReply = (discussionId: string, content: string) => {
    setDiscussions(prev =>
      prev.map(d => {
        if (d.id === discussionId) {
          return {
            ...d,
            replies: [
              ...d.replies,
              {
                id: 'rep_' + Date.now(),
                authorId: currentUser.id,
                authorName: currentUser.name,
                authorRole: currentUser.role,
                authorAvatar: currentUser.avatar,
                content,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        return d;
      })
    );
    addToast('Jawaban Anda berhasil diposting di forum diskusi.', 'success');
  };

  // Announcements
  const addAnnouncement = (newAnn: Omit<Announcement, 'id' | 'date'>) => {
    const created: Announcement = {
      ...newAnn,
      id: 'ann_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements(prev => [created, ...prev]);
    addToast('Pengumuman sekolah berhasil diterbitkan!', 'success');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    addToast('Pengumuman dihapus.', 'info');
  };

  // Admin User Management
  const addUser = (newUser: Omit<User, 'id'>) => {
    const created: User = {
      ...newUser,
      id: 'user_' + Date.now(),
      avatar: newUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
    setUsers(prev => [created, ...prev]);
    addToast(`Pengguna ${created.name} (${created.role}) berhasil ditambahkan!`, 'success');
  };

  const updateUserStatus = (id: string, status: 'active' | 'inactive') => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status } : u))
    );
    addToast(`Status akun pengguna diperbarui ke ${status}.`, 'info');
  };

  const deleteUser = (id: string) => {
    if (id === currentUser.id) {
      addToast('Tidak dapat menghapus akun yang sedang aktif digunakan.', 'warning');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    addToast('Akun pengguna berhasil dihapus.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedSubjectId,
        setSelectedSubjectId,
        users,
        subjects,
        materials,
        assignments,
        submissions,
        quizzes,
        quizResults,
        announcements,
        schedules,
        grades,
        discussions,
        addMaterial,
        deleteMaterial,
        addAssignment,
        submitAssignment,
        gradeSubmission,
        addQuiz,
        submitQuizResult,
        addDiscussionPost,
        addDiscussionReply,
        addAnnouncement,
        deleteAnnouncement,
        addUser,
        updateUserStatus,
        deleteUser,
        isSearchOpen,
        setIsSearchOpen,
        notifications,
        markNotificationsAsRead,
        addToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
