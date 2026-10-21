import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  HelpCircle,
  FileText,
  User,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { 
  Exam, 
  StudentInfo, 
  StudentAnswers, 
  Submission, 
  SingleChoiceQuestion, 
  TrueFalseQuestion, 
  EssayQuestion 
} from '../types/exam';

interface StudentExamViewProps {
  exams: Exam[];
  activeExam: Exam;
  onSelectExam: (exam: Exam) => void;
  onSubmit: (submission: Submission) => Promise<void>;
  isSubmitting: boolean;
}

export const StudentExamView: React.FC<StudentExamViewProps> = ({
  exams,
  activeExam,
  onSelectExam,
  onSubmit,
  isSubmitting
}) => {
  // Student Info state
  const [student, setStudent] = useState<StudentInfo>(() => {
    const saved = localStorage.getItem('last_student_info');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      fullName: '',
      className: '',
      schoolName: '',
      studentId: ''
    };
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(activeExam.durationMinutes * 60);
  const [answers, setAnswers] = useState<StudentAnswers>({
    singleChoice: {},
    trueFalse: {},
    essay: {}
  });

  // Track submission completion
  const [submittedResult, setSubmittedResult] = useState<Submission | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('');

  // Save student info
  useEffect(() => {
    if (student.fullName) {
      localStorage.setItem('last_student_info', JSON.stringify(student));
    }
  }, [student]);

  // Reset timer when exam changes
  useEffect(() => {
    setTimeLeft(activeExam.durationMinutes * 60);
    setAnswers({
      singleChoice: {},
      trueFalse: {},
      essay: {}
    });
    setSubmittedResult(null);
    setHasStarted(false);
  }, [activeExam]);

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || submittedResult) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, submittedResult]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSingleChoiceSelect = (qId: string, choice: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({
      ...prev,
      singleChoice: {
        ...prev.singleChoice,
        [qId]: choice
      }
    }));
  };

  const handleTrueFalseSelect = (qId: string, itemKey: 'a' | 'b' | 'c' | 'd', value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      trueFalse: {
        ...prev.trueFalse,
        [qId]: {
          ...(prev.trueFalse[qId] || {}),
          [itemKey]: value
        }
      }
    }));
  };

  const handleEssayChange = (qId: string, text: string) => {
    setAnswers(prev => ({
      ...prev,
      essay: {
        ...prev.essay,
        [qId]: text
      }
    }));
  };

  // Collect all flat questions for navigation
  const allQuestions = activeExam.sections.flatMap(sec => sec.questions);

  // Set default active question
  useEffect(() => {
    if (allQuestions.length > 0 && !activeQuestionId) {
      setActiveQuestionId(allQuestions[0].id);
    }
  }, [allQuestions, activeQuestionId]);

  // Calculate auto-graded score
  const calculateAutoScores = () => {
    let choiceScore = 0;
    let tfScore = 0;

    activeExam.sections.forEach(sec => {
      sec.questions.forEach(q => {
        if (q.type === 'single_choice') {
          if (answers.singleChoice[q.id] === q.correctAnswer) {
            choiceScore += q.points;
          }
        } else if (q.type === 'true_false_group') {
          const studentTf = answers.trueFalse[q.id] || {};
          q.items.forEach(item => {
            if (studentTf[item.key] === item.correctAnswer) {
              tfScore += q.pointsPerItem;
            }
          });
        }
      });
    });

    return {
      choiceScore: Number(choiceScore.toFixed(2)),
      tfScore: Number(tfScore.toFixed(2))
    };
  };

  const handleAutoSubmit = async () => {
    await doSubmit();
  };

  const doSubmit = async () => {
    const { choiceScore, tfScore } = calculateAutoScores();
    const autoTotal = Number((choiceScore + tfScore).toFixed(2));

    const submission: Submission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      examId: activeExam.id,
      examTitle: activeExam.title,
      examCode: activeExam.code,
      grade: activeExam.grade,
      student: {
        fullName: student.fullName.trim() || 'Học sinh ẩn danh',
        className: student.className.trim() || 'Tự do',
        schoolName: student.schoolName.trim() || 'THCS & THPT',
        studentId: (student.studentId || '').trim() || `HS${Math.floor(1000 + Math.random() * 9000)}`
      },
      answers,
      grading: {
        isGraded: false,
        autoChoiceScore: choiceScore,
        autoTrueFalseScore: tfScore,
        essayScore: 0,
        totalScore: autoTotal,
        maxScore: activeExam.totalPoints,
        teacherGeneralComment: '',
        essayGradingDetails: {}
      },
      submittedAt: new Date().toISOString(),
      timeSpentSeconds: (activeExam.durationMinutes * 60) - timeLeft
    };

    try {
      await onSubmit(submission);
      setSubmittedResult(submission);
      setShowConfirmModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Count answered questions
  const singleChoiceCount = Object.keys(answers.singleChoice).length;
  const totalSingleChoice = allQuestions.filter(q => q.type === 'single_choice').length;
  
  const tfQuestions = allQuestions.filter(q => q.type === 'true_false_group') as TrueFalseQuestion[];
  let tfAnsweredItems = 0;
  let tfTotalItems = 0;
  tfQuestions.forEach(q => {
    tfTotalItems += q.items.length;
    const ans = answers.trueFalse[q.id];
    if (ans) {
      tfAnsweredItems += Object.keys(ans).length;
    }
  });

  const essayQuestions = allQuestions.filter(q => q.type === 'essay') as EssayQuestion[];
  const essayAnsweredCount = Object.values(answers.essay).filter(txt => txt && txt.trim().length > 0).length;

  const totalAnswerable = totalSingleChoice + tfTotalItems + essayQuestions.length;
  const currentAnswered = singleChoiceCount + tfAnsweredItems + essayAnsweredCount;
  const progressPercent = totalAnswerable > 0 ? Math.round((currentAnswered / totalAnswerable) * 100) : 0;

  // View: Result screen after submitting
  if (submittedResult) {
    const isGrade10 = activeExam.grade === '10';
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="text-center pb-6 border-b border-stone-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">
              Nộp bài thi thành công!
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Bài thi của em đã được chuyển vào hệ thống chấm thi của Giáo viên trên toàn mạng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 p-4 bg-stone-50 rounded-lg text-sm">
            <div>
              <span className="text-stone-500">Thí sinh:</span>{' '}
              <strong className="text-stone-900">{submittedResult.student.fullName}</strong>
            </div>
            <div>
              <span className="text-stone-500">Lớp & Trường:</span>{' '}
              <strong className="text-stone-900">
                {submittedResult.student.className} - {submittedResult.student.schoolName}
              </strong>
            </div>
            <div>
              <span className="text-stone-500">Mã bài thi / SBD:</span>{' '}
              <strong className="font-mono text-stone-900">{submittedResult.student.studentId}</strong>
            </div>
            <div>
              <span className="text-stone-500">Thời gian làm bài:</span>{' '}
              <strong className="text-stone-900">
                {Math.floor(submittedResult.timeSpentSeconds / 60)} phút {submittedResult.timeSpentSeconds % 60} giây
              </strong>
            </div>
          </div>

          {/* Instant Auto-Grading Score Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-800">
                  Điểm trắc nghiệm tự động chấm
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-amber-900 tabular-nums">
                    {submittedResult.grading.totalScore.toFixed(2)}
                  </span>
                  <span className="text-stone-600 text-sm">
                    / {isGrade10 ? '7.0 điểm TN' : '7.0 điểm TN'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-200 text-amber-900">
                  <Clock className="w-3.5 h-3.5" />
                  Đang chờ GV chấm Tự luận ({isGrade10 ? '3.0đ' : '3.0đ'})
                </span>
                <p className="text-xs text-stone-500 mt-1">
                  Giáo viên có thể mở bài này trên máy khác để chấm chi tiết.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => {
                setSubmittedResult(null);
                setHasStarted(false);
              }}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              Làm lại bài thi
            </button>
            <button
              onClick={() => {
                // switch exam or return
                setSubmittedResult(null);
                setHasStarted(false);
              }}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors shadow-sm"
            >
              Chọn đề thi khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View: Pre-start Student Setup Screen
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Banner with history motif */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 mb-8 bg-stone-900">
          <img
            src="/src/assets/images/history_study_banner_1792595921523.jpg"
            alt="Di sản Lịch sử Việt Nam"
            className="w-full h-48 sm:h-64 object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Cổng Ôn Tập & Khảo Thí Trực Tuyến
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Hệ Thống Ôn Thi &amp; Đánh Giá Môn Lịch Sử
            </h1>
            <p className="text-stone-300 text-sm max-w-2xl">
              Cấu trúc chuẩn THCS và THPT mới của Bộ Giáo dục &amp; Đào tạo. Học sinh làm bài trực tuyến, tự động chấm trắc nghiệm và giáo viên chấm tự luận đa nền tảng.
            </p>
          </div>
        </div>

        {/* Exam Selection Pills */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6 shadow-sm">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Chọn Bộ Đề Kiểm Tra &amp; Ôn Tập
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exams.map(exam => {
              const isSelected = exam.id === activeExam.id;
              return (
                <button
                  key={exam.id}
                  onClick={() => onSelectExam(exam)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-1 ring-amber-500'
                      : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                      {exam.code}
                    </span>
                    <span className="text-xs text-amber-800 font-semibold">
                      Khối {exam.grade}
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1 leading-snug">
                    {exam.title}
                  </h3>
                  <div className="text-xs text-stone-500 flex items-center gap-2 mt-2">
                    <span>{exam.durationMinutes} phút</span>
                    <span>·</span>
                    <span>{exam.totalPoints} điểm</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Information Form */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" />
            Thông Tin Thí Sinh Làm Bài
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Họ và tên học sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={student.fullName}
                onChange={e => setStudent(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Lớp học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={activeExam.grade === '6' ? 'Ví dụ: 6A1' : 'Ví dụ: 10A3'}
                value={student.className}
                onChange={e => setStudent(prev => ({ ...prev, className: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Trường học
              </label>
              <input
                type="text"
                placeholder="Ví dụ: THCS Lê Quý Đôn"
                value={student.schoolName}
                onChange={e => setStudent(prev => ({ ...prev, schoolName: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Số báo danh / Mã học sinh
              </label>
              <input
                type="text"
                placeholder="Ví dụ: HS0123"
                value={student.studentId}
                onChange={e => setStudent(prev => ({ ...prev, studentId: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>
          </div>

          {/* Test rules info */}
          <div className="mt-6 p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <div className="font-semibold text-stone-800">Quy định phòng thi trực tuyến:</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Thời gian làm bài: <strong>{activeExam.durationMinutes} phút</strong>. Đồng hồ đếm ngược sẽ bắt đầu khi nhấn "Bắt đầu làm bài".</li>
              <li>Phần trắc nghiệm sẽ được hệ thống tự động chấm ngay khi nộp bài.</li>
              <li>Phần tự luận được đồng bộ lên máy chủ để giáo viên bộ môn chấm điểm và nhận xét chi tiết.</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                if (!student.fullName.trim()) {
                  alert('Vui lòng nhập Họ và tên của em trước khi bắt đầu.');
                  return;
                }
                setHasStarted(true);
              }}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow flex items-center gap-2"
            >
              <span>Bắt đầu làm bài</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View: Active Test Taking Interface
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Sticky Top Status Bar */}
      <div className="sticky top-16 z-30 bg-stone-900 text-white rounded-xl shadow-md p-4 mb-6 border border-stone-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base text-white">
              {activeExam.title}
            </h2>
            <div className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
              <span>Thí sinh: <strong className="text-stone-200">{student.fullName}</strong> ({student.className || 'Tự do'})</span>
              <span>·</span>
              <span>Mã đề: <strong className="font-mono text-amber-400">{activeExam.code}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-stone-400">
              Đã làm: <strong className="text-white tabular-nums">{currentAnswered}/{totalAnswerable}</strong>
            </span>
            <div className="w-24 bg-stone-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Countdown Clock */}
          <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono font-bold text-sm ${
            timeLeft < 300 ? 'bg-red-950/80 text-red-400 animate-pulse border border-red-800' : 'bg-stone-800 text-amber-400'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Submit Test Button */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Nộp bài</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Exam Questions Column (3 cols) */}
        <div className="lg:col-span-3 space-y-8">
          {activeExam.sections.map(section => (
            <div key={section.id} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <div className="border-b border-stone-200 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900 tracking-tight">
                    {section.title}
                  </h3>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {section.points} điểm
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {section.description}
                </p>
              </div>

              <div className="space-y-6">
                {section.questions.map(question => {
                  if (question.type === 'single_choice') {
                    const selected = answers.singleChoice[question.id];
                    return (
                      <div 
                        key={question.id} 
                        id={`q-${question.id}`}
                        className={`p-4 rounded-xl border transition-all ${
                          selected ? 'border-amber-400 bg-amber-50/20' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="shrink-0 w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                            {question.questionNumber}
                          </span>
                          <div className="text-sm font-medium text-stone-900 pt-0.5 whitespace-pre-line leading-relaxed">
                            {question.question}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-10">
                          {question.options.map(opt => {
                            const isChosen = selected === opt.key;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => handleSingleChoiceSelect(question.id, opt.key)}
                                className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${
                                  isChosen
                                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm font-medium'
                                    : 'bg-stone-50/60 hover:bg-stone-100 border-stone-200 text-stone-800'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                  isChosen ? 'bg-white text-stone-900' : 'bg-stone-200 text-stone-700'
                                }`}>
                                  {opt.key}
                                </span>
                                <span className="pt-0.5 leading-snug">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  if (question.type === 'true_false_group') {
                    const currentAns = answers.trueFalse[question.id] || {};
                    return (
                      <div 
                        key={question.id} 
                        id={`q-${question.id}`}
                        className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-stone-50/40"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-700 text-white text-xs font-bold">
                            Câu {question.questionNumber}
                          </span>
                          <div className="text-xs uppercase font-semibold text-stone-500 pt-1 tracking-wider">
                            Trắc nghiệm Đúng - Sai (1,0 điểm)
                          </div>
                        </div>

                        {/* Reading Context */}
                        <div className="bg-white p-4 rounded-lg border border-stone-200 text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed italic mb-4">
                          {question.context}
                        </div>

                        {/* Sub-items a, b, c, d */}
                        <div className="space-y-3">
                          {question.items.map(item => {
                            const val = currentAns[item.key];
                            return (
                              <div 
                                key={item.key}
                                className="p-3 bg-white rounded-lg border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                              >
                                <div className="text-xs sm:text-sm text-stone-800 flex items-start gap-2">
                                  <span className="font-bold text-amber-700 shrink-0">{item.key})</span>
                                  <span>{item.text}</span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                  <button
                                    type="button"
                                    onClick={() => handleTrueFalseSelect(question.id, item.key, true)}
                                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                                      val === true
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                    }`}
                                  >
                                    Đúng
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleTrueFalseSelect(question.id, item.key, false)}
                                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                                      val === false
                                        ? 'bg-red-600 text-white shadow-sm'
                                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                    }`}
                                  >
                                    Sai
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  if (question.type === 'essay') {
                    const essayText = answers.essay[question.id] || '';
                    const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
                    return (
                      <div 
                        key={question.id} 
                        id={`q-${question.id}`}
                        className="p-5 rounded-xl border border-stone-200 bg-white"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-indigo-900 text-white flex items-center justify-center text-xs font-bold">
                              {question.questionNumber}
                            </span>
                            <span className="text-sm font-bold text-stone-900">
                              Câu hỏi Tự luận ({question.maxPoints} điểm)
                            </span>
                          </div>
                          <span className="text-xs text-stone-400">
                            {wordCount} từ
                          </span>
                        </div>

                        <div className="text-sm font-medium text-stone-900 whitespace-pre-line mb-3 pl-9 leading-relaxed">
                          {question.question}
                        </div>

                        <div className="pl-9">
                          <textarea
                            rows={6}
                            value={essayText}
                            onChange={e => handleEssayChange(question.id, e.target.value)}
                            placeholder="Nhập câu trả lời tự luận chi tiết của em tại đây (diễn đạt rõ ràng, có dẫn chứng cụ thể)..."
                            className="w-full p-3.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm leading-relaxed"
                          />

                          <div className="flex items-center justify-between text-xs text-stone-500 mt-2">
                            <span className="flex items-center gap-1 text-stone-400">
                              <HelpCircle className="w-3.5 h-3.5" />
                              Gợi ý: Trình bày đủ các ý theo bareme để đạt điểm tối đa
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Question Palette (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-40 bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
              Phiếu theo dõi câu hỏi
            </h4>

            {/* Status Legend */}
            <div className="flex items-center gap-3 text-xs text-stone-500 mb-4 pb-3 border-b border-stone-100">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" /> Đã trả lời
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-stone-200 inline-block" /> Chưa làm
              </span>
            </div>

            {/* Grid of question buttons */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-medium text-stone-500 block mb-2">Trắc nghiệm</span>
                <div className="grid grid-cols-5 gap-2">
                  {allQuestions
                    .filter(q => q.type === 'single_choice')
                    .map(q => {
                      const isAnswered = !!answers.singleChoice[q.id];
                      return (
                        <a
                          key={q.id}
                          href={`#q-${q.id}`}
                          className={`h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                            isAnswered
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          {q.questionNumber}
                        </a>
                      );
                    })}
                </div>
              </div>

              {tfQuestions.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-stone-500 block mb-2">Đúng / Sai</span>
                  <div className="grid grid-cols-4 gap-2">
                    {tfQuestions.map(q => {
                      const count = answers.trueFalse[q.id] ? Object.keys(answers.trueFalse[q.id]).length : 0;
                      const isFullyAnswered = count === q.items.length;
                      return (
                        <a
                          key={q.id}
                          href={`#q-${q.id}`}
                          className={`h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                            isFullyAnswered
                              ? 'bg-amber-600 text-white'
                              : count > 0
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          C{q.questionNumber}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {essayQuestions.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-stone-500 block mb-2">Tự luận</span>
                  <div className="grid grid-cols-3 gap-2">
                    {essayQuestions.map(q => {
                      const hasText = !!answers.essay[q.id] && answers.essay[q.id].trim().length > 0;
                      return (
                        <a
                          key={q.id}
                          href={`#q-${q.id}`}
                          className={`h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                            hasText
                              ? 'bg-indigo-700 text-white'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          TL{q.questionNumber}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick summary button */}
            <div className="mt-6 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Nộp bài thi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Xác nhận nộp bài thi
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
              Em đã hoàn thành <strong className="text-stone-900">{currentAnswered}/{totalAnswerable}</strong> phần câu hỏi.
              {currentAnswered < totalAnswerable && (
                <span className="block mt-1 text-red-600 font-medium">
                  Lưu ý: Vẫn còn câu hỏi chưa trả lời. Em có chắc chắn muốn nộp bài lúc này?
                </span>
              )}
            </p>

            <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-600 mb-5 space-y-1">
              <div>Thí sinh: <strong>{student.fullName}</strong></div>
              <div>Đề thi: <strong>{activeExam.title}</strong></div>
              <div>Thời gian còn lại: <strong>{formatTime(timeLeft)}</strong></div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={doSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow"
              >
                {isSubmitting ? 'Đang gửi...' : 'Nộp bài ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
