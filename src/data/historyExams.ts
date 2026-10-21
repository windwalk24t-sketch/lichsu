import { Exam } from '../types/exam';

export const HISTORY_EXAMS: Exam[] = [
  {
    id: 'history-6-de-1',
    code: 'LS6-01',
    title: 'Kiểm tra Đánh giá Định kỳ Môn Lịch sử Lớp 6',
    grade: '6',
    subject: 'Lịch sử & Địa lí 6 (Phần Lịch sử)',
    durationMinutes: 45,
    totalPoints: 10,
    description: 'Đề kiểm tra ôn tập kiến thức Lịch sử 6: Nguồn gốc loài người, các giai đoạn tiến hóa, cách tính thời gian trong lịch sử và các nguồn sử liệu.',
    sections: [
      {
        id: 'sec-choice',
        title: 'Phần I. TRẮC NGHIỆM KHÁCH QUAN',
        description: 'Gồm 20 câu hỏi trắc nghiệm (7,0 điểm). Mỗi câu trả lời đúng được 0,35 điểm.',
        points: 7.0,
        questions: [
          {
            id: 'q6_1',
            type: 'single_choice',
            questionNumber: 1,
            question: 'Lịch sử được hiểu là',
            options: [
              { key: 'A', text: 'tất cả những gì đã xảy ra trong quá khứ.' },
              { key: 'B', text: 'những câu ca dao có nội dung phản ánh về lịch sử.' },
              { key: 'C', text: 'những bức vẽ của người nguyên thủy trên vách đá.' },
              { key: 'D', text: 'sự tưởng tượng của con người về quá khứ của mình.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Lịch sử là tất cả những gì đã diễn ra trong quá khứ của xã hội loài người và tự nhiên.'
          },
          {
            id: 'q6_2',
            type: 'single_choice',
            questionNumber: 2,
            question: 'Ai là tác giả của 2 câu thơ sau:\n“Dân ta phải biết sử ta\nCho tường gốc tích nước nhà Việt Nam”',
            options: [
              { key: 'A', text: 'Trường Chinh.' },
              { key: 'B', text: 'Võ Nguyên Giáp.' },
              { key: 'C', text: 'Hồ Chí Minh.' },
              { key: 'D', text: 'Phạm Văn Đồng.' }
            ],
            correctAnswer: 'C',
            points: 0.35,
            explanation: 'Hai câu thơ nổi tiếng mở đầu tác phẩm “Lịch sử nước ta” (1942) của Chủ tịch Hồ Chí Minh.'
          },
          {
            id: 'q6_3',
            type: 'single_choice',
            questionNumber: 3,
            question: 'Trống đồng Ngọc Lũ thuộc loại tư liệu gì?',
            options: [
              { key: 'A', text: 'Tư liệu truyền miệng.' },
              { key: 'B', text: 'Tư liệu hiện vật.' },
              { key: 'C', text: 'Tư liệu chữ viết.' },
              { key: 'D', text: 'Tư liệu gốc.' }
            ],
            correctAnswer: 'B',
            points: 0.35,
            explanation: 'Trống đồng Ngọc Lũ là hiện vật vật chất cổ xưa do con người chế tác và để lại, thuộc tư liệu hiện vật.'
          },
          {
            id: 'q6_4',
            type: 'single_choice',
            questionNumber: 4,
            question: 'Việc sử dụng công cụ lao động bằng kim loại đã đưa đến chuyển biến nào trong đời sống xã hội của con người ở cuối thời nguyên thủy?',
            options: [
              { key: 'A', text: 'Xuất hiện các gia đình phụ hệ.' },
              { key: 'B', text: 'Công xã thị tộc được mở rộng.' },
              { key: 'C', text: 'Xuất hiện các bầy người nguyên thủy.' },
              { key: 'D', text: 'Hình thành quan hệ công bằng, bình đẳng.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Công cụ kim loại tạo ra năng suất cao, đàn ông nắm vai trò trụ cột trong sản xuất, dẫn tới gia đình phụ hệ ra đời.'
          },
          {
            id: 'q6_5',
            type: 'single_choice',
            questionNumber: 5,
            question: 'Nội dung nào sau đây không đúng khi mô tả về đời sống vật chất của người nguyên thủy ở Việt Nam?',
            options: [
              { key: 'A', text: 'Sống trong các hang động, mái đá hoặc các túp lều bằng cỏ khô.' },
              { key: 'B', text: 'Dùng tre, gỗ, xương… để làm mũi tên, mũi lao.' },
              { key: 'C', text: 'Làm đồ trang sức từ đất nung, đá, vỏ ốc biển.' },
              { key: 'D', text: 'Mài đá để tạo ra nhiều loại công cụ khác nhau như: rìu, bôn…' }
            ],
            correctAnswer: 'C',
            points: 0.35,
            explanation: 'Làm đồ trang sức thuộc về đời sống tinh thần (thẩm mỹ, tín ngưỡng), không phải đời sống vật chất thiết yếu.'
          },
          {
            id: 'q6_6',
            type: 'single_choice',
            questionNumber: 6,
            question: 'Âm lịch là hệ lịch được tính theo chu kì chuyển động của',
            options: [
              { key: 'A', text: 'Trái Đất quay quanh Mặt Trời.' },
              { key: 'B', text: 'Mặt Trăng quay quanh Trái Đất.' },
              { key: 'C', text: 'Mặt Trăng quay quanh Mặt Trời.' },
              { key: 'D', text: 'Mặt Trời quay quanh Trái Đất.' }
            ],
            correctAnswer: 'B',
            points: 0.35,
            explanation: 'Âm lịch dựa trên tuần trăng, tức chu kỳ Mặt Trăng chuyển động quay quanh Trái Đất.'
          },
          {
            id: 'q6_7',
            type: 'single_choice',
            questionNumber: 7,
            question: 'Một thế kỉ tương đương với',
            options: [
              { key: 'A', text: '100 năm.' },
              { key: 'B', text: '1000 năm.' },
              { key: 'C', text: '10 thiên niên kỉ.' },
              { key: 'D', text: '10 năm.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: '1 thập kỉ = 10 năm; 1 thế kỉ = 100 năm; 1 thiên niên kỉ = 1000 năm.'
          },
          {
            id: 'q6_8',
            type: 'single_choice',
            questionNumber: 8,
            question: 'Quá trình tiến hóa từ vượn thành người diễn ra theo tiến trình nào sau đây?',
            options: [
              { key: 'A', text: 'Vượn người → người hiện đại → người tối cổ.' },
              { key: 'B', text: 'Người tối cổ → người tinh khôn → vượn nhân hình.' },
              { key: 'C', text: 'Vượn người → người tối cổ → người tinh khôn.' },
              { key: 'D', text: 'Người hiện đại → người tối cổ → vượn người.' }
            ],
            correctAnswer: 'C',
            points: 0.35,
            explanation: 'Tiến trình tiến hóa loài người: Vượn người → Người tối cổ → Người tinh khôn (Người hiện đại).'
          },
          {
            id: 'q6_9',
            type: 'single_choice',
            questionNumber: 9,
            question: 'Vượn người xuất hiện cách ngày nay khoảng',
            options: [
              { key: 'A', text: '5 – 6 triệu năm.' },
              { key: 'B', text: '4 triệu năm.' },
              { key: 'C', text: '15 vạn năm.' },
              { key: 'D', text: '1 vạn năm.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Các nhà khảo cổ xác định Vượn người xuất hiện khoảng 5 - 6 triệu năm trước ở Đông Phi.'
          },
          {
            id: 'q6_10',
            type: 'single_choice',
            questionNumber: 10,
            question: 'Nguồn tư liệu đáng tin cậy nhất khi tìm hiểu lịch sử là gì?',
            options: [
              { key: 'A', text: 'Tư liệu gốc.' },
              { key: 'B', text: 'Tư liệu hiện vật.' },
              { key: 'C', text: 'Tư liệu chữ viết.' },
              { key: 'D', text: 'Tư liệu truyền miệng.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Tư liệu gốc là tư liệu ra đời trực tiếp tại thời điểm diễn ra sự kiện lịch sử, có tính xác thực cao nhất.'
          },
          {
            id: 'q6_11',
            type: 'single_choice',
            questionNumber: 11,
            question: 'Trong nhà trường phổ thông, Lịch sử là môn học',
            options: [
              { key: 'A', text: 'Tìm hiểu các quy luật vận động của tự nhiên và vũ trụ.' },
              { key: 'B', text: 'Nghiên cứu cấu tạo cơ thể và hoạt động của các sinh vật.' },
              { key: 'C', text: 'Tìm hiểu các phương pháp sản xuất và kinh doanh hàng hóa.' },
              { key: 'D', text: 'Tìm hiểu quá trình hình thành và phát triển của xã hội loài người.' }
            ],
            correctAnswer: 'D',
            points: 0.35,
            explanation: 'Môn Lịch sử tìm hiểu quá trình hình thành và phát triển của xã hội loài người từ khi xuất hiện đến nay.'
          },
          {
            id: 'q6_12',
            type: 'single_choice',
            questionNumber: 12,
            question: '“Lịch sử là thầy dạy của cuộc sống” là câu danh ngôn của ai?',
            options: [
              { key: 'A', text: 'Xi-xê-rông.' },
              { key: 'B', text: 'Hê-ra-chít.' },
              { key: 'C', text: 'Xanh-xi-mông.' },
              { key: 'D', text: 'Đê-mô-crit.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Nhà triết học, chính khách La Mã cổ đại Xi-xê-rông (Cicero) đã đúc kết danh ngôn bất hủ này.'
          },
          {
            id: 'q6_13',
            type: 'single_choice',
            questionNumber: 13,
            question: 'Truyền thuyết “Mị Châu – Trọng Thủy” thuộc loại hình tư liệu nào dưới đây?',
            options: [
              { key: 'A', text: 'Tư liệu truyền miệng.' },
              { key: 'B', text: 'Tư liệu hiện vật.' },
              { key: 'C', text: 'Tư liệu chữ viết.' },
              { key: 'D', text: 'Tư liệu gốc.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Truyền thuyết, cổ tích được lưu truyền qua lời kể truyền miệng từ đời này sang đời khác.'
          },
          {
            id: 'q6_14',
            type: 'single_choice',
            questionNumber: 14,
            question: 'Việc sử dụng công cụ lao động bằng kim loại đã đưa đến chuyển biến nào trong đời sống xã hội của con người ở cuối thời nguyên thủy?',
            options: [
              { key: 'A', text: 'Xuất hiện các gia đình mẫu hệ.' },
              { key: 'B', text: 'Xã hội có sự phân hóa giàu – nghèo.' },
              { key: 'C', text: 'Xuất hiện các bầy người nguyên thủy.' },
              { key: 'D', text: 'Hình thành quan hệ công bằng, bình đẳng.' }
            ],
            correctAnswer: 'B',
            points: 0.35,
            explanation: 'Của cải dư thừa xuất hiện dẫn tới tư hữu tài sản và phân hóa giàu nghèo, làm tan rã xã hội nguyên thủy.'
          },
          {
            id: 'q6_15',
            type: 'single_choice',
            questionNumber: 15,
            question: 'Nội dung nào sau đây đúng khi mô tả về đời sống tinh thần của người nguyên thủy ở Việt Nam?',
            options: [
              { key: 'A', text: 'Làm đồ trang sức từ đất nung, đá, vỏ ốc biển.' },
              { key: 'B', text: 'Dùng tre, gỗ, xương… để làm mũi tên, mũi lao.' },
              { key: 'C', text: 'Mài đá để tạo ra nhiều loại công cụ khác nhau, như: rìu, bôn…' },
              { key: 'D', text: 'Sống trong các hang động, mái đá hoặc các túp lều bằng cỏ khô.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Làm đẹp bản thân bằng vòng đeo tay, chuỗi hạt từ đất nung, vỏ sò vỏ ốc là biểu hiện đời sống tinh thần phong phú.'
          },
          {
            id: 'q6_16',
            type: 'single_choice',
            questionNumber: 16,
            question: 'Dương lịch là hệ lịch được tính theo chu kì chuyển động của',
            options: [
              { key: 'A', text: 'Trái Đất quay quanh Mặt Trời.' },
              { key: 'B', text: 'Mặt Trăng quay quanh Trái Đất.' },
              { key: 'C', text: 'Mặt Trăng quay quanh Mặt Trời.' },
              { key: 'D', text: 'Mặt Trời quay quanh Trái Đất.' }
            ],
            correctAnswer: 'A',
            points: 0.35,
            explanation: 'Dương lịch dựa vào chu kì chuyển động của Trái Đất xung quanh Mặt Trời (khoảng 365 ngày 6 giờ).'
          },
          {
            id: 'q6_17',
            type: 'single_choice',
            questionNumber: 17,
            question: 'Một thập kỉ tương đương với',
            options: [
              { key: 'A', text: '100 năm.' },
              { key: 'B', text: '1000 năm.' },
              { key: 'C', text: '10 thiên niên kỉ.' },
              { key: 'D', text: '10 năm.' }
            ],
            correctAnswer: 'D',
            points: 0.35,
            explanation: 'Một thập kỉ có độ dài đúng 10 năm.'
          },
          {
            id: 'q6_18',
            type: 'single_choice',
            questionNumber: 18,
            question: 'Quá trình tiến hóa từ vượn thành người trải qua mấy giai đoạn chính?',
            options: [
              { key: 'A', text: '1 giai đoạn.' },
              { key: 'B', text: '2 giai đoạn.' },
              { key: 'C', text: '3 giai đoạn.' },
              { key: 'D', text: '4 giai đoạn.' }
            ],
            correctAnswer: 'C',
            points: 0.35,
            explanation: 'Trải qua 3 giai đoạn chính: Vượn người → Người tối cổ → Người tinh khôn.'
          },
          {
            id: 'q6_19',
            type: 'single_choice',
            questionNumber: 19,
            question: 'Người tối cổ xuất hiện cách ngày nay khoảng',
            options: [
              { key: 'A', text: '5 – 6 triệu năm.' },
              { key: 'B', text: '4 triệu năm.' },
              { key: 'C', text: '15 vạn năm.' },
              { key: 'D', text: '4 vạn năm.' }
            ],
            correctAnswer: 'B',
            points: 0.35,
            explanation: 'Người tối cổ xuất hiện khoảng 4 triệu năm trước.'
          },
          {
            id: 'q6_20',
            type: 'single_choice',
            questionNumber: 20,
            question: 'Nguồn tư liệu ít đáng tin cậy nhất khi tìm hiểu lịch sử là gì?',
            options: [
              { key: 'A', text: 'Tư liệu gốc.' },
              { key: 'B', text: 'Tư liệu hiện vật.' },
              { key: 'C', text: 'Tư liệu chữ viết.' },
              { key: 'D', text: 'Tư liệu truyền miệng.' }
            ],
            correctAnswer: 'D',
            points: 0.35,
            explanation: 'Tư liệu truyền miệng thường bị thêu dệt, tam sao thất bản qua thời gian nên có độ tin cậy thấp nhất so với hiện vật và tư liệu gốc.'
          }
        ]
      },
      {
        id: 'sec-essay',
        title: 'Phần II. TỰ LUẬN',
        description: 'Gồm 3 câu hỏi tự luận (3,0 điểm). Giáo viên chấm điểm dựa theo Hướng dẫn chấm chi tiết.',
        points: 3.0,
        questions: [
          {
            id: 'q6_essay_1',
            type: 'essay',
            questionNumber: 1,
            question: 'Các sự kiện dưới đây xảy ra cách ngày nay bao nhiêu năm (tính đến năm 2026)?\n- Năm 179 TCN, Triệu Đà chiếm được nước Âu Lạc.\n- Năm 40, Hai Bà Trưng phất cờ khởi nghĩa.',
            maxPoints: 1.5,
            rubric: [
              {
                id: 'r6_1_1',
                criteria: 'Tính đúng số năm sự kiện Triệu Đà chiếm nước Âu Lạc năm 179 TCN',
                maxPoints: 0.75,
                sampleAnswer: 'Năm 179 TCN, Triệu Đà chiếm được nước Âu Lạc xảy ra cách ngày nay 2205 năm (2026 + 179 = 2205 năm).'
              },
              {
                id: 'r6_1_2',
                criteria: 'Tính đúng số năm sự kiện Hai Bà Trưng phất cờ khởi nghĩa năm 40',
                maxPoints: 0.75,
                sampleAnswer: 'Năm 40, Hai Bà Trưng phất cờ khởi nghĩa xảy ra cách ngày nay 1986 năm (2026 - 40 = 1986 năm).'
              }
            ],
            officialGuide: 'Năm 179 TCN xảy ra cách ngày nay 2205 năm (0.75đ). Năm 40 Hai Bà Trưng phất cờ khởi nghĩa xảy ra cách ngày nay 1986 năm (0.75đ).'
          },
          {
            id: 'q6_essay_2',
            type: 'essay',
            questionNumber: 2,
            question: 'Nêu khái niệm môn Lịch sử và khái niệm Lịch sử.',
            maxPoints: 1.0,
            rubric: [
              {
                id: 'r6_2_1',
                criteria: 'Nêu chính xác khái niệm Lịch sử và môn Lịch sử',
                maxPoints: 1.0,
                sampleAnswer: '- Lịch sử là tất cả những gì đã xảy ra trong quá khứ và còn được hiểu là khoa học nghiên cứu, phục dựng lại quá khứ.\n- Môn Lịch sử là môn học tìm hiểu quá trình hình thành và phát triển của xã hội loài người từ khi con người xuất hiện trên Trái Đất cho đến ngày nay.'
              }
            ],
            officialGuide: 'Môn Lịch sử là môn học tìm hiểu quá trình hình thành và phát triển của xã hội loài người từ khi con người xuất hiện trên Trái Đất cho đến ngày nay (1.0đ).'
          },
          {
            id: 'q6_essay_3',
            type: 'essay',
            questionNumber: 3,
            question: 'Vì sao chúng ta phải học môn Lịch sử?',
            maxPoints: 0.5,
            rubric: [
              {
                id: 'r6_3_1',
                criteria: 'Trình bày ý nghĩa của việc học Lịch sử đối với con người',
                maxPoints: 0.5,
                sampleAnswer: 'Học Lịch sử giúp hiểu cội nguồn dân tộc, trân trọng công lao dựng nước và giữ nước của tổ tiên, và đúc rút những bài học kinh nghiệm quý báu cho hiện tại và tương lai.'
              }
            ],
            officialGuide: 'Học lịch sử để hiểu cội nguồn tổ tiên, quê hương đất nước; biết ơn các thế hệ đi trước và rút ra bài học kinh nghiệm cho tương lai (0.5đ).'
          }
        ]
      }
    ]
  },
  {
    id: 'history-10-de-1',
    code: 'LS10-101',
    title: 'Kiểm tra Đánh giá Định kỳ Môn Lịch sử 10 - Đề 101',
    grade: '10',
    subject: 'Lịch sử 10 (Chương trình GDPT mới 2018)',
    durationMinutes: 45,
    totalPoints: 10,
    description: 'Cấu trúc đề kiểm tra định dạng mới: Phần I (Trắc nghiệm nhiều lựa chọn), Phần II (Trắc nghiệm Đúng - Sai), Phần III (Tự luận ứng dụng).',
    sections: [
      {
        id: 'sec-p1',
        title: 'PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN',
        description: 'Học sinh trả lời từ câu 1 đến câu 12 (3,0 điểm). Mỗi câu chọn 1 phương án đúng (0,25 điểm/câu).',
        points: 3.0,
        questions: [
          {
            id: 'q10_1',
            type: 'single_choice',
            questionNumber: 1,
            question: 'Toàn bộ những gì đã diễn ra trong quá khứ của xã hội loài người, tồn tại một cách hoàn toàn khách quan và độc lập với ý muốn chủ quan của con người được gọi là',
            options: [
              { key: 'A', text: 'hiện thực lịch sử.' },
              { key: 'B', text: 'nhận thức lịch sử.' },
              { key: 'C', text: 'tri thức lịch sử.' },
              { key: 'D', text: 'quy luật lịch sử.' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Hiện thực lịch sử là toàn bộ những gì đã diễn ra trong quá khứ, tồn tại khách quan, độc lập với ý muốn con người.'
          },
          {
            id: 'q10_2',
            type: 'single_choice',
            questionNumber: 2,
            question: 'Khôi phục các sự kiện lịch sử diễn ra trong quá khứ là chức năng nào của Sử học?',
            options: [
              { key: 'A', text: 'Khoa học.' },
              { key: 'B', text: 'Tái hiện.' },
              { key: 'C', text: 'Nhận biết.' },
              { key: 'D', text: 'Phục dựng.' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Chức năng khoa học của Sử học là khôi phục hiện thực lịch sử một cách chính xác, khách quan.'
          },
          {
            id: 'q10_3',
            type: 'single_choice',
            questionNumber: 3,
            question: 'Nhận thức lịch sử thường mang tính chủ quan và đa dạng chủ yếu là do',
            options: [
              { key: 'A', text: 'các nguồn sử liệu luôn phản ánh tuyệt đối chân thực quá khứ.' },
              { key: 'B', text: 'mục đích nghiên cứu và phương pháp tiếp cận của người tìm hiểu.' },
              { key: 'C', text: 'hiện thực lịch sử luôn thay đổi không ngừng theo thời gian.' },
              { key: 'D', text: 'Sử học không tuân theo bất kì nguyên tắc nghiên cứu khoa học nào.' }
            ],
            correctAnswer: 'B',
            points: 0.25,
            explanation: 'Nhận thức lịch sử phụ thuộc vào mục đích, góc nhìn, phương pháp tiếp cận và thế giới quan của người nghiên cứu.'
          },
          {
            id: 'q10_4',
            type: 'single_choice',
            questionNumber: 4,
            question: 'Nguồn sử liệu nào sau đây thuộc nhóm sử liệu hiện vật?',
            options: [
              { key: 'A', text: 'Truyền thuyết “Sơn Tinh - Thủy Tinh”.' },
              { key: 'B', text: 'Tác phẩm sử học “Đại Việt sử kí toàn thư”.' },
              { key: 'C', text: 'Trống đồng Đông Sơn và công cụ lao động.' },
              { key: 'D', text: 'Lời kể truyền miệng của các nhân chứng lịch sử.' }
            ],
            correctAnswer: 'C',
            points: 0.25,
            explanation: 'Trống đồng Đông Sơn và công cụ lao động bằng đá, kim loại là các di vật vật chất thuộc sử liệu hiện vật.'
          },
          {
            id: 'q10_5',
            type: 'single_choice',
            questionNumber: 5,
            question: 'Một trong những nguồn sử liệu có giá trị tin cậy cao nhất khi nghiên cứu lịch sử là',
            options: [
              { key: 'A', text: 'sử liệu thứ cấp.' },
              { key: 'B', text: 'sử liệu gốc (sơ cấp).' },
              { key: 'C', text: 'tiểu thuyết lịch sử.' },
              { key: 'D', text: 'tranh vẽ hư cấu.' }
            ],
            correctAnswer: 'B',
            points: 0.25,
            explanation: 'Sử liệu gốc (sơ cấp) ra đời trực tiếp tại thời điểm diễn ra sự kiện, có giá trị tin cậy cao nhất.'
          },
          {
            id: 'q10_6',
            type: 'single_choice',
            questionNumber: 6,
            question: 'Vì sao mỗi cá nhân cần phải học tập và khám phá lịch sử suốt đời?',
            options: [
              { key: 'A', text: 'Vì lịch sử là môn học duy nhất được giảng dạy ở các trường đại học.' },
              { key: 'B', text: 'Vì tri thức lịch sử vô cùng rộng lớn và liên tục được bổ sung.' },
              { key: 'C', text: 'Vì con người sẽ không cần tích lũy các tri thức khoa học khác.' },
              { key: 'D', text: 'Vì hiện thực lịch sử thay đổi liên tục theo ý muốn của con người.' }
            ],
            correctAnswer: 'B',
            points: 0.25,
            explanation: 'Tri thức lịch sử rất rộng lớn, đa dạng và không ngừng được phát hiện, bổ sung mới.'
          },
          {
            id: 'q10_7',
            type: 'single_choice',
            questionNumber: 7,
            question: 'Một trong những cơ sở khoa học để bảo tồn và phát huy giá trị di sản là',
            options: [
              { key: 'A', text: 'giá trị lịch sử, văn hóa.' },
              { key: 'B', text: 'giá trị kinh tế, thương mại.' },
              { key: 'C', text: 'giá trị kinh tế, xã hội.' },
              { key: 'D', text: 'giá trị lịch sử, địa lí.' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Giá trị lịch sử, văn hóa của di sản là nền tảng cốt lõi hàng đầu để định hướng công tác bảo tồn.'
          },
          {
            id: 'q10_8',
            type: 'single_choice',
            questionNumber: 8,
            question: 'Đối tượng nào sau đây thuộc nhóm di sản thiên nhiên thế giới của Việt Nam?',
            options: [
              { key: 'A', text: 'Thành nhà Hồ.' },
              { key: 'B', text: 'Hoàng thành Thăng Long' },
              { key: 'C', text: 'Vịnh Hạ Long.' },
              { key: 'D', text: 'Cồng chiêng Tây Nguyên.' }
            ],
            correctAnswer: 'C',
            points: 0.25,
            explanation: 'Vịnh Hạ Long và Vườn quốc gia Phong Nha - Kẻ Bàng là di sản thiên nhiên thế giới tại Việt Nam.'
          },
          {
            id: 'q10_9',
            type: 'single_choice',
            questionNumber: 9,
            question: 'Tổ chức quốc tế nào sau đây ghi danh, công nhận các danh mục di sản văn hóa thế giới?',
            options: [
              { key: 'A', text: 'ASEAN.' },
              { key: 'B', text: 'NATO.' },
              { key: 'C', text: 'WTO.' },
              { key: 'D', text: 'UNESCO.' }
            ],
            correctAnswer: 'D',
            points: 0.25,
            explanation: 'UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc) ghi danh các di sản thế giới.'
          },
          {
            id: 'q10_10',
            type: 'single_choice',
            questionNumber: 10,
            question: 'Mối quan hệ giữa bảo tồn di sản lịch sử - văn hóa với phát triển du lịch bền vững được thể hiện như thế nào?',
            options: [
              { key: 'A', text: 'Phát triển du lịch bằng mọi giá mà không cần quan tâm đến việc phát huy và bảo tồn di sản.' },
              { key: 'B', text: 'Bảo tồn di sản và phát triển du lịch là hai hoạt động hoàn toàn triệt tiêu lẫn nhau.' },
              { key: 'C', text: 'Chỉ cần bảo tồn các di sản vật thể, không cần phát triển các sản phẩm du lịch văn hóa.' },
              { key: 'D', text: 'Di sản là nguồn tài nguyên du lịch; du lịch tạo nguồn lực kinh tế để tái đầu tư bảo tồn di sản.' }
            ],
            correctAnswer: 'D',
            points: 0.25,
            explanation: 'Di sản và du lịch có mối quan hệ tương hỗ: di sản là tài nguyên, du lịch tạo kinh phí tái bảo tồn.'
          },
          {
            id: 'q10_11',
            type: 'single_choice',
            questionNumber: 11,
            question: 'Ai Cập cổ đại được hình thành trên lưu vực con sông nào?',
            options: [
              { key: 'A', text: 'Sông Ấn.' },
              { key: 'B', text: 'Sông Hằng.' },
              { key: 'C', text: 'Sông Ti-grơ.' },
              { key: 'D', text: 'Sông Nin.' }
            ],
            correctAnswer: 'D',
            points: 0.25,
            explanation: 'Ai Cập cổ đại được hình thành trên lưu vực hạ lưu sông Nin (Nile) màu mỡ ở Đông Bắc châu Phi.'
          },
          {
            id: 'q10_12',
            type: 'single_choice',
            questionNumber: 12,
            question: 'Nội dung nào sau đây phản ánh đúng điểm tương đồng giữa văn hóa và văn minh?',
            options: [
              { key: 'A', text: 'Là những giá trị vật chất và tinh thần mà con người sáng tạo ra.' },
              { key: 'B', text: 'Là toàn bộ những giá trị do con người sáng tạo trong lịch sử.' },
              { key: 'C', text: 'Là toàn bộ giá trị tinh thần của con người từ khi xuất hiện đến nay.' },
              { key: 'D', text: 'Là toàn bộ giá trị vật chất của con người từ khi xuất hiện đến nay.' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Cả văn hóa và văn minh đều là những giá trị vật chất và tinh thần do loài người sáng tạo ra.'
          }
        ]
      },
      {
        id: 'sec-p2',
        title: 'PHẦN II. TRẮC NGHIỆM ĐÚNG - SAI',
        description: 'Học sinh trả lời từ Câu 1 đến Câu 4 (4,0 điểm). Trong mỗi ý a), b), c), d), chọn Đúng hoặc Sai. Mỗi ý đúng được 0,25 điểm.',
        points: 4.0,
        questions: [
          {
            id: 'q10_tf_1',
            type: 'true_false_group',
            questionNumber: 1,
            context: '“Lịch sử là một dòng chảy liên tục theo thời gian từ quá khứ đến hiện tại, diễn ra một lần và không lặp lại. Lịch sử được hậu thế nhận thức dựa vào những mảnh vỡ của sự kiện (tức sử liệu) và bị chi phối bởi quan điểm chủ quan của con người. Sự kiện Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập ngày 2-9-1945 tại Quảng trường Ba Đình là một hiện thực lịch sử khách quan, không ai có thể phủ nhận hay thay đổi.”\n(Tài liệu tập huấn giáo viên môn Lịch sử cấp THPT, NXB Giáo dục Việt Nam, 2026, tr.54)',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Sự kiện ngày 2-9-1945 tại Quảng trường Ba Đình là một hiện thực lịch sử tồn tại khách quan.', correctAnswer: true, explanation: 'Đúng: Sự kiện diễn ra ngoài ý muốn chủ quan của con người và là hiện thực khách quan.' },
              { key: 'b', text: 'Đoạn trích khẳng định lịch sử là dòng chảy tuần hoàn, lặp đi lặp lại hoàn toàn giống nhau qua các thời kì.', correctAnswer: false, explanation: 'Sai: Đoạn trích nêu rõ lịch sử diễn ra một lần và không lặp lại.' },
              { key: 'c', text: 'Nhận thức lịch sử của con người phụ thuộc vào nguồn sử liệu thu thập được và thế giới quan của người nghiên cứu.', correctAnswer: true, explanation: 'Đúng: Nhận thức dựa vào mảnh vỡ sự kiện (sử liệu) và bị chi phối bởi quan điểm chủ quan.' },
              { key: 'd', text: 'Vì lịch sử đã diễn ra trong quá khứ và không thể thay đổi, nên việc học tập và nghiên cứu lịch sử không có ý nghĩa đối với đời sống hiện tại.', correctAnswer: false, explanation: 'Sai: Lịch sử đúc kết bài học quý giá định hướng cho hiện tại và tương lai.' }
            ]
          },
          {
            id: 'q10_tf_2',
            type: 'true_false_group',
            questionNumber: 2,
            context: '“Sử dạy cho ta bài học này: Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do. Trái lại, lúc nào dân ta không đoàn kết thì bị nước ngoài xâm lấn... Tri thức lịch sử không chỉ trang bị cho thế hệ trẻ những kiến thức cơ bản về lịch sử dân tộc và thế giới mà còn giữ vai trò quan trọng bậc nhất trong giáo dục chủ nghĩa yêu nước, lòng tự hào dân tộc và bản lĩnh con người Việt Nam.”\n(Hồ Chí Minh, Nên học sử ta, Toàn tập, tập 3, NXB Chính trị quốc gia Sự thật, tr.256)',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Chủ tịch Hồ Chí Minh khẳng định tri thức lịch sử chỉ có giá trị đối với các nhà nghiên cứu chuyên nghiệp.', correctAnswer: false, explanation: 'Sai: Hồ Chí Minh khẳng định lịch sử quan trọng với toàn dân, đặc biệt là thế hệ trẻ.' },
              { key: 'b', text: 'Đoạn tư liệu khẳng định bài học đoàn kết toàn dân tộc là nhân tố quyết định độc lập, tự do của đất nước.', correctAnswer: true, explanation: 'Đúng: "Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do".' },
              { key: 'c', text: 'Tri thức lịch sử có vai trò nền tảng trong việc hình thành nhân cách, bồi dưỡng lòng yêu nước và ý thức trách nhiệm công dân.', correctAnswer: true, explanation: 'Đúng: Giữ vai trò quan trọng bậc nhất trong giáo dục lòng yêu nước và bản lĩnh.' },
              { key: 'd', text: 'Trong bối cảnh toàn cầu hóa và hội nhập quốc tế hiện nay, việc học tập và vận dụng bài học đoàn kết dân tộc không còn nhiều giá trị thực tiễn.', correctAnswer: false, explanation: 'Sai: Bài học đại đoàn kết vẫn luôn còn nguyên giá trị thực tiễn to lớn.' }
            ]
          },
          {
            id: 'q10_tf_3',
            type: 'true_false_group',
            questionNumber: 3,
            context: '“Khu di tích trung tâm Hoàng thành Thăng Long có địa chỉ 19C Hoàng Diệu (thành phố Hà Nội). Đây là quần thể di tích gắn với lịch sử kinh thành Thăng Long (thời Lý - Trần), Đông Kinh (thời Hậu Lê) và tỉnh thành Hà Nội (thời Nguyễn). Hoàng thành Thăng Long được hình thành vào năm 1010, khi vua Lý Thái Tổ dời đô từ Hoa Lư ra Đại La và cho xây dựng kinh thành quy mô lớn... Với những giá trị lịch sử, văn hóa mà công trình kiến trúc đặc biệt này mang lại, năm 2010, UNESCO đã ghi danh Khu di tích trung tâm Hoàng thành Thăng Long là Di sản Văn hóa thế giới và nơi đây đã trở thành một trong những địa điểm nghiên cứu khoa học cũng như tham quan, du lịch nổi tiếng của Hà Nội.”\n(Tài liệu tổng hợp từ Trung tâm Bảo tồn Di sản Thăng Long – Hà Nội).',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Khu di tích trung tâm Hoàng thành Thăng Long được UNESCO ghi danh là Di sản Văn hóa thế giới.', correctAnswer: true, explanation: 'Đúng: Được ghi danh vào năm 2010.' },
              { key: 'b', text: 'Hoàng thành Thăng Long được hình thành vào thế kỉ XI và trở thành kinh đô của nước Đại Việt trong suốt các triều đại Lý, Trần, Hồ, Hậu Lê, Nguyễn.', correctAnswer: false, explanation: 'Sai: Thời nhà Hồ kinh đô dời về Tây Đô (Thanh Hóa), thời Nguyễn kinh đô ở Huế.' },
              { key: 'c', text: 'Khu di tích trung tâm Hoàng thành Thăng Long trở thành một địa điểm du lịch nổi tiếng của Hà Nội nhờ sức hút của giá trị lịch sử, văn hóa lâu đời.', correctAnswer: true, explanation: 'Đúng: Có giá trị văn hóa lịch sử đặc biệt thu hút khách tham quan.' },
              { key: 'd', text: 'Bảo tồn và phát huy các giá trị của Khu di tích trung tâm Hoàng thành Thăng Long được xác định là công cuộc lâu dài, phải được triển khai với sự thận trọng và cần có cách thức thực hiện bài bản.', correctAnswer: true, explanation: 'Đúng: Đây là nguyên tắc bảo tồn di sản bền vững.' }
            ]
          },
          {
            id: 'q10_tf_4',
            type: 'true_false_group',
            questionNumber: 4,
            context: 'Bảng dữ kiện về một số thành tựu của văn minh Ai Cập thời cổ đại:\n- Tín ngưỡng, tôn giáo: Sùng bái đa thần\n- Chữ viết: Chữ tượng hình\n- Kiến trúc và điêu khắc: Cung điện, đền thờ và kim tự tháp\n- Toán học: Phép đếm đến 10, giỏi hình học, tính số Pi bằng 3,16',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Ai Cập cổ đại có nhiều công trình kiến trúc kì vĩ, nổi bật là các kim tự tháp và các đền thờ thần linh.', correctAnswer: true, explanation: 'Đúng: Kim tự tháp Khe-ốp, đền thờ Luých-xo, Ca-nác...' },
              { key: 'b', text: 'Về tín ngưỡng, người Ai Cập cổ đại sùng bái thần tự nhiên, thần động vật, linh hồn người chết.', correctAnswer: true, explanation: 'Đúng: Tôn giáo Ai Cập mang tính chất đa thần sùng bái tự nhiên và thế giới bên kia.' },
              { key: 'c', text: 'Ai Cập cổ đại là một trong những nền văn minh ra đời sớm ở phía Nam Châu Phi với nhiều thành tựu rực rỡ và độc đáo.', correctAnswer: false, explanation: 'Sai: Ai Cập nằm ở Đông Bắc châu Phi, không phải phía Nam.' },
              { key: 'd', text: 'Nghệ thuật kiến trúc và điêu khắc của Ai Cập cổ đại mang tính thẩm mĩ cao đồng thời là biểu hiện đỉnh cao của tính chuyên chế.', correctAnswer: true, explanation: 'Đúng: Kim tự tháp thể hiện quyền lực tối cao vô hạn của các Pha-ra-ông.' }
            ]
          }
        ]
      },
      {
        id: 'sec-p3',
        title: 'PHẦN III. TỰ LUẬN',
        description: 'Gồm 2 câu hỏi (3,0 điểm). Giáo viên chấm điểm theo Bareme đáp án chi tiết của Bộ Giáo dục & Đào tạo.',
        points: 3.0,
        questions: [
          {
            id: 'q10_essay_1',
            type: 'essay',
            questionNumber: 1,
            question: 'Từ những hiểu biết về vai trò của tri thức lịch sử đối với đời sống, em hãy đề xuất 02 hình thức học tập Lịch sử em cảm thấy hứng thú và hiệu quả.',
            maxPoints: 1.0,
            rubric: [
              {
                id: 'r10_1_1',
                criteria: 'Đề xuất hình thức học tập 1 kèm giải thích hiệu quả (0.5đ)',
                maxPoints: 0.5,
                sampleAnswer: 'Học tập thông qua tham quan bảo tàng, di tích lịch sử: giúp quan sát trực quan các hiện vật, lắng nghe câu chuyện lịch sử chân thực, tạo sự hào hứng và nhớ lâu.'
              },
              {
                id: 'r10_1_2',
                criteria: 'Đề xuất hình thức học tập 2 kèm giải thích hiệu quả (0.5đ)',
                maxPoints: 0.5,
                sampleAnswer: 'Học tập thông qua xem phim tài liệu, video mô phỏng 3D hoặc tham gia các diễn đàn, trò chơi đố vui lịch sử: giúp hình ảnh hóa các trận chiến hào hùng và các nhân vật lịch sử.'
              }
            ],
            officialGuide: 'Nêu ít nhất 02 hình thức học tập cụ thể, mỗi hình thức 0.5 điểm (Tham quan bảo tàng, di tích; xem phim tư liệu, trò chơi lịch sử, sân khấu hóa...).'
          },
          {
            id: 'q10_essay_2',
            type: 'essay',
            questionNumber: 2,
            question: 'a) Kể tên ít nhất 02 di sản văn hóa của Việt Nam được UNESCO ghi danh (1.0 điểm).\nb) Em hãy nêu ít nhất 02 việc làm cụ thể của bản thân để góp phần bảo vệ và quảng bá các di sản lịch sử - văn hóa tới bạn bè trong và ngoài nước (1.0 điểm).',
            maxPoints: 2.0,
            rubric: [
              {
                id: 'r10_2_1',
                criteria: 'Kể tên đúng ít nhất 02 di sản văn hóa vật thể/phi vật thể được UNESCO công nhận',
                maxPoints: 1.0,
                sampleAnswer: '1. Quần thể di tích Cố đô Huế\n2. Đô thị cổ Hội An (hoặc Khu di tích trung tâm Hoàng thành Thăng Long, Thành nhà Hồ, Thánh địa Mỹ Sơn).'
              },
              {
                id: 'r10_2_2',
                criteria: 'Nêu 02 việc làm thiết thực bảo vệ và quảng bá di sản',
                maxPoints: 1.0,
                sampleAnswer: '- Giữ gìn vệ sinh, không viết vẽ bậy lên các di tích khi đi tham quan.\n- Sử dụng mạng xã hội để đăng tải bài viết, hình ảnh, video song ngữ giới thiệu nét đẹp di sản quê hương đến bạn bè quốc tế.'
              }
            ],
            officialGuide: 'a) Nêu ít nhất 02 di sản văn hóa (1.0đ). b) Nêu ít nhất 02 việc làm cụ thể (1.0đ).'
          }
        ]
      }
    ]
  },
  {
    id: 'history-10-de-2',
    code: 'LS10-102',
    title: 'Kiểm tra Đánh giá Định kỳ Môn Lịch sử 10 - Đề 102',
    grade: '10',
    subject: 'Lịch sử 10 (Chương trình GDPT mới 2018)',
    durationMinutes: 45,
    totalPoints: 10,
    description: 'Bộ đề thi song song 102: Khảo sát Sử học, Di sản văn hóa phi vật thể và văn minh Ai Cập thời cổ đại.',
    sections: [
      {
        id: 'sec-p1-102',
        title: 'PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN',
        description: 'Học sinh trả lời từ câu 13 đến câu 24 (3,0 điểm). Mỗi câu chọn 1 phương án đúng (0,25 điểm/câu).',
        points: 3.0,
        questions: [
          {
            id: 'q10_13',
            type: 'single_choice',
            questionNumber: 13,
            question: 'Một trong những chức năng quan trọng của Sử học là',
            options: [
              { key: 'A', text: 'Thúc đẩy xu thế toàn cầu hóa.' },
              { key: 'B', text: 'Thúc đẩy xu thế hội nhập quốc tế.' },
              { key: 'C', text: 'Khôi phục hiện thực lịch sử.' },
              { key: 'D', text: 'Tìm hiểu quá trình biến đổi tự nhiên.' }
            ],
            correctAnswer: 'C',
            points: 0.25,
            explanation: 'Chức năng cơ bản hàng đầu của Sử học là khôi phục hiện thực lịch sử một cách chính xác, khách quan.'
          },
          {
            id: 'q10_14',
            type: 'single_choice',
            questionNumber: 14,
            question: '“Khôi phục lại hiện thực lịch sử một cách chính xác, khách quan” là chức năng nào sau đây của Sử học?',
            options: [
              { key: 'A', text: 'Khoa học.' },
              { key: 'B', text: 'Xã hội.' },
              { key: 'C', text: 'Giáo dục.' },
              { key: 'D', text: 'Dự báo.' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Đó là chức năng khoa học của Sử học.'
          },
          {
            id: 'q10_15',
            type: 'single_choice',
            questionNumber: 15,
            question: 'Điểm khác biệt căn bản giữa “hiện thực lịch sử” và “lịch sử được con người nhận thức” là gì?',
            options: [
              { key: 'A', text: 'Hiện thực lịch sử chỉ diễn ra trong tư duy, còn nhận thức lịch sử diễn ra ngoài thực tế.' },
              { key: 'B', text: 'Hiện thực lịch sử không thể thay đổi, nhận thức lịch sử có thể biến đổi theo thời gian.' },
              { key: 'C', text: 'Hiện thực lịch sử luôn mang tính chủ quan, còn nhận thức lịch sử mang tính khách quan.' },
              { key: 'D', text: 'Hiện thực lịch sử luôn rộng lớn hơn nhận thức lịch sử và không bao giờ được khôi phục.' }
            ],
            correctAnswer: 'B',
            points: 0.25,
            explanation: 'Hiện thực lịch sử đã diễn ra thì bất biến; còn nhận thức lịch sử luôn thay đổi khi có thêm phát hiện mới hoặc góc nhìn mới.'
          },
          {
            id: 'q10_16',
            type: 'single_choice',
            questionNumber: 16,
            question: 'Nguồn sử liệu nào sau đây thuộc nhóm sử liệu chữ viết?',
            options: [
              { key: 'A', text: 'Truyện truyền thuyết “Sơn Tinh - Thủy Tinh”.' },
              { key: 'B', text: 'Tác phẩm sử học “Đại Việt sử kí toàn thư”.' },
              { key: 'C', text: 'Trống đồng Đông Sơn và công cụ lao động bằng đá.' },
              { key: 'D', text: 'Lời kể truyền miệng của các nhân chứng lịch sử.' }
            ],
            correctAnswer: 'B',
            points: 0.25,
            explanation: 'Bộ quốc sử “Đại Việt sử kí toàn thư” được biên soạn dưới dạng văn bản chữ viết khắc in.'
          },
          {
            id: 'q10_17',
            type: 'single_choice',
            questionNumber: 17,
            question: 'Toàn bộ những hình thức khác nhau của tư liệu lịch sử, chứa đựng những thông tin về quá khứ loài người được gọi là',
            options: [
              { key: 'A', text: 'sử liệu.' },
              { key: 'B', text: 'truyền thuyết.' },
              { key: 'C', text: 'ngữ liệu.' },
              { key: 'D', text: 'văn bản' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Sử liệu là toàn bộ các nguồn tư liệu cung cấp thông tin về quá khứ.'
          },
          {
            id: 'q10_18',
            type: 'single_choice',
            questionNumber: 18,
            question: 'Cần học tập lịch sử suốt đời vì tri thức lịch sử',
            options: [
              { key: 'A', text: 'chưa hoàn toàn chính xác, cần sửa đổi và bổ sung thường xuyên.' },
              { key: 'B', text: 'liên quan và quyết định đến tất cả mọi sự vật, hiện tượng.' },
              { key: 'C', text: 'giúp cá nhân hội nhập nhanh chóng vào cuộc sống hiện tại.' },
              { key: 'D', text: 'rất rộng lớn và đa dạng, lại biến đổi và phát triển không ngừng.' }
            ],
            correctAnswer: 'D',
            points: 0.25,
            explanation: 'Tri thức lịch sử rất rộng lớn, đa dạng và không ngừng phát triển mở rộng.'
          },
          {
            id: 'q10_19',
            type: 'single_choice',
            questionNumber: 19,
            question: 'Trong các di sản dưới đây, di sản nào thuộc loại hình di sản văn hóa phi vật thể?',
            options: [
              { key: 'A', text: 'Cung điện.' },
              { key: 'B', text: 'Nhà cổ.' },
              { key: 'C', text: 'Lăng tẩm.' },
              { key: 'D', text: 'Hát xoan.' }
            ],
            correctAnswer: 'D',
            points: 0.25,
            explanation: 'Hát Xoan Phú Thọ là loại hình nghệ thuật diễn xướng dân gian truyền miệng, thuộc di sản văn hóa phi vật thể.'
          },
          {
            id: 'q10_20',
            type: 'single_choice',
            questionNumber: 20,
            question: 'Một trong những di sản thiên nhiên của Việt Nam là',
            options: [
              { key: 'A', text: 'Đờn ca tài tử Nam Bộ.' },
              { key: 'B', text: 'Vườn quốc gia Phong Nha - Kẻ Bàng.' },
              { key: 'C', text: 'Dân ca quan họ Bắc Ninh.' },
              { key: 'D', text: 'Quần thể di tích Cố đô Huế.' }
            ],
            correctAnswer: 'B',
            points: 0.25,
            explanation: 'Vườn quốc gia Phong Nha - Kẻ Bàng là di sản thiên nhiên thế giới nổi tiếng của tỉnh Quảng Bình.'
          },
          {
            id: 'q10_21',
            type: 'single_choice',
            questionNumber: 21,
            question: 'Ngành nào sau đây đã góp phần thúc đẩy việc bảo vệ di sản văn hóa, di tích lịch sử của các quốc gia?',
            options: [
              { key: 'A', text: 'Du lịch.' },
              { key: 'B', text: 'Kiến trúc.' },
              { key: 'C', text: 'Kinh tế.' },
              { key: 'D', text: 'Dịch vụ.' }
            ],
            correctAnswer: 'A',
            points: 0.25,
            explanation: 'Du lịch văn hóa mang lại nguồn thu kinh tế để tái đầu tư cho công tác tôn tạo, bảo tồn và phục dựng các di sản.'
          },
          {
            id: 'q10_22',
            type: 'single_choice',
            questionNumber: 22,
            question: 'Ngày 23-11 hằng năm được chọn là “Ngày Di sản văn hóa Việt Nam” nhằm giáo dục và phát huy truyền thống nào sau đây của dân tộc?',
            options: [
              { key: 'A', text: 'Đoàn kết quyết tâm phấn đấu giữ vững những công trình văn hóa hiện đại.' },
              { key: 'B', text: 'Trung thực, tự tôn dân tộc và ý thức trách nhiệm của công dân toàn cầu.' },
              { key: 'C', text: 'Yêu nước, tự hào dân tộc, ý thức trách nhiệm trong việc bảo vệ di sản văn hóa.' },
              { key: 'D', text: 'Phát huy sức mạnh đại đoàn kết dân tộc trong công tác tôn tạo di sản văn hóa.' }
            ],
            correctAnswer: 'C',
            points: 0.25,
            explanation: 'Nhằm bồi dưỡng lòng yêu nước, niềm tự hào dân tộc và trách nhiệm gìn giữ di sản cha ông để lại.'
          },
          {
            id: 'q10_23',
            type: 'single_choice',
            questionNumber: 23,
            question: 'Tại Ai Cập cổ đại, vua được gọi là gì?',
            options: [
              { key: 'A', text: 'Thiên tử.' },
              { key: 'B', text: 'Hoàng đế.' },
              { key: 'C', text: 'En-xi.' },
              { key: 'D', text: 'Pha-ra-ông.' }
            ],
            correctAnswer: 'D',
            points: 0.25,
            explanation: 'Người đứng đầu nhà nước chuyên chế Ai Cập cổ đại mang tước hiệu Pha-ra-ông (Pharaoh - ngôi nhà lớn).'
          },
          {
            id: 'q10_24',
            type: 'single_choice',
            questionNumber: 24,
            question: 'Vì sao Lịch pháp và Thiên văn học ở Ai Cập cổ đại ra đời sớm?',
            options: [
              { key: 'A', text: 'Xuất phát từ nhu cầu phát triển hoạt động thương mại.' },
              { key: 'B', text: 'Xuất phát từ nhu cầu tổ chức các nghi lễ tôn giáo.' },
              { key: 'C', text: 'Xuất phát từ yêu cầu của sản xuất nông nghiệp.' },
              { key: 'D', text: 'Xuất phát từ nhu cầu thực hiện các nghi thức thờ cúng.' }
            ],
            correctAnswer: 'C',
            points: 0.25,
            explanation: 'Người Ai Cập cần theo dõi quy luật nước lũ sông Nin để gieo trồng và thu hoạch mùa màng kịp thời vụ.'
          }
        ]
      },
      {
        id: 'sec-p2-102',
        title: 'PHẦN II. TRẮC NGHIỆM ĐÚNG - SAI',
        description: 'Học sinh trả lời từ Câu 5 đến Câu 8 (4,0 điểm). Trong mỗi ý a), b), c), d), chọn Đúng hoặc Sai (0,25 điểm/ý).',
        points: 4.0,
        questions: [
          {
            id: 'q10_tf_5',
            type: 'true_false_group',
            questionNumber: 5,
            context: '“Sử học có chức năng khôi phục hiện thực lịch sử thật chính xác, đồng thời giáo dục tư tưởng, đạo đức và rút ra các quy luật, bài học kinh nghiệm cho hiện tại và tương lai. Để hoàn thành sứ mệnh đó, nhà sử học phải tuân thủ nghiêm ngặt nguyên tắc khách quan và trung thực. Nhà sử học cổ đại Xi-xê-rông (Cicero) từng nhấn mạnh: “Quy luật đầu tiên của lịch sử là không được nói điều dối trá, quy luật thứ hai là không sợ nói sự thật”.”\n(Trích SGK Lịch sử 10, Bộ sách Kết nối tri thức với cuộc sống, tr.11)',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Chức năng cơ bản của Sử học là khôi phục lại hiện thực lịch sử một cách chính xác, khách quan.', correctAnswer: true, explanation: 'Đúng: Đây là chức năng khoa học tiên quyết.' },
              { key: 'b', text: 'Xi-xê-rông cho rằng người nghiên cứu lịch sử có thể thay đổi sự thật để phục vụ lợi ích cá nhân.', correctAnswer: false, explanation: 'Sai: Cicero khẳng định không được nói điều dối trá, không sợ nói sự thật.' },
              { key: 'c', text: 'Nguyên tắc khách quan và trung thực đòi hỏi nhà nghiên cứu phải tôn trọng sự thật lịch sử dựa trên các bằng chứng sử liệu đáng tin cậy.', correctAnswer: true, explanation: 'Đúng: Nhà sử học phải tôn trọng sự thật dựa vào sử liệu.' },
              { key: 'd', text: 'Việc nắm vững các bài học kinh nghiệm lịch sử là cơ sở khoa học quan trọng giúp các quốc gia dự báo xu thế phát triển và hoạch định chính sách đúng đắn.', correctAnswer: true, explanation: 'Đúng: Đây là chức năng dự báo và ứng dụng thực tiễn của Sử học.' }
            ]
          },
          {
            id: 'q10_tf_6',
            type: 'true_false_group',
            questionNumber: 6,
            context: 'Tư liệu 1: “Sử để ghi việc, mà việc hay hoặc dở đều dùng làm gương răn cho đời sau”\n(Ngô Sĩ Liên và các sử thần nhà Lê, Đại Việt sử kí toàn thư, tập I, NXB Khoa học xã hội, Hà Nội, 1998, tr.101)\n\nTư liệu 2:\n“Dân ta phải biết sử ta\nCho tường gốc tích nước nhà Việt Nam”\n(Hồ Chí Minh, Lịch sử nước ta, 1942)',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Tư liệu 1 đề cập đến nhiệm vụ giáo dục đạo đức của Sử học.', correctAnswer: true, explanation: 'Đúng: "dùng làm gương răn cho đời sau" thể hiện tính răn dạy, giáo dục đạo đức.' },
              { key: 'b', text: 'Tư liệu 2 cho thấy sự hiểu biết về lịch sử, văn hóa của dân tộc và các nước trên thế giới giúp Việt Nam hội nhập thành công.', correctAnswer: false, explanation: 'Sai: Tư liệu 2 nhấn mạnh sự hiểu biết về cội nguồn gốc tích của chính nước nhà Việt Nam.' },
              { key: 'c', text: 'Cả hai tư liệu đều nhấn mạnh tầm quan trọng của tri thức lịch sử đối với một quốc gia, dân tộc.', correctAnswer: true, explanation: 'Đúng: Đều khẳng định ý nghĩa sống còn của việc ghi nhớ và học tập sử.' },
              { key: 'd', text: 'Trong cuộc sống hằng ngày, việc vận dụng những bài học kinh nghiệm từ quá khứ vào thực tiễn góp phần định hướng hành động trong hiện tại và tương lai.', correctAnswer: true, explanation: 'Đúng: Quá khứ soi rọi con đường hành động hiện tại.' }
            ]
          },
          {
            id: 'q10_tf_7',
            type: 'true_false_group',
            questionNumber: 7,
            context: '“Di sản văn hóa và di sản thiên nhiên là nguồn tài nguyên vô giá để phát triển du lịch. Ngược lại, du lịch văn hóa mang lại nguồn thu kinh tế lớn để tái đầu tư cho công tác tôn tạo, bảo tồn và phục dựng các di sản. Sử học đóng vai trò then chốt trong việc cung cấp tri thức khoa học, thẩm định tính xác thực và làm sáng tỏ chiều sâu văn hóa của di sản, giúp các sản phẩm du lịch trở nên hấp dẫn, có hồn và phát triển bền vững.”\n(Trích SGK Lịch sử 10, Bộ sách Kết nối tri thức với cuộc sống, tr.25)',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Di sản văn hóa và di sản thiên nhiên là nguồn tài nguyên du lịch quan trọng của mỗi quốc gia.', correctAnswer: true, explanation: 'Đúng: Đoạn trích nêu đây là nguồn tài nguyên vô giá.' },
              { key: 'b', text: 'Theo đoạn trích, ngành du lịch hoàn toàn không mang lại lợi ích gì cho công tác bảo tồn di sản.', correctAnswer: false, explanation: 'Sai: Du lịch mang lại nguồn thu kinh tế lớn để tái đầu tư bảo tồn.' },
              { key: 'c', text: 'Sử học đóng vai trò thẩm định khoa học và gia tăng giá trị nhân văn cho các điểm đến du lịch di sản.', correctAnswer: true, explanation: 'Đúng: Sử học thẩm định tính xác thực và làm sáng tỏ chiều sâu di sản.' },
              { key: 'd', text: 'Để tối đa hóa lợi nhuận kinh tế từ du lịch, địa phương có thể tùy ý cơi nới, xây mới các công trình hiện đại ngay trong vùng lõi bảo vệ của di sản.', correctAnswer: false, explanation: 'Sai: Việc xây dựng tùy tiện trong vùng lõi sẽ xâm hại và phá hủy di sản nghiêm trọng.' }
            ]
          },
          {
            id: 'q10_tf_8',
            type: 'true_false_group',
            questionNumber: 8,
            context: '“Cư dân Ai Cập cổ đại sáng tạo ra chữ tượng hình mô phỏng vật thật để nói lên ý nghĩ của mình. Họ thường viết chữ trên giấy Pa-pi-rút hoặc khắc trên đá. Chữ viết phản ánh trình độ tư duy của cư dân Ai Cập, là phương tiện chủ yếu lưu giữ thông tin từ đời này qua đời khác, đồng thời là cơ sở để người đời sau nghiên cứu về văn hoá thời kì cổ đại.”\n(Trích SGK Lịch sử 10, Bộ sách Chân trời sáng tạo, tr.19)',
            pointsPerItem: 0.25,
            totalPoints: 1.0,
            items: [
              { key: 'a', text: 'Hệ thống chữ viết cổ nhất của người Ai Cập được gọi là chữ tượng thanh.', correctAnswer: false, explanation: 'Sai: Chữ cổ nhất của người Ai Cập là chữ tượng hình (hieroglyphics).' },
              { key: 'b', text: 'Nhờ có chữ viết, người Ai Cập cổ đại đã ghi chép và để lại nhiều tư liệu quý giá, tạo cơ sở cho các thế hệ sau khám phá về văn hóa cổ đại.', correctAnswer: true, explanation: 'Đúng: Chữ viết là phương tiện lưu giữ thông tin qua nhiều thế hệ.' },
              { key: 'c', text: 'Chữ viết phản ánh đời sống văn hóa, tinh thần của người Ai Cập cổ đại đồng thời là tiêu chí đánh dấu con người bước vào thời đại văn minh.', correctAnswer: true, explanation: 'Đúng: Sự xuất hiện của chữ viết là một trong những cột mốc đánh dấu văn minh.' },
              { key: 'd', text: 'Văn minh Ai Cập cổ đại đã để lại cho nhân loại nhiều thành tựu rực rỡ và đóng góp cho sự phát triển của nhiều lĩnh vực trong nền văn hóa thế giới.', correctAnswer: true, explanation: 'Đúng: Ai Cập đóng góp lớn về thiên văn, toán học, kiến trúc, y học...' }
            ]
          }
        ]
      },
      {
        id: 'sec-p3-102',
        title: 'PHẦN III. TỰ LUẬN',
        description: 'Gồm 2 câu hỏi (3,0 điểm). Giáo viên chấm điểm theo Hướng dẫn chấm chi tiết.',
        points: 3.0,
        questions: [
          {
            id: 'q10_essay_3',
            type: 'essay',
            questionNumber: 3,
            question: 'Từ những hiểu biết về vai trò của tri thức lịch sử đối với đời sống, em hãy đề xuất ít nhất 02 hành động cụ thể để vận dụng tri thức lịch sử vào cuộc sống hằng ngày của bản thân.',
            maxPoints: 1.0,
            rubric: [
              {
                id: 'r10_3_1',
                criteria: 'Hành động 1 vận dụng tri thức lịch sử vào cuộc sống',
                maxPoints: 0.5,
                sampleAnswer: 'Chủ động tìm đọc sách báo, xem phim tài liệu về lịch sử; tích cực tham quan bảo tàng, di tích lịch sử và có ý thức giữ gìn, bảo vệ di sản văn hóa.'
              },
              {
                id: 'r10_3_2',
                criteria: 'Hành động 2 vận dụng tinh thần lịch sử vào học tập và rèn luyện',
                maxPoints: 0.5,
                sampleAnswer: 'Vận dụng bài học lịch sử về tinh thần đoàn kết, tương thân tương ái, ý chí vượt khó của cha ông vào học tập tập thể, giúp đỡ bạn bè cùng tiến bộ.'
              }
            ],
            officialGuide: 'Nêu ít nhất 02 hành động cụ thể (0.5 điểm mỗi hành động): đọc sách báo, giữ gìn truyền thống gia đình, đoàn kết, chia sẻ thông tin lịch sử chuẩn xác trên mạng xã hội.'
          },
          {
            id: 'q10_essay_4',
            type: 'essay',
            questionNumber: 4,
            question: 'a) Kể tên ít nhất 02 di sản văn hóa phi vật thể của Việt Nam được UNESCO ghi danh (1.0 điểm).\nb) Em hãy nêu ít nhất 02 việc làm cụ thể của bản thân để góp phần bảo vệ và quảng bá các di sản lịch sử - văn hóa tới bạn bè trong và ngoài nước (1.0 điểm).',
            maxPoints: 2.0,
            rubric: [
              {
                id: 'r10_4_1',
                criteria: 'Kể đúng ít nhất 02 di sản văn hóa phi vật thể',
                maxPoints: 1.0,
                sampleAnswer: '1. Nhã nhạc cung đình Huế\n2. Dân ca Quan họ Bắc Ninh (hoặc Không gian văn hóa Cồng chiêng Tây Nguyên, Ca trù, Đờn ca tài tử Nam Bộ, Hát xoan).'
              },
              {
                id: 'r10_4_2',
                criteria: 'Nêu 02 việc làm cụ thể bảo vệ và quảng bá di sản',
                maxPoints: 1.0,
                sampleAnswer: '- Tham gia học hỏi hoặc truyền dạy các làn điệu dân ca truyền thống của địa phương.\n- Làm video ngắn song ngữ (Tiếng Việt - Tiếng Anh) giới thiệu di sản phi vật thể đăng lên các nền tảng số để bạn bè quốc tế thưởng thức.'
              }
            ],
            officialGuide: 'a) Kể ít nhất 02 di sản phi vật thể (1.0đ). b) Nêu ít nhất 02 việc làm cụ thể bảo vệ, quảng bá (1.0đ).'
          }
        ]
      }
    ]
  }
];
