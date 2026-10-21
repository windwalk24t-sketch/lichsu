import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Save, 
  User, 
  HelpCircle, 
  Printer, 
  CheckCircle2,
  XCircle,
  FileCheck,
  Eye,
  Check,
  Award
} from 'lucide-react';
import { Submission, Exam, EssayGradeDetail, SingleChoiceQuestion, TrueFalseQuestion } from '../types/exam';

interface GradingModalProps {
  submission: Submission;
  exam: Exam;
  onClose: () => void;
  onSaveGrading: (submissionId: string, updatedGrading: any) => Promise<void>;
  isSaving: boolean;
  initialTab?: 'essay_grading' | 'full_review';
}

export const GradingModal: React.FC<GradingModalProps> = ({
  submission,
  exam,
  onClose,
  onSaveGrading,
  isSaving,
  initialTab = 'essay_grading'
}) => {
  const [modalTab, setModalTab] = useState<'essay_grading' | 'full_review'>(initialTab);

  // Collect all questions
  const allQuestions = exam.sections.flatMap(sec => sec.questions);
  const essayQuestions = allQuestions.filter(q => q.type === 'essay');
  const singleChoiceQuestions = allQuestions.filter(q => q.type === 'single_choice') as SingleChoiceQuestion[];
  const trueFalseQuestions = allQuestions.filter(q => q.type === 'true_false_group') as TrueFalseQuestion[];

  // Local state for essay grades
  const [essayScores, setEssayScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    essayQuestions.forEach(q => {
      const existing = submission.grading.essayGradingDetails?.[q.id]?.score;
      initial[q.id] = typeof existing === 'number' ? existing : 0;
    });
    return initial;
  });

  const [essayFeedbacks, setEssayFeedbacks] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    essayQuestions.forEach(q => {
      const existing = submission.grading.essayGradingDetails?.[q.id]?.feedback;
      initial[q.id] = existing || '';
    });
    return initial;
  });

  const [generalComment, setGeneralComment] = useState<string>(
    submission.grading.teacherGeneralComment || ''
  );

  const [teacherName, setTeacherName] = useState<string>(
    submission.grading.gradedBy || 'Giáo viên Bộ môn Lịch sử'
  );

  // Quick preset feedback comments
  const PRESET_COMMENTS = [
    'Trả lời đầy đủ các ý theo bareme chuẩn.',
    'Tính toán chính xác số năm sự kiện lịch sử.',
    'Nêu đúng khái niệm, diễn đạt trong sáng.',
    'Cần bổ sung thêm dẫn chứng lịch sử cụ thể.',
    'Phần liên hệ trách nhiệm bản thân cần thiết thực hơn.',
    'Bài làm rất tốt, đáng khen ngợi!'
  ];

  const handleScoreChange = (qId: string, maxScore: number, score: number) => {
    const clamped = Math.min(maxScore, Math.max(0, score));
    setEssayScores(prev => ({ ...prev, [qId]: clamped }));
  };

  const handleAddPresetComment = (qId: string, text: string) => {
    setEssayFeedbacks(prev => {
      const current = prev[qId] || '';
      return {
        ...prev,
        [qId]: current ? `${current}. ${text}` : text
      };
    });
  };

  // Calculate live total score
  const totalEssayScore = Number(
    Object.values(essayScores).reduce((acc, curr) => acc + (curr || 0), 0).toFixed(2)
  );

  const autoScore = Number(
    (submission.grading.autoChoiceScore + submission.grading.autoTrueFalseScore).toFixed(2)
  );

  const totalScore = Number(
    Math.min(10, autoScore + totalEssayScore).toFixed(2)
  );

  const handleSave = async () => {
    const details: Record<string, EssayGradeDetail> = {};
    essayQuestions.forEach(q => {
      details[q.id] = {
        questionId: q.id,
        score: essayScores[q.id] || 0,
        maxScore: q.maxPoints,
        feedback: essayFeedbacks[q.id] || ''
      };
    });

    const updatedGrading = {
      isGraded: true,
      autoChoiceScore: submission.grading.autoChoiceScore,
      autoTrueFalseScore: submission.grading.autoTrueFalseScore,
      essayScore: totalEssayScore,
      totalScore,
      maxScore: exam.totalPoints,
      teacherGeneralComment: generalComment,
      essayGradingDetails: details,
      gradedBy: teacherName
    };

    await onSaveGrading(submission.id, updatedGrading);
  };

  const handlePrint = () => {
    window.print();
  };

  // Count correct multiple choice
  let singleChoiceCorrectCount = 0;
  singleChoiceQuestions.forEach(q => {
    if (submission.answers.singleChoice[q.id] === q.correctAnswer) {
      singleChoiceCorrectCount++;
    }
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Bài làm của học sinh: {submission.student.fullName}
              </h3>
              <div className="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                <span>Lớp: <strong className="text-stone-200">{submission.student.className}</strong></span>
                <span>·</span>
                <span>Trường: <strong className="text-stone-200">{submission.student.schoolName}</strong></span>
                <span>·</span>
                <span>Mã đề: <strong className="text-amber-400 font-mono">{submission.examCode}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="In phiếu bài thi"
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs between Grading and Full View */}
        <div className="bg-stone-100 px-6 pt-3 border-b border-stone-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalTab('essay_grading')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-t border-x ${
                modalTab === 'essay_grading'
                  ? 'bg-white text-amber-800 border-stone-200 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 border-transparent hover:bg-stone-200/60'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Chấm bài tự luận &amp; Nhận xét</span>
            </button>

            <button
              onClick={() => setModalTab('full_review')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 border-t border-x ${
                modalTab === 'full_review'
                  ? 'bg-white text-amber-800 border-stone-200 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 border-transparent hover:bg-stone-200/60'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Xem chi tiết bài làm trắc nghiệm ({singleChoiceCorrectCount}/{singleChoiceQuestions.length} câu đúng)</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 pb-2">
            Thời gian nộp:{' '}
            <strong className="text-stone-800">
              {new Date(submission.submittedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} ngày {new Date(submission.submittedAt).toLocaleDateString('vi-VN')}
            </strong>
          </div>
        </div>

        {/* Live Score Summary Banner */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-stone-500">Điểm Trắc nghiệm:</span>{' '}
              <strong className="text-stone-900 font-bold tabular-nums">
                {autoScore} đ
              </strong>
            </div>
            <div>
              <span className="text-stone-500">Điểm Tự luận:</span>{' '}
              <strong className="text-amber-700 font-bold tabular-nums">
                +{totalEssayScore} đ
              </strong>
            </div>
            <div className="px-3 py-1 bg-amber-100 border border-amber-300 rounded-lg">
              <span className="text-stone-700 font-semibold">TỔNG ĐIỂM:</span>{' '}
              <strong className="text-amber-900 text-base font-extrabold tabular-nums">
                {totalScore} / 10.0
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-stone-500">Người chấm:</label>
            <input
              type="text"
              value={teacherName}
              onChange={e => setTeacherName(e.target.value)}
              className="px-2.5 py-1 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: ESSAY GRADING DESK */}
          {modalTab === 'essay_grading' && (
            <>
              {essayQuestions.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  Đề thi này không có phần tự luận hoặc chỉ gồm trắc nghiệm.
                </div>
              ) : (
                essayQuestions.map(q => {
                  const currentScore = essayScores[q.id] || 0;
                  const currentFeedback = essayFeedbacks[q.id] || '';
                  const studentAnswer = submission.answers.essay[q.id] || '';

                  return (
                    <div 
                      key={q.id}
                      className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-xs"
                    >
                      {/* Question header */}
                      <div className="bg-stone-100/70 px-4 py-3 border-b border-stone-200 flex items-center justify-between">
                        <span className="text-sm font-bold text-stone-900">
                          Câu {q.questionNumber}. Phần Tự luận (Tối đa {q.maxPoints} điểm)
                        </span>
                        <span className="text-xs font-semibold text-stone-600">
                          Điểm chấm: <strong className="text-amber-700 text-sm">{currentScore}</strong> / {q.maxPoints} đ
                        </span>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Prompt text */}
                        <div className="text-xs sm:text-sm font-medium text-stone-800 whitespace-pre-line leading-relaxed bg-amber-50/40 p-3 rounded-lg border border-amber-100">
                          <strong>Đề bài:</strong> {q.question}
                        </div>

                        {/* Official Grading Guide & Bareme */}
                        {q.officialGuide && (
                          <div className="text-xs text-stone-700 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 space-y-1.5">
                            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Hướng dẫn chấm chính thức của Bộ GD&amp;ĐT:
                            </div>
                            <p className="whitespace-pre-line leading-relaxed text-emerald-800">
                              {q.officialGuide}
                            </p>
                            {q.rubric && q.rubric.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-emerald-200 space-y-1">
                                {q.rubric.map(r => (
                                  <div key={r.id} className="flex items-start justify-between gap-2 text-xs">
                                    <span>• {r.criteria}</span>
                                    <span className="font-semibold text-emerald-900 shrink-0">({r.maxPoints}đ)</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Student's Answer */}
                        <div>
                          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            Bài làm của học sinh:
                          </div>
                          <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-900 text-xs sm:text-sm whitespace-pre-line leading-relaxed min-h-[70px]">
                            {studentAnswer ? (
                              studentAnswer
                            ) : (
                              <span className="text-stone-400 italic">Học sinh bỏ trống không làm câu này.</span>
                            )}
                          </div>
                        </div>

                        {/* Score Input Stepper & Quick Buttons */}
                        <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <label className="text-xs font-bold text-stone-700">
                              Nhập điểm câu này:
                            </label>
                            <input
                              type="number"
                              step="0.25"
                              min="0"
                              max={q.maxPoints}
                              value={currentScore}
                              onChange={e => handleScoreChange(q.id, q.maxPoints, parseFloat(e.target.value) || 0)}
                              className="w-20 px-2 py-1 text-center font-bold text-sm border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500"
                            />
                            <span className="text-xs text-stone-500">/ {q.maxPoints} điểm</span>
                          </div>

                          {/* Quick Point presets */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs text-stone-400 mr-1">Nhanh:</span>
                            {[0, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0]
                              .filter(val => val <= q.maxPoints)
                              .map(val => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => handleScoreChange(q.id, q.maxPoints, val)}
                                  className={`px-2 py-0.5 rounded text-xs font-medium border transition-colors ${
                                    currentScore === val
                                      ? 'bg-amber-600 text-white border-amber-600'
                                      : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                                  }`}
                                >
                                  {val}đ
                                </button>
                              ))}
                            <button
                              type="button"
                              onClick={() => handleScoreChange(q.id, q.maxPoints, q.maxPoints)}
                              className={`px-2 py-0.5 rounded text-xs font-bold border transition-colors ${
                                currentScore === q.maxPoints
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                              }`}
                            >
                              Tối đa ({q.maxPoints}đ)
                            </button>
                          </div>
                        </div>

                        {/* Feedback comment input for this question */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold text-stone-700">
                              Nhận xét chi tiết cho câu hỏi này:
                            </label>
                          </div>

                          {/* Quick preset chips */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {PRESET_COMMENTS.slice(0, 4).map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleAddPresetComment(q.id, preset)}
                                className="text-xs px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors"
                              >
                                + {preset}
                              </button>
                            ))}
                          </div>

                          <input
                            type="text"
                            placeholder="Nhập nhận xét cụ thể cho học sinh..."
                            value={currentFeedback}
                            onChange={e => setEssayFeedbacks(prev => ({ ...prev, [q.id]: e.target.value }))}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Teacher's General Assessment Comment */}
              <div className="p-4 rounded-xl border border-stone-200 bg-amber-50/30">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Nhận xét chung của giáo viên về toàn bài thi
                </label>
                <textarea
                  rows={3}
                  value={generalComment}
                  onChange={e => setGeneralComment(e.target.value)}
                  placeholder="Ví dụ: Em có tinh thần tự học tốt, phần trắc nghiệm làm chắc chắn, tự luận cần rèn thêm cách diễn đạt để đạt điểm trọn vẹn..."
                  className="w-full p-3 rounded-lg border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                />
              </div>
            </>
          )}

          {/* TAB 2: FULL TEST PAPER REVIEW (XEM CHI TIẾT TỪNG CÂU TRẮC NGHIỆM HỌC SINH ĐÃ CHỌN) */}
          {modalTab === 'full_review' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">
                    Chi tiết từng câu trả lời trắc nghiệm của học sinh
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Hệ thống đã tự động chấm đối chiếu với đáp án chuẩn.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đúng ({singleChoiceCorrectCount})
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-red-800">
                    <XCircle className="w-4 h-4 text-red-600" /> Sai ({singleChoiceQuestions.length - singleChoiceCorrectCount})
                  </span>
                </div>
              </div>

              {/* Section I: Multiple Choice Questions */}
              <div className="space-y-4">
                <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wider border-b pb-2">
                  Phần I: Trắc nghiệm ({singleChoiceQuestions.length} câu)
                </h4>

                {singleChoiceQuestions.map(q => {
                  const studentChoice = submission.answers.singleChoice[q.id];
                  const isCorrect = studentChoice === q.correctAnswer;

                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-xl border transition-colors ${
                        !studentChoice
                          ? 'border-stone-200 bg-stone-50/50'
                          : isCorrect
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-red-200 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-start gap-2.5">
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {q.questionNumber}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-stone-900 whitespace-pre-line leading-relaxed">
                            {q.question}
                          </span>
                        </div>

                        <div className="shrink-0">
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              <Check className="w-3.5 h-3.5" /> Đúng (+{q.points}đ)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                              <X className="w-3.5 h-3.5" /> Sai (0đ)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8 mt-2">
                        {q.options.map(opt => {
                          const isStudentSelected = studentChoice === opt.key;
                          const isOfficialAnswer = q.correctAnswer === opt.key;

                          return (
                            <div
                              key={opt.key}
                              className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                                isOfficialAnswer
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold'
                                  : isStudentSelected
                                  ? 'border-red-400 bg-red-50 text-red-950 font-semibold'
                                  : 'border-stone-200 bg-white text-stone-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isOfficialAnswer
                                    ? 'bg-emerald-600 text-white'
                                    : isStudentSelected
                                    ? 'bg-red-600 text-white'
                                    : 'bg-stone-200 text-stone-700'
                                }`}>
                                  {opt.key}
                                </span>
                                <span>{opt.text}</span>
                              </div>

                              <div>
                                {isStudentSelected && isOfficialAnswer && (
                                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-200/60 px-1.5 py-0.5 rounded">
                                    HS chọn (Đúng)
                                  </span>
                                )}
                                {isStudentSelected && !isOfficialAnswer && (
                                  <span className="text-[10px] text-red-700 font-bold bg-red-200/60 px-1.5 py-0.5 rounded">
                                    HS chọn (Sai)
                                  </span>
                                )}
                                {!isStudentSelected && isOfficialAnswer && (
                                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-200/60 px-1.5 py-0.5 rounded">
                                    Đáp án đúng
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="text-[11px] text-stone-600 mt-2 pl-8 italic">
                          💡 Giải thích: {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Section II: True/False Questions (if grade 10) */}
              {trueFalseQuestions.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wider border-b pb-2">
                    Phần II: Trắc nghiệm Đúng - Sai ({trueFalseQuestions.length} câu)
                  </h4>

                  {trueFalseQuestions.map(q => {
                    const studentAns = submission.answers.trueFalse[q.id] || {};

                    return (
                      <div key={q.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                        <div className="text-xs font-bold text-stone-900">
                          Câu {q.questionNumber}: Đoạn tư liệu
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs italic text-stone-700 leading-relaxed whitespace-pre-line">
                          {q.context}
                        </div>

                        <div className="space-y-2">
                          {q.items.map(item => {
                            const val = studentAns[item.key];
                            const isCorrect = val === item.correctAnswer;

                            return (
                              <div key={item.key} className="p-2.5 bg-white rounded-lg border border-stone-200 flex items-center justify-between gap-3 text-xs">
                                <div>
                                  <span className="font-bold text-amber-800 mr-2">{item.key})</span>
                                  <span>{item.text}</span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  <span>HS chọn: <strong>{val === true ? 'Đúng' : val === false ? 'Sai' : 'Chưa chọn'}</strong></span>
                                  <span>Đáp án: <strong className="text-emerald-700">{item.correctAnswer ? 'Đúng' : 'Sai'}</strong></span>
                                  {isCorrect ? (
                                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Đúng (+0.25đ)</span>
                                  ) : (
                                    <span className="text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded">Sai (0đ)</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="text-xs text-stone-500">
            {modalTab === 'essay_grading' ? (
              <span>Trạng thái sau khi lưu: <strong className="text-emerald-700">Đã hoàn thành chấm</strong></span>
            ) : (
              <span>Đang xem chi tiết toàn bài làm của học sinh</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Đóng
            </button>
            {modalTab === 'full_review' ? (
              <button
                type="button"
                onClick={() => setModalTab('essay_grading')}
                className="px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Chuyển sang chấm điểm tự luận</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Đang lưu vào hệ thống...' : 'Lưu kết quả & Chấm xong'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
