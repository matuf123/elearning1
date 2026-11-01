import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { SubjectsModule } from './components/subjects/SubjectsModule';
import { AssignmentModule } from './components/assignments/AssignmentModule';
import { QuizModule } from './components/quiz/QuizModule';
import { GradesModule } from './components/grades/GradesModule';
import { ScheduleModule } from './components/schedule/ScheduleModule';
import { AdminUserManagement } from './components/admin/AdminUserManagement';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AttendanceReportModal } from './components/reports/AttendanceReportModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Modals
import { AddMaterialModal } from './components/modals/AddMaterialModal';
import { AddAssignmentModal } from './components/modals/AddAssignmentModal';
import { AddQuizModal } from './components/modals/AddQuizModal';
import { AddUserModal } from './components/modals/AddUserModal';
import { AddAnnouncementModal } from './components/modals/AddAnnouncementModal';

const MainAppContent: React.FC = () => {
  const { currentUser, activeTab, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global modals
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [isPrintReportOpen, setIsPrintReportOpen] = useState(false);

  // Render content depending on activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'siswa') {
          return <StudentDashboard />;
        } else if (currentUser.role === 'guru') {
          return (
            <TeacherDashboard
              onOpenAddMaterial={() => setIsAddMaterialOpen(true)}
              onOpenAddAssignment={() => setIsAddAssignmentOpen(true)}
              onOpenAddQuiz={() => setIsAddQuizOpen(true)}
              onOpenPrintReport={() => setIsPrintReportOpen(true)}
            />
          );
        } else {
          return (
            <AdminDashboard
              onOpenAddAnnouncement={() => setIsAddAnnouncementOpen(true)}
              onOpenAddUser={() => setIsAddUserOpen(true)}
            />
          );
        }

      case 'subjects':
        return (
          <SubjectsModule
            onOpenAddMaterial={() => setIsAddMaterialOpen(true)}
            onOpenAddAssignment={() => setIsAddAssignmentOpen(true)}
          />
        );

      case 'assignments':
        return (
          <AssignmentModule
            onOpenAddAssignment={() => setIsAddAssignmentOpen(true)}
          />
        );

      case 'quizzes':
        return (
          <QuizModule
            onOpenAddQuiz={() => setIsAddQuizOpen(true)}
          />
        );

      case 'grades':
        return <GradesModule />;

      case 'schedule':
        return <ScheduleModule />;

      case 'reports':
        return <GradesModule />;

      case 'users':
        return (
          <AdminUserManagement
            onOpenAddUser={() => setIsAddUserOpen(true)}
          />
        );

      case 'announcements':
        return (
          <AdminAnnouncements
            onOpenAddAnnouncement={() => setIsAddAnnouncementOpen(true)}
          />
        );

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderActiveView()}

          {/* Footer note */}
          <footer className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 no-print">
            <p>
              © 2026 <strong>EduSMA</strong> — Portal Pembelajaran Terpadu SMA Negeri 1 Edukasi.
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Desain responsif, clean neumorphic UI, React 19 + Tailwind CSS, siap diekspor ke Vercel.
            </p>
          </footer>
        </main>
      </div>

      {/* Global Interactive Search Modal (Ctrl + K) */}
      <GlobalSearchModal />

      {/* Action Modals */}
      {isAddMaterialOpen && (
        <AddMaterialModal onClose={() => setIsAddMaterialOpen(false)} />
      )}
      {isAddAssignmentOpen && (
        <AddAssignmentModal onClose={() => setIsAddAssignmentOpen(false)} />
      )}
      {isAddQuizOpen && (
        <AddQuizModal onClose={() => setIsAddQuizOpen(false)} />
      )}
      {isAddUserOpen && (
        <AddUserModal onClose={() => setIsAddUserOpen(false)} />
      )}
      {isAddAnnouncementOpen && (
        <AddAnnouncementModal onClose={() => setIsAddAnnouncementOpen(false)} />
      )}
      {isPrintReportOpen && (
        <AttendanceReportModal onClose={() => setIsPrintReportOpen(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
