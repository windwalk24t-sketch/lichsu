import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Submission, ClassStatistics } from './src/types/exam';
import { INITIAL_SAMPLE_SUBMISSIONS } from './src/data/sampleSubmissions';
import { HISTORY_EXAMS } from './src/data/historyExams';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data folder and file exist
function getSubmissions(): Submission[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(INITIAL_SAMPLE_SUBMISSIONS, null, 2), 'utf-8');
      return INITIAL_SAMPLE_SUBMISSIONS;
    }
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_SUBMISSIONS;
  } catch (err) {
    console.error('Error reading submissions from file:', err);
    return INITIAL_SAMPLE_SUBMISSIONS;
  }
}

function saveSubmissions(submissions: Submission[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing submissions to file:', err);
  }
}

function calculateClassStatistics(submissions: Submission[], examId?: string, grade?: string): ClassStatistics {
  let filtered = submissions;
  if (examId) {
    filtered = filtered.filter(s => s.examId === examId);
  } else if (grade) {
    filtered = filtered.filter(s => s.grade === grade);
  }

  const total = filtered.length;
  const gradedList = filtered.filter(s => s.grading.isGraded);
  const gradedCount = gradedList.length;
  const pendingCount = total - gradedCount;

  if (total === 0) {
    return {
      totalSubmissions: 0,
      gradedSubmissions: 0,
      pendingSubmissions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      gradeDistribution: { excellent: 0, good: 0, average: 0, weak: 0 },
      scoreDistribution: {},
      questionStats: [],
      aiInsights: {
        overview: 'Chưa có bài nộp nào cho bộ đề này.',
        strengths: [],
        weaknesses: [],
        recommendations: []
      }
    };
  }

  const scores = filtered.map(s => Number(s.grading.totalScore.toFixed(2)));
  const sum = scores.reduce((acc, score) => acc + score, 0);
  const avg = Number((sum / total).toFixed(2));
  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);

  const gradeDist = { excellent: 0, good: 0, average: 0, weak: 0 };
  const scoreDist: Record<number, number> = {};

  for (let i = 0; i <= 10; i++) {
    scoreDist[i] = 0;
  }

  filtered.forEach(s => {
    const sc = s.grading.totalScore;
    const rounded = Math.min(10, Math.max(0, Math.round(sc)));
    scoreDist[rounded] = (scoreDist[rounded] || 0) + 1;

    if (sc >= 8.0) gradeDist.excellent++;
    else if (sc >= 6.5) gradeDist.good++;
    else if (sc >= 5.0) gradeDist.average++;
    else gradeDist.weak++;
  });

  // Calculate question accuracy stats
  const questionMap: Record<string, { correct: number; total: number; label: string; number: number }> = {};
  
  // Find exam
  const currentExam = HISTORY_EXAMS.find(e => e.id === examId) || HISTORY_EXAMS[0];
  currentExam.sections.forEach(sec => {
    sec.questions.forEach(q => {
      if (q.type === 'single_choice') {
        questionMap[q.id] = {
          correct: 0,
          total: 0,
          label: `Câu ${q.questionNumber}`,
          number: q.questionNumber
        };
      }
    });
  });

  filtered.forEach(s => {
    if (s.examId === currentExam.id) {
      Object.entries(s.answers.singleChoice).forEach(([qId, ans]) => {
        if (questionMap[qId]) {
          questionMap[qId].total++;
          const targetQ = currentExam.sections.flatMap(sec => sec.questions).find(q => q.id === qId);
          if (targetQ && targetQ.type === 'single_choice' && targetQ.correctAnswer === ans) {
            questionMap[qId].correct++;
          }
        }
      });
    }
  });

  const questionStats = Object.entries(questionMap).map(([id, data]) => ({
    questionId: id,
    questionNumber: data.number,
    questionLabel: data.label,
    correctCount: data.correct,
    totalAnswers: data.total,
    correctRate: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
  })).sort((a, b) => a.questionNumber - b.questionNumber);

  // Generate automated pedagogic insights
  const excellentRate = Math.round((gradeDist.excellent / total) * 100);
  const weakQuestions = questionStats.filter(q => q.totalAnswers > 0 && q.correctRate < 70);

  const insights = {
    overview: `Tổng cộng ${total} học sinh đã tham gia nộp bài. Điểm trung bình toàn lớp đạt ${avg}/10 điểm. Tỉ lệ học sinh đạt Giỏi (từ 8,0 trở lên) chiếm ${excellentRate}%. Đã chấm tự luận ${gradedCount}/${total} bài.`,
    strengths: [
      'Đại đa số học sinh nắm chắc các khái niệm căn bản và phân biệt tốt giữa tư liệu hiện vật, chữ viết và truyền miệng.',
      'Kĩ năng tính toán năm trước và sau công nguyên ở học sinh lớp 6 có độ chính xác cao.',
      'Phần trắc nghiệm Đúng - Sai ở lớp 10 học sinh thể hiện khả năng đọc hiểu văn bản lịch sử rất tốt.'
    ],
    weaknesses: weakQuestions.length > 0 
      ? weakQuestions.slice(0, 3).map(q => `Câu ${q.questionNumber}: tỉ lệ trả lời đúng còn thấp (${q.correctRate}%). Cần chú ý củng cố kiến thức này.`)
      : ['Một số học sinh phần tự luận chưa nêu đủ 2 dẫn chứng di sản văn hóa cụ thể hoặc chưa phân tích sâu ý nghĩa bảo vệ di sản.'],
    recommendations: [
      'Giáo viên nên dành 10-15 phút đầu giờ để chữa kĩ các câu hỏi trắc nghiệm có tỉ lệ sai nhiều.',
      'Khuyến khích học sinh trao đổi theo nhóm để giải thích các bối cảnh lịch sử và liên hệ thực tiễn tốt hơn.',
      'Tập trung rèn kĩ năng trình bày tự luận theo bareme từng bước để không bị mất điểm phụ.'
    ]
  };

  return {
    totalSubmissions: total,
    gradedSubmissions: gradedCount,
    pendingSubmissions: pendingCount,
    averageScore: avg,
    highestScore: highest,
    lowestScore: lowest,
    gradeDistribution: gradeDist,
    scoreDistribution: scoreDist,
    questionStats,
    aiInsights: insights
  };
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // CORS headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // REST API Endpoints
  // 1. Get all exams list
  app.get('/api/exams', (req, res) => {
    res.json(HISTORY_EXAMS);
  });

  // 2. Get all submissions with optional filtering
  app.get('/api/submissions', (req, res) => {
    const { examId, grade, status } = req.query;
    let list = getSubmissions();

    if (examId) {
      list = list.filter(s => s.examId === examId);
    }
    if (grade) {
      list = list.filter(s => s.grade === grade);
    }
    if (status === 'graded') {
      list = list.filter(s => s.grading.isGraded);
    } else if (status === 'pending') {
      list = list.filter(s => !s.grading.isGraded);
    }

    res.json(list);
  });

  // 3. Get single submission
  app.get('/api/submissions/:id', (req, res) => {
    const list = getSubmissions();
    const found = list.find(s => s.id === req.params.id);
    if (!found) {
      return res.status(404).json({ error: 'Không tìm thấy bài làm' });
    }
    res.json(found);
  });

  // 4. Student submits test
  app.post('/api/submissions', (req, res) => {
    try {
      const newSubmission: Submission = req.body;
      if (!newSubmission.id || !newSubmission.student?.fullName) {
        return res.status(400).json({ error: 'Dữ liệu bài nộp không hợp lệ' });
      }

      const list = getSubmissions();
      // Remove previous submission with same ID if exists
      const updated = [newSubmission, ...list.filter(s => s.id !== newSubmission.id)];
      saveSubmissions(updated);

      res.status(201).json({ success: true, submission: newSubmission });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Lỗi khi lưu bài nộp' });
    }
  });

  // 5. Teacher grades submission (supports multi-device teacher grading)
  app.put('/api/submissions/:id/grade', (req, res) => {
    try {
      const { id } = req.params;
      const { grading } = req.body;

      if (!grading) {
        return res.status(400).json({ error: 'Thiếu thông tin kết quả chấm thi' });
      }

      const list = getSubmissions();
      const index = list.findIndex(s => s.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Không tìm thấy bài nộp' });
      }

      list[index].grading = {
        ...list[index].grading,
        ...grading,
        isGraded: true,
        gradedAt: new Date().toISOString()
      };

      saveSubmissions(list);
      res.json({ success: true, submission: list[index] });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Lỗi khi cập nhật kết quả chấm' });
    }
  });

  // 6. Delete submission
  app.delete('/api/submissions/:id', (req, res) => {
    const { id } = req.params;
    const list = getSubmissions();
    const filtered = list.filter(s => s.id !== id);
    saveSubmissions(filtered);
    res.json({ success: true });
  });

  // 7. Reset / Seed sample data
  app.post('/api/submissions/seed', (req, res) => {
    saveSubmissions(INITIAL_SAMPLE_SUBMISSIONS);
    res.json({ success: true, count: INITIAL_SAMPLE_SUBMISSIONS.length });
  });

  // 8. Statistics endpoint
  app.get('/api/statistics', (req, res) => {
    const { examId, grade } = req.query;
    const list = getSubmissions();
    const stats = calculateClassStatistics(list, examId as string, grade as string);
    res.json(stats);
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
