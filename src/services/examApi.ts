import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Submission, Exam, ClassStatistics, GradingResult } from '../types/exam';
import { HISTORY_EXAMS } from '../data/historyExams';
import { INITIAL_SAMPLE_SUBMISSIONS } from '../data/sampleSubmissions';

const LOCAL_STORAGE_KEY = 'history_exam_submissions_v1';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

// Local cache helpers
function getLocalCache(): Submission[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Cannot read localStorage', e);
  }
  return INITIAL_SAMPLE_SUBMISSIONS;
}

function setLocalCache(data: Submission[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Cannot write localStorage', e);
  }
}

export const examApi = {
  // 1. Get Exams
  async getExams(): Promise<Exam[]> {
    return HISTORY_EXAMS;
  },

  // 2. Get Submissions (Queries Firestore Cloud Database)
  async getSubmissions(params?: { examId?: string; grade?: string; status?: string }): Promise<Submission[]> {
    const path = 'submissions';
    try {
      const q = query(collection(db, path), orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);
      const cloudList: Submission[] = [];
      snapshot.forEach(docSnap => {
        cloudList.push(docSnap.data() as Submission);
      });

      setLocalCache(cloudList);

      let list = cloudList;
      if (params?.examId && params.examId !== 'all') list = list.filter(s => s.examId === params.examId);
      if (params?.grade && params.grade !== 'all') list = list.filter(s => s.grade === params.grade);
      if (params?.status === 'graded') list = list.filter(s => s.grading.isGraded);
      if (params?.status === 'pending') list = list.filter(s => !s.grading.isGraded);
      return list;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, path);
    }

    // Fallback to Express backend or local cache
    try {
      const queryParams = new URLSearchParams();
      if (params?.examId) queryParams.append('examId', params.examId);
      if (params?.grade) queryParams.append('grade', params.grade);
      if (params?.status) queryParams.append('status', params.status);

      const res = await fetch(`/api/submissions?${queryParams.toString()}`);
      if (res.ok) {
        const data: Submission[] = await res.json();
        setLocalCache(data);
        return data;
      }
    } catch {
      // ignore
    }

    let list = getLocalCache();
    if (params?.examId && params.examId !== 'all') list = list.filter(s => s.examId === params.examId);
    if (params?.grade && params.grade !== 'all') list = list.filter(s => s.grade === params.grade);
    if (params?.status === 'graded') list = list.filter(s => s.grading.isGraded);
    if (params?.status === 'pending') list = list.filter(s => !s.grading.isGraded);
    return list;
  },

  // 3. Get single submission
  async getSubmissionById(id: string): Promise<Submission | null> {
    const path = `submissions/${id}`;
    try {
      const docSnap = await getDoc(doc(db, 'submissions', id));
      if (docSnap.exists()) {
        return docSnap.data() as Submission;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }

    const list = getLocalCache();
    return list.find(s => s.id === id) || null;
  },

  // 4. Submit test (Saves to Firestore)
  async submitExam(submission: Submission): Promise<Submission> {
    const path = `submissions/${submission.id}`;
    try {
      await setDoc(doc(db, 'submissions', submission.id), submission);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }

    // Also sync to Express backend for redundancy
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
    } catch {
      // ignore
    }

    const current = getLocalCache();
    const updated = [submission, ...current.filter(s => s.id !== submission.id)];
    setLocalCache(updated);
    return submission;
  },

  // 5. Grade submission (Updates in Firestore)
  async gradeSubmission(id: string, grading: Partial<GradingResult>): Promise<Submission> {
    const path = `submissions/${id}`;
    const updatedGrading = {
      ...grading,
      isGraded: true,
      gradedAt: new Date().toISOString()
    };

    try {
      await updateDoc(doc(db, 'submissions', id), {
        grading: updatedGrading
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }

    // Also sync to Express backend
    try {
      await fetch(`/api/submissions/${id}/grade`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grading })
      });
    } catch {
      // ignore
    }

    const list = getLocalCache();
    const index = list.findIndex(s => s.id === id);
    if (index !== -1) {
      list[index].grading = {
        ...list[index].grading,
        ...updatedGrading
      } as GradingResult;
      setLocalCache([...list]);
      return list[index];
    }

    return {
      id,
      grading: updatedGrading
    } as any;
  },

  // 6. Delete submission
  async deleteSubmission(id: string): Promise<boolean> {
    const path = `submissions/${id}`;
    try {
      await deleteDoc(doc(db, 'submissions', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }

    try {
      await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }

    const list = getLocalCache().filter(s => s.id !== id);
    setLocalCache(list);
    return true;
  },

  // 7. Reset sample data (cleared to empty)
  async resetToSampleData(): Promise<Submission[]> {
    setLocalCache([]);
    try {
      await fetch('/api/submissions/seed', { method: 'POST' });
    } catch {}
    return [];
  },

  // 8. Get Statistics
  async getStatistics(params?: { examId?: string; grade?: string }): Promise<ClassStatistics> {
    const submissions = await this.getSubmissions(params);
    let filtered = submissions;
    if (params?.examId && params.examId !== 'all') filtered = filtered.filter(s => s.examId === params.examId);
    else if (params?.grade && params.grade !== 'all') filtered = filtered.filter(s => s.grade === params.grade);

    const total = filtered.length;
    const graded = filtered.filter(s => s.grading.isGraded);
    const scores = filtered.map(s => s.grading.totalScore);
    const avg = total > 0 ? Number((scores.reduce((a, b) => a + b, 0) / total).toFixed(2)) : 0;
    const highest = total > 0 ? Math.max(...scores) : 0;
    const lowest = total > 0 ? Math.min(...scores) : 0;

    const gradeDist = { excellent: 0, good: 0, average: 0, weak: 0 };
    const scoreDist: Record<number, number> = {};
    for (let i = 0; i <= 10; i++) scoreDist[i] = 0;

    filtered.forEach(s => {
      const sc = s.grading.totalScore;
      const r = Math.min(10, Math.max(0, Math.round(sc)));
      scoreDist[r] = (scoreDist[r] || 0) + 1;
      if (sc >= 8.0) gradeDist.excellent++;
      else if (sc >= 6.5) gradeDist.good++;
      else if (sc >= 5.0) gradeDist.average++;
      else gradeDist.weak++;
    });

    return {
      totalSubmissions: total,
      gradedSubmissions: graded.length,
      pendingSubmissions: total - graded.length,
      averageScore: avg,
      highestScore: highest,
      lowestScore: lowest,
      gradeDistribution: gradeDist,
      scoreDistribution: scoreDist,
      questionStats: [],
      aiInsights: {
        overview: total > 0
          ? `Có ${total} bài làm đã được ghi nhận trên Firebase Firestore. Điểm trung bình: ${avg}/10. Đã chấm ${graded.length}/${total}.`
          : 'Hệ thống đã sẵn sàng kết nối Firebase Firestore. Chưa có bài thi nào được nộp.',
        strengths: ['Học sinh nắm vững các khái niệm cơ bản về các thời kỳ lịch sử.'],
        weaknesses: ['Cần chú ý lập luận mạch lạc và liên hệ thực tế trong câu tự luận.'],
        recommendations: ['Tăng cường luyện tập đề thi thử và phân tích kỹ barem chấm.']
      }
    };
  }
};
