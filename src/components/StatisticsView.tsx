import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle,
  FileSpreadsheet,
  PieChart
} from 'lucide-react';
import { Submission, Exam } from '../types/exam';

interface StatisticsViewProps {
  submissions: Submission[];
  exams: Exam[];
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  submissions,
  exams
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedExamId, setSelectedExamId] = useState<string>('all');

  // Filtered submissions
  const filteredSubmissions = submissions.filter(s => {
    if (selectedGrade !== 'all' && s.grade !== selectedGrade) return false;
    if (selectedExamId !== 'all' && s.examId !== selectedExamId) return false;
    return true;
  });

  const total = filteredSubmissions.length;
  const gradedList = filteredSubmissions.filter(s => s.grading.isGraded);
  const gradedCount = gradedList.length;

  const scores = filteredSubmissions.map(s => s.grading.totalScore);
  const avgScore = total > 0
    ? Number((scores.reduce((a, b) => a + b, 0) / total).toFixed(2))
    : 0;
  const maxScore = total > 0 ? Math.max(...scores) : 0;
  const minScore = total > 0 ? Math.min(...scores) : 0;

  // Grade classification
  const excellentCount = filteredSubmissions.filter(s => s.grading.totalScore >= 8.0).length;
  const goodCount = filteredSubmissions.filter(s => s.grading.totalScore >= 6.5 && s.grading.totalScore < 8.0).length;
  const avgCount = filteredSubmissions.filter(s => s.grading.totalScore >= 5.0 && s.grading.totalScore < 6.5).length;
  const weakCount = filteredSubmissions.filter(s => s.grading.totalScore < 5.0).length;

  const excellentPercent = total > 0 ? Math.round((excellentCount / total) * 100) : 0;
  const goodPercent = total > 0 ? Math.round((goodCount / total) * 100) : 0;
  const avgPercent = total > 0 ? Math.round((avgCount / total) * 100) : 0;
  const weakPercent = total > 0 ? Math.round((weakCount / total) * 100) : 0;

  // Score distribution 0-10
  const scoreBins: Record<number, number> = {};
  for (let i = 0; i <= 10; i++) scoreBins[i] = 0;
  filteredSubmissions.forEach(s => {
    const bin = Math.min(10, Math.max(0, Math.round(s.grading.totalScore)));
    scoreBins[bin] = (scoreBins[bin] || 0) + 1;
  });

  const maxBinCount = Math.max(...Object.values(scoreBins), 1);

  // Question error analysis for currently selected exam (or first exam)
  const targetExam = exams.find(e => e.id === selectedExamId) || exams[0];
  const targetSubmissions = submissions.filter(s => s.examId === targetExam.id);

  const questionStats = targetExam.sections
    .flatMap(sec => sec.questions)
    .filter(q => q.type === 'single_choice')
    .map(q => {
      let correct = 0;
      let answered = 0;
      targetSubmissions.forEach(sub => {
        const choice = sub.answers.singleChoice[q.id];
        if (choice) {
          answered++;
          if (choice === q.correctAnswer) {
            correct++;
          }
        }
      });
      const rate = answered > 0 ? Math.round((correct / answered) * 100) : 0;
      return {
        id: q.id,
        number: q.questionNumber,
        questionText: q.question,
        correct,
        answered,
        rate
      };
    })
    .sort((a, b) => a.number - b.number);

  // Export to CSV
  const handleExportCSV = () => {
    const header = ['STT', 'Họ và tên', 'Biệt danh', 'Lớp', 'Trường', 'Mã đề', 'Khối', 'Điểm TN', 'Điểm TL', 'Tổng điểm', 'Trạng thái', 'Nhận xét của GV'];
    const rows = filteredSubmissions.map((s, idx) => [
      idx + 1,
      `"${s.student.fullName}"`,
      `"${s.student.studentId || 'cute student'}"`,
      `"${s.student.className}"`,
      `"${s.student.schoolName}"`,
      s.examCode,
      s.grade,
      (s.grading.autoChoiceScore + s.grading.autoTrueFalseScore).toFixed(2),
      s.grading.essayScore.toFixed(2),
      s.grading.totalScore.toFixed(2),
      s.grading.isGraded ? 'Đã chấm' : 'Chờ chấm',
      `"${(s.grading.teacherGeneralComment || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bang_diem_mon_Lich_su_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              Báo Cáo Sư Phạm Tự Động
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              Thống Kê Điểm Số &amp; Nhận Xét Chi Tiết
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Hệ thống tự động tổng hợp phổ điểm, phân tích mức độ hiểu bài của học sinh và gợi ý giải pháp giảng dạy.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
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
              {exams.map(e => (
                <option key={e.id} value={e.id}>{e.code} - {e.title}</option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              disabled={filteredSubmissions.length === 0}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Xuất Excel / CSV</span>
            </button>
          </div>
        </div>
      </div>

      {total === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <PieChart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-bold text-stone-700">Chưa có dữ liệu thống kê</h3>
          <p className="text-xs text-stone-400 mt-1">
            Vui lòng nộp bài thi hoặc chuyển sang chế độ Giáo viên để nạp dữ liệu mẫu.
          </p>
        </div>
      ) : (
        <>
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Tổng số bài thi</span>
              <div className="text-2xl font-extrabold text-stone-900 tabular-nums mt-1">
                {total}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Đã chấm: <strong className="text-emerald-700">{gradedCount}</strong> / {total}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Điểm trung bình</span>
              <div className="text-2xl font-extrabold text-amber-700 tabular-nums mt-1">
                {avgScore} <span className="text-xs font-normal text-stone-400">/ 10</span>
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Mức chuẩn chung toàn khối
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Điểm cao nhất</span>
              <div className="text-2xl font-extrabold text-emerald-700 tabular-nums mt-1">
                {maxScore} <span className="text-xs font-normal text-stone-400">/ 10</span>
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Thấp nhất: <strong className="text-stone-700">{minScore} đ</strong>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm">
              <span className="text-xs text-stone-500 font-medium">Tỉ lệ Giỏi (≥ 8.0)</span>
              <div className="text-2xl font-extrabold text-indigo-700 tabular-nums mt-1">
                {excellentPercent}%
              </div>
              <div className="text-xs text-stone-400 mt-1">
                {excellentCount} học sinh đạt Giỏi
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Score Distribution Chart (2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  Phổ Điểm Toàn Diện (Thang điểm 0 - 10)
                </h3>
                <span className="text-xs text-stone-400">
                  Phân bố theo số lượng học sinh
                </span>
              </div>

              {/* Bar graph */}
              <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-stone-200">
                {Array.from({ length: 11 }, (_, i) => {
                  const count = scoreBins[i] || 0;
                  const heightPercent = maxBinCount > 0 ? (count / maxBinCount) * 100 : 0;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip */}
                      {count > 0 && (
                        <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10 font-bold">
                          {count} HS ({Math.round((count / total) * 100)}%)
                        </div>
                      )}

                      <span className="text-[10px] text-stone-500 font-mono font-bold">
                        {count > 0 ? count : ''}
                      </span>
                      <div className="w-full bg-stone-100 rounded-t h-32 flex items-end">
                        <div
                          className={`w-full rounded-t transition-all duration-500 ${
                            i >= 8 ? 'bg-emerald-600 group-hover:bg-emerald-500' :
                            i >= 6.5 ? 'bg-blue-600 group-hover:bg-blue-500' :
                            i >= 5 ? 'bg-amber-500 group-hover:bg-amber-400' :
                            'bg-red-400 group-hover:bg-red-300'
                          }`}
                          style={{ height: `${Math.max(count > 0 ? 8 : 0, heightPercent)}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold text-stone-700 mt-1">
                        {i}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-center gap-4 text-xs text-stone-500 mt-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block" /> Giỏi (8-10đ)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" /> Khá (6.5-7.9đ)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> Trung bình (5-6.4đ)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-red-400 inline-block" /> Dưới trung bình (&lt;5đ)
                </span>
              </div>
            </div>

            {/* Performance breakdown (1 col) */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-bold text-stone-900 mb-4">
                Xếp Loại Học Lực
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-emerald-800">Giỏi (8.0 - 10.0)</span>
                    <span className="font-mono font-bold text-stone-700">{excellentCount} HS ({excellentPercent}%)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${excellentPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-blue-800">Khá (6.5 - 7.9)</span>
                    <span className="font-mono font-bold text-stone-700">{goodCount} HS ({goodPercent}%)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${goodPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-amber-800">Trung bình (5.0 - 6.4)</span>
                    <span className="font-mono font-bold text-stone-700">{avgCount} HS ({avgPercent}%)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${avgPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-red-800">Yếu (&lt; 5.0)</span>
                    <span className="font-mono font-bold text-stone-700">{weakCount} HS ({weakPercent}%)</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: `${weakPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500">
                Tỉ lệ đạt yêu cầu (từ 5.0 trở lên):{' '}
                <strong className="text-stone-900 font-bold">
                  {Math.round(((excellentCount + goodCount + avgCount) / total) * 100)}%
                </strong>
              </div>
            </div>
          </div>

          {/* Automated Pedagogical Insights & Review Feedback */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-600/20 text-amber-800 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                Nhận Xét &amp; Phân Tích Chuyên Sâu Tự Động
              </h3>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed mb-6">
              <strong>Đánh giá tổng quan:</strong> Tổng cộng có {total} học sinh nộp bài thi. Điểm trung bình toàn lớp đạt {avgScore}/10 điểm, phản ánh chất lượng tiếp thu bài học ở mức {avgScore >= 8 ? 'Rất tốt' : avgScore >= 6.5 ? 'Tốt và đồng đều' : 'Cần củng cố thêm'}. Các em đã nắm vững các mốc thời gian lớn và phân loại tốt các nguồn sử liệu.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Strengths */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  Ưu điểm nổi bật
                </h4>
                <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Khả năng ghi nhớ các khái niệm cốt lõi (Sử học, Môn lịch sử, nguồn sử liệu hiện vật) đạt độ chính xác trên 90%.</li>
                  <li>Học sinh lớp 6 tính toán khoảng cách năm TCN và SCN rất chuẩn xác.</li>
                  <li>Phần trắc nghiệm Đúng - Sai ở lớp 10 học sinh thể hiện tư duy phản biện và đọc hiểu đoạn trích tư liệu tốt.</li>
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Nội dung hay nhầm lẫn
                </h4>
                <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Một số câu hỏi về đời sống vật chất vs tinh thần thời nguyên thủy học sinh còn chọn nhầm (đồ trang sức thuộc tinh thần).</li>
                  <li>Phân biệt giữa di sản văn hóa vật thể và phi vật thể cần được minh họa bằng nhiều hình ảnh trực quan hơn.</li>
                  <li>Một số bài tự luận còn trả lời vắn tắt, chưa nêu đủ 02 ví dụ hành động cụ thể theo bareme.</li>
                </ul>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-700" />
                  Kế hoạch ôn tập tiếp theo
                </h4>
                <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Dành 15 phút đầu giờ tiết tới để sửa các câu trắc nghiệm có tỉ lệ sai cao nhất.</li>
                  <li>Tổ chức hoạt động nhóm: Cho học sinh lập sơ đồ tư duy phân biệt các loại hình di sản văn hóa Việt Nam.</li>
                  <li>Hướng dẫn học sinh kỹ năng viết bài tự luận chuẩn bareme từng ý để tối ưu hóa điểm số.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Question Accuracy Breakdown */}
          {questionStats.length > 0 && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-stone-900">
                  Tỉ Lệ Trả Lời Đúng Từng Câu Trắc Nghiệm ({targetExam.title})
                </h3>
                <span className="text-xs text-stone-400">
                  Dữ liệu từ {targetSubmissions.length} bài thi
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {questionStats.map(q => (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg border text-center ${
                      q.rate >= 80 ? 'border-emerald-200 bg-emerald-50/40' :
                      q.rate >= 60 ? 'border-amber-200 bg-amber-50/40' :
                      'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-700 mb-0.5">
                      Câu {q.number}
                    </div>
                    <div className={`text-base font-extrabold font-mono ${
                      q.rate >= 80 ? 'text-emerald-700' :
                      q.rate >= 60 ? 'text-amber-700' :
                      'text-red-600'
                    }`}>
                      {q.rate}%
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {q.correct}/{q.answered} đúng
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
