/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StudentExamView } from './components/StudentExamView';
import { TeacherGradingView } from './components/TeacherGradingView';
import { StatisticsView } from './components/StatisticsView';
import { ResultLookupView } from './components/ResultLookupView';
import { TeacherAuthModal } from './components/TeacherAuthModal';
import { ShareExamModal } from './components/ShareExamModal';
import { examApi } from './services/examApi';
import { Exam, Submission } from './types/exam';
import { HISTORY_EXAMS } from './data/historyExams';
import { INITIAL_SAMPLE_SUBMISSIONS } from './data/sampleSubmissions';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'exam' | 'teacher' | 'stats' | 'lookup'>('exam');
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    try {
      return !!sessionStorage.getItem('teacher_auth_token');
    } catch {
      return false;
    }
  });
  const [showTeacherAuthModal, setShowTeacherAuthModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [exams, setExams] = useState<Exam[]>(HISTORY_EXAMS);
  const [activeExam, setActiveExam] = useState<Exam>(HISTORY_EXAMS[0]);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SAMPLE_SUBMISSIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch submissions from API/server
  const fetchSubmissions = useCallback(async (quiet = false) => {
    if (!quiet) setIsLoading(true);
    try {
      const data = await examApi.getSubmissions();
      setSubmissions(data);
    } catch (e) {
      console.error('Failed to fetch submissions', e);
    } finally {
      if (!quiet) setIsLoading(false);
    }
  }, []);

  // Fetch exams from API
  useEffect(() => {
    async function loadExams() {
      try {
        const examList = await examApi.getExams();
        setExams(examList);
        if (examList.length > 0) {
          setActiveExam(examList[0]);
        }
      } catch (e) {
        console.error('Failed to load exams', e);
      }
    }
    loadExams();
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Background auto-refresh every 12 seconds so teacher across any computer sees submissions in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSubmissions(true);
    }, 12000);
    return () => clearInterval(interval);
  }, [fetchSubmissions]);

  // Handle Tab navigation with password protection for teacher room
  const handleSelectTab = (tab: 'exam' | 'teacher' | 'stats' | 'lookup') => {
    if (tab === 'teacher' && !isTeacherAuthenticated) {
      setShowTeacherAuthModal(true);
      return;
    }
    setCurrentTab(tab);
  };

  const handleTeacherAuthSuccess = () => {
    setIsTeacherAuthenticated(true);
    setShowTeacherAuthModal(false);
    setCurrentTab('teacher');
  };

  const handleLogoutTeacher = () => {
    try {
      sessionStorage.removeItem('teacher_auth_token');
    } catch {}
    setIsTeacherAuthenticated(false);
    if (currentTab === 'teacher') {
      setCurrentTab('exam');
    }
  };

  // Student submits exam
  const handleSubmitExam = async (submission: Submission) => {
    setIsSubmitting(true);
    try {
      const saved = await examApi.submitExam(submission);
      setSubmissions(prev => [saved, ...prev.filter(s => s.id !== saved.id)]);
    } catch (e) {
      console.error('Submit error', e);
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Teacher grades submission
  const handleGradeSubmission = async (id: string, grading: any) => {
    try {
      const updated = await examApi.gradeSubmission(id, grading);
      setSubmissions(prev => prev.map(s => s.id === id ? updated : s));
    } catch (e) {
      console.error('Grade error', e);
      throw e;
    }
  };

  // Teacher deletes submission
  const handleDeleteSubmission = async (id: string) => {
    try {
      await examApi.deleteSubmission(id);
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (e) {
      console.error('Delete error', e);
      throw e;
    }
  };

  // Teacher resets to sample data
  const handleResetSampleData = async () => {
    if (confirm('Khôi phục danh sách học sinh mẫu ban đầu?')) {
      setIsLoading(true);
      try {
        const samples = await examApi.resetToSampleData();
        setSubmissions(samples);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const pendingGradingCount = submissions.filter(s => !s.grading.isGraded).length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        pendingGradingCount={pendingGradingCount}
        onRefreshData={() => fetchSubmissions(false)}
        isRefreshing={isLoading}
        isTeacherAuthenticated={isTeacherAuthenticated}
        onLogoutTeacher={handleLogoutTeacher}
        onOpenShareModal={() => setShowShareModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {currentTab === 'exam' && (
          <StudentExamView
            exams={exams}
            activeExam={activeExam}
            onSelectExam={setActiveExam}
            onSubmit={handleSubmitExam}
            isSubmitting={isSubmitting}
          />
        )}

        {currentTab === 'teacher' && isTeacherAuthenticated && (
          <TeacherGradingView
            submissions={submissions}
            exams={exams}
            onGradeSubmission={handleGradeSubmission}
            onDeleteSubmission={handleDeleteSubmission}
            onResetSampleData={handleResetSampleData}
            onRefreshData={() => fetchSubmissions(false)}
            isLoading={isLoading}
          />
        )}

        {currentTab === 'stats' && (
          <StatisticsView
            submissions={submissions}
            exams={exams}
          />
        )}

        {currentTab === 'lookup' && (
          <ResultLookupView
            submissions={submissions}
            exams={exams}
          />
        )}
      </main>

      {/* Password Authentication Modal for Teacher Room */}
      <TeacherAuthModal
        isOpen={showTeacherAuthModal}
        onSuccess={handleTeacherAuthSuccess}
        onClose={() => setShowTeacherAuthModal(false)}
      />

      {/* Share Exam Link & QR Modal */}
      <ShareExamModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-bold text-stone-200">Hệ Thống Ôn Thi &amp; Chấm Thi Môn Lịch Sử</span>
            <span className="mx-2 text-stone-600">·</span>
            <span>Chương trình GDPT mới cấp THCS &amp; THPT</span>
          </div>
          <div className="text-center sm:text-right text-stone-500 italic">
            “Dân ta phải biết sử ta – Cho tường gốc tích nước nhà Việt Nam” (Hồ Chí Minh)
          </div>
        </div>
      </footer>
    </div>
  );
}
