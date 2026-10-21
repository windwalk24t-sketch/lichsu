export type GradeLevel = '6' | '10';

export type QuestionType = 'single_choice' | 'true_false_group' | 'essay';

export interface SingleChoiceQuestion {
  id: string;
  type: 'single_choice';
  questionNumber: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  points: number;
  explanation?: string;
}

export interface TrueFalseItem {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
  correctAnswer: boolean;
  explanation?: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true_false_group';
  questionNumber: number;
  context: string;
  items: TrueFalseItem[];
  pointsPerItem: number; // e.g. 0.25
  totalPoints: number; // e.g. 1.0
  explanation?: string;
}

export interface RubricItem {
  id: string;
  criteria: string;
  maxPoints: number;
  sampleAnswer?: string;
}

export interface EssayQuestion {
  id: string;
  type: 'essay';
  questionNumber: number;
  question: string;
  maxPoints: number;
  rubric: RubricItem[];
  officialGuide?: string;
}

export type AnyQuestion = SingleChoiceQuestion | TrueFalseQuestion | EssayQuestion;

export interface ExamSection {
  id: string;
  title: string;
  description: string;
  points: number;
  questions: AnyQuestion[];
}

export interface Exam {
  id: string;
  code: string;
  title: string;
  grade: GradeLevel;
  subject: string;
  durationMinutes: number;
  totalPoints: number;
  description: string;
  sections: ExamSection[];
}

export interface StudentInfo {
  fullName: string;
  className: string;
  schoolName: string;
  studentId?: string;
}

export interface StudentAnswers {
  singleChoice: Record<string, 'A' | 'B' | 'C' | 'D'>;
  trueFalse: Record<string, Record<'a' | 'b' | 'c' | 'd', boolean>>;
  essay: Record<string, string>;
}

export interface EssayGradeDetail {
  questionId: string;
  score: number;
  maxScore: number;
  feedback: string;
  rubricScores?: Record<string, number>;
}

export interface GradingResult {
  isGraded: boolean;
  autoChoiceScore: number;
  autoTrueFalseScore: number;
  essayScore: number;
  totalScore: number;
  maxScore: number;
  teacherGeneralComment: string;
  essayGradingDetails: Record<string, EssayGradeDetail>;
  gradedBy?: string;
  gradedAt?: string;
}

export interface Submission {
  id: string;
  examId: string;
  examTitle: string;
  examCode: string;
  grade: GradeLevel;
  student: StudentInfo;
  answers: StudentAnswers;
  grading: GradingResult;
  submittedAt: string;
  timeSpentSeconds: number;
}

export interface ClassStatistics {
  totalSubmissions: number;
  gradedSubmissions: number;
  pendingSubmissions: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: {
    excellent: number; // >= 8.0
    good: number;      // 6.5 - 7.9
    average: number;   // 5.0 - 6.4
    weak: number;      // < 5.0
  };
  scoreDistribution: Record<number, number>; // 0 to 10
  questionStats: {
    questionId: string;
    questionNumber: number;
    questionLabel: string;
    correctCount: number;
    totalAnswers: number;
    correctRate: number; // percentage
  }[];
  aiInsights: {
    overview: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
}
