import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Trash2, 
  Edit3,
  RotateCcw,
  Sparkles,
  Eye
} from 'lucide-react';
import { Submission, Exam } from '../types/exam';
import { GradingModal } from './GradingModal';

interface TeacherGradingViewProps {
  submissions: Submission[];
  exams: Exam[];
  onGradeSubmission: (id: string, grading: any) => Promise<void>;
  onDeleteSubmission: (id: string) => Promise<void>;
  onResetSampleData: () => Promise<void>;
  onRefreshData: () => Promise<void>;
  isLoading: boolean;
}

export const TeacherGradingView: React.FC<TeacherGradingViewProps> = ({
  submissions,
  exams,
  onGradeSubmission,
  onDeleteSubmission,
  onResetSampleData,
  onRefreshData,
  isLoading
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedExamId, setSelectedExamId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubmissionToGrade, setActiveSubmissionToGrade] = useState<Submission | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'essay_grading' | 'full_review'>('essay_grading');
  const [isSavingGrade, setIsSavingGrade] = useState(false);

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    if (selectedGrade !== 'all' && sub.grade !== selectedGrade) return false;
    if (selectedExamId !== 'all' && sub.examId !== selectedExamId) return false;
    if (selectedStatus === 'pending' && sub.grading.isGraded) return false;
    if (selectedStatus === 'graded' && !sub.grading.isGraded) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = sub.student.fullName.toLowerCase().includes(q);
      const matchClass = sub.student.className.toLowerCase().includes(q);
      const matchId = (sub.student.studentId || '').toLowerCase().includes(q);
      if (!matchName && !matchClass && !matchId) return false;
    }
    return true;
  });

  const pendingCount = submissions.filter(s => !s.grading.isGraded).length;
  const gradedCount = submissions.filter(s => s.grading.isGraded).length;
  const averageScore = submissions.length > 0
    ? (submissions.reduce((acc, s) => acc + s.grading.totalScore, 0) / submissions.length).toFixed(1)
    : '0';

  const handleOpenGrading = (sub: Submission, tab: 'essay_grading' | 'full_review' = 'essay_grading') => {
    setModalInitialTab(tab);
    setActiveSubmissionToGrade(sub);
  };

  const handleSaveGrading = async (id: string, grading: any) => {
    setIsSavingGrade(true);
    try {
      await onGradeSubmission(id, grading);
      setActiveSubmissionToGrade(null);
    } catch (e) {
      console.error(e);
      alert('Có lỗi khi lưu kết quả chấm thi');
    } finally {
      setIsSavingGrade(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài làm của học sinh ${name}?`)) {
      await onDeleteSubmission(id);
    }
  };

  const currentExamForModal = activeSubmissionToGrade
    ? exams.find(e => e.id === activeSubmissionToGrade.examId) || exams[0]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 mb-6 shadow-md border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              Bàn Chấm Thi Trực Tuyến Đa Thiết Bị
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Phòng Giáo Viên &amp; Chấm Điểm Tự Luận
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              Giáo viên có thể mở đường dẫn này trên bất kỳ máy tính bảng, điện thoại hoặc máy tính nào để xem bài làm của học sinh, chấm bài tự luận theo Bareme chuẩn và nhận xét chi tiết.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onRefreshData}
              disabled={isLoading}
              className="px-3.5 py-2 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors flex items-center gap-1.5 border border-stone-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span>Đồng bộ máy chủ</span>
            </button>
            <button
              onClick={onResetSampleData}
              title="Khôi phục danh sách học sinh mẫu"
              className="px-3.5 py-2 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-amber-400 rounded-lg transition-colors flex items-center gap-1.5 border border-stone-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Dữ liệu mẫu</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-stone-800">
          <div className="bg-stone-800/60 rounded-xl p-3 border border-stone-700/50">
            <span className="text-xs text-stone-400">Tổng số bài nộp</span>
            <div className="text-xl font-bold text-white tabular-nums mt-0.5">
              {submissions.length}
            </div>
          </div>
          <div className="bg-amber-950/40 rounded-xl p-3 border border-amber-800/40">
            <span className="text-xs text-amber-400 font-semibold">Cần chấm tự luận</span>
            <div className="text-xl font-bold text-amber-300 tabular-nums mt-0.5">
              {pendingCount} bài
            </div>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-800/40">
            <span className="text-xs text-emerald-400 font-semibold">Đã hoàn tất chấm</span>
            <div className="text-xl font-bold text-emerald-300 tabular-nums mt-0.5">
              {gradedCount} bài
            </div>
          </div>
          <div className="bg-stone-800/60 rounded-xl p-3 border border-stone-700/50">
            <span className="text-xs text-stone-400">Điểm trung bình chung</span>
            <div className="text-xl font-bold text-white tabular-nums mt-0.5">
              {averageScore} / 10
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên học sinh, lớp hoặc mã SBD..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="all">Tất cả khối lớp</option>
            <option value="6">Khối 6</option>
            <option value="10">Khối 10</option>
          </select>

          <select
            value={selectedExamId}
            onChange={e => setSelectedExamId(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 bg-white max-w-[200px] truncate"
          >
            <option value="all">Tất cả đề thi</option>
            {exams.map(ex => (
              <option key={ex.id} value={ex.id}>
                {ex.code} - {ex.title}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ chấm tự luận</option>
            <option value="graded">Đã chấm xong</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-16 px-4">
            <GraduationCap className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-700">Chưa có bài nộp nào phù hợp</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              Không tìm thấy bài làm của học sinh theo bộ lọc hiện tại. Thử đổi bộ lọc hoặc bấm "Dữ liệu mẫu" để nạp bài thi mẫu.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Học sinh / SBD</th>
                  <th className="py-3.5 px-4">Lớp &amp; Trường</th>
                  <th className="py-3.5 px-4">Đề thi</th>
                  <th className="py-3.5 px-4 text-center">Trắc nghiệm</th>
                  <th className="py-3.5 px-4 text-center">Tự luận</th>
                  <th className="py-3.5 px-4 text-center">Tổng điểm</th>
                  <th className="py-3.5 px-4 text-center">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredSubmissions.map(sub => {
                  const isGraded = sub.grading.isGraded;
                  const autoScore = (sub.grading.autoChoiceScore + sub.grading.autoTrueFalseScore).toFixed(2);
                  const essayScore = sub.grading.essayScore.toFixed(2);
                  const total = sub.grading.totalScore.toFixed(2);
                  const dateStr = new Date(sub.submittedAt).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit'
                  });

                  return (
                    <tr key={sub.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{sub.student.fullName}</div>
                        <div className="text-xs text-stone-400 font-mono mt-0.5">
                          {sub.student.studentId || 'Chưa có SBD'} · {dateStr}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-stone-800">{sub.student.className}</span>
                        <div className="text-xs text-stone-400 truncate max-w-[150px]">
                          {sub.student.schoolName}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-mono text-xs font-semibold mr-1.5">
                          {sub.examCode}
                        </span>
                        <span className="text-xs text-stone-600 font-medium">Khối {sub.grade}</span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-stone-700">
                        {autoScore} đ
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-700">
                        {isGraded ? `+${essayScore} đ` : <span className="text-stone-400">Chưa chấm</span>}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-lg font-mono font-bold text-xs sm:text-sm ${
                          Number(total) >= 8.0 
                            ? 'bg-emerald-100 text-emerald-900' 
                            : Number(total) >= 6.5 
                            ? 'bg-blue-100 text-blue-900'
                            : Number(total) >= 5.0
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-red-900'
                        }`}>
                          {total} / 10
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        {isGraded ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã chấm
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            <Clock className="w-3 h-3" />
                            Chờ chấm
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenGrading(sub, 'full_review')}
                            title="Xem chi tiết toàn bộ bài làm của học sinh"
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center gap-1 border border-stone-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Xem bài</span>
                          </button>

                          <button
                            onClick={() => handleOpenGrading(sub, 'essay_grading')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                              isGraded
                                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200'
                                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs'
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isGraded ? 'Chấm lại' : 'Chấm bài'}</span>
                          </button>

                          <button
                            onClick={() => handleDelete(sub.id, sub.student.fullName)}
                            title="Xóa bài nộp"
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Teacher Grading Modal */}
      {activeSubmissionToGrade && currentExamForModal && (
        <GradingModal
          submission={activeSubmissionToGrade}
          exam={currentExamForModal}
          onClose={() => setActiveSubmissionToGrade(null)}
          onSaveGrading={handleSaveGrading}
          isSaving={isSavingGrade}
          initialTab={modalInitialTab}
        />
      )}
    </div>
  );
};
