import React, { useState } from 'react';
import { 
  Search, 
  Award, 
  CheckCircle2, 
  Clock, 
  User, 
  GraduationCap, 
  Printer, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { Submission, Exam } from '../types/exam';

interface ResultLookupViewProps {
  submissions: Submission[];
  exams: Exam[];
}

export const ResultLookupView: React.FC<ResultLookupViewProps> = ({
  submissions,
  exams
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Search results
  const searchResults = searchTerm.trim()
    ? submissions.filter(sub => {
        const q = searchTerm.toLowerCase().trim();
        return (
          sub.student.fullName.toLowerCase().includes(q) ||
          (sub.student.studentId || '').toLowerCase().includes(q) ||
          sub.student.className.toLowerCase().includes(q)
        );
      })
    : [];

  const handlePrint = () => {
    window.print();
  };

  const getExam = (examId: string) => {
    return exams.find(e => e.id === examId) || exams[0];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 mb-6 shadow-sm text-center">
        <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Search className="w-6 h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
          Tra Cứu Kết Quả Bài Thi Lịch Sử
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
          Nhập Họ và tên học sinh hoặc Biệt danh để xem điểm số chi tiết và nhận xét của giáo viên.
        </p>

        <div className="max-w-lg mx-auto relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setSelectedSubmission(null);
            }}
            placeholder="Ví dụ: Nguyễn Minh Anh, hoặc cute student..."
            className="w-full pl-4 pr-10 py-3 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
          <Search className="w-5 h-5 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick search chips */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-400 flex-wrap">
          <span>Học sinh mẫu nhanh:</span>
          {submissions.slice(0, 3).map(sub => (
            <button
              key={sub.id}
              onClick={() => {
                setSearchTerm(sub.student.fullName);
                setSelectedSubmission(sub);
              }}
              className="text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors font-medium border border-amber-200"
            >
              {sub.student.fullName}
            </button>
          ))}
        </div>
      </div>

      {/* Search Result Matches List (if multiple or single) */}
      {searchTerm.trim() && !selectedSubmission && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 mb-6">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
            Kết quả tìm kiếm ({searchResults.length})
          </h3>

          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm">
              Không tìm thấy bài thi nào với từ khóa "{searchTerm}". Vui lòng kiểm tra lại họ tên hoặc SBD.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {searchResults.map(sub => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className="py-3 px-3 rounded-lg hover:bg-amber-50/50 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {sub.student.fullName}
                    </h4>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Lớp {sub.student.className} · {sub.student.schoolName} · {sub.examTitle}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-700 font-mono">
                        {sub.grading.totalScore.toFixed(2)} / 10 đ
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {sub.grading.isGraded ? 'Đã có điểm GV' : 'Chờ chấm tự luận'}
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-lg bg-amber-600 text-white font-medium">
                      Xem chi tiết
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Submission Detail View */}
      {selectedSubmission && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Phiếu Báo Điểm &amp; Nhận Xét Học Sinh
              </span>
              <h2 className="text-2xl font-bold text-stone-900 mt-0.5">
                {selectedSubmission.student.fullName}
              </h2>
              <div className="text-xs text-stone-500 flex items-center gap-2 mt-1">
                <span>Lớp: <strong className="text-stone-800">{selectedSubmission.student.className}</strong></span>
                <span>·</span>
                <span>Trường: <strong className="text-stone-800">{selectedSubmission.student.schoolName}</strong></span>
                <span>·</span>
                <span>Biệt danh: <strong className="text-amber-800 font-semibold">{selectedSubmission.student.studentId || 'cute student'}</strong></span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In kết quả</span>
            </button>
          </div>

          {/* Exam Info */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-stone-500">Đề kiểm tra:</span>{' '}
              <strong className="text-stone-900">{selectedSubmission.examTitle}</strong>
            </div>
            <div>
              <span className="text-stone-500">Thời gian làm bài:</span>{' '}
              <strong className="text-stone-900">
                {Math.floor(selectedSubmission.timeSpentSeconds / 60)} phút {selectedSubmission.timeSpentSeconds % 60} giây
              </strong>
            </div>
            <div>
              <span className="text-stone-500">Ngày nộp:</span>{' '}
              <strong className="text-stone-900">
                {new Date(selectedSubmission.submittedAt).toLocaleDateString('vi-VN')}
              </strong>
            </div>
          </div>

          {/* Scores Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-xs text-stone-500 font-medium">Điểm trắc nghiệm (Hệ thống chấm)</span>
              <div className="text-2xl font-extrabold text-stone-800 font-mono mt-1">
                {(selectedSubmission.grading.autoChoiceScore + selectedSubmission.grading.autoTrueFalseScore).toFixed(2)} đ
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
              <span className="text-xs text-amber-800 font-medium">Điểm tự luận (Giáo viên chấm)</span>
              <div className="text-2xl font-extrabold text-amber-800 font-mono mt-1">
                {selectedSubmission.grading.isGraded
                  ? `+${selectedSubmission.grading.essayScore.toFixed(2)} đ`
                  : 'Đang chấm...'}
              </div>
            </div>

            <div className="p-4 bg-amber-600/10 rounded-xl border border-amber-600/30">
              <span className="text-xs text-amber-900 font-bold">TỔNG ĐIỂM CHÍNH THỨC</span>
              <div className="text-3xl font-black text-amber-900 font-mono mt-1">
                {selectedSubmission.grading.totalScore.toFixed(2)} <span className="text-xs font-normal text-stone-500">/ 10</span>
              </div>
            </div>
          </div>

          {/* Teacher's General Feedback */}
          {selectedSubmission.grading.teacherGeneralComment && (
            <div className="p-5 rounded-xl border border-amber-300 bg-amber-50">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                Nhận xét tổng quát của Giáo viên:
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                "{selectedSubmission.grading.teacherGeneralComment}"
              </p>
              {selectedSubmission.grading.gradedBy && (
                <div className="text-right text-xs text-stone-500 mt-2 font-semibold">
                  — {selectedSubmission.grading.gradedBy}
                </div>
              )}
            </div>
          )}

          {/* Essay Questions Detail Review */}
          {getExam(selectedSubmission.examId).sections
            .flatMap(s => s.questions)
            .filter(q => q.type === 'essay').length > 0 && (
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-700" />
                Chi tiết đánh giá câu hỏi tự luận
              </h3>

              {getExam(selectedSubmission.examId).sections
                .flatMap(s => s.questions)
                .filter(q => q.type === 'essay')
                .map(q => {
                  const detail = selectedSubmission.grading.essayGradingDetails?.[q.id];
                  const studentAns = selectedSubmission.answers.essay[q.id];

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800">
                          Câu {q.questionNumber}: {q.question}
                        </span>
                        <span className="text-xs font-bold font-mono text-amber-800 px-2 py-0.5 rounded bg-amber-100">
                          {detail?.score ?? 0} / {q.maxPoints} đ
                        </span>
                      </div>

                      <div className="text-xs text-stone-700 bg-white p-3 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block mb-1">Bài làm:</span>
                        {studentAns || <span className="italic text-stone-400">Không có câu trả lời</span>}
                      </div>

                      {detail?.feedback && (
                        <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                          <strong>Lời nhận xét của cô/thầy:</strong> {detail.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
