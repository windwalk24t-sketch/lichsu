import React, { useState } from 'react';
import { Share2, Copy, Check, QrCode, X, Laptop, Smartphone, ExternalLink } from 'lucide-react';

interface ShareExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareExamModal: React.FC<ShareExamModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use current URL
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Share2 className="w-4 h-4" />
            <span>Chia Sẻ Phòng Thi Cho Học Sinh &amp; Máy Khác</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center my-4">
          <h3 className="text-lg font-bold text-stone-900">
            Hướng Dẫn Làm Bài &amp; Chấm Trên Các Máy Khác Nhau
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Chỉ cần gửi đường link hoặc chiếu mã QR này, học sinh và giáo viên ở bất kỳ máy nào đều truy cập được chung một hệ thống.
          </p>
        </div>

        {/* QR Code and Copy Link Area */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center gap-4 mb-5">
          <div className="bg-white p-2 rounded-lg border border-stone-200 shadow-xs shrink-0">
            <img
              src={qrCodeUrl}
              alt="Mã QR phòng thi"
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="flex-1 w-full space-y-2">
            <label className="block text-xs font-semibold text-stone-600">
              Đường link phòng thi trực tuyến:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg text-stone-700 select-all"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>
            <p className="text-[11px] text-stone-400">
              💡 Học sinh dùng điện thoại có thể quét mã QR để vào thi ngay mà không cần gõ link.
            </p>
          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="space-y-3 mb-5 text-xs text-stone-700 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
          <div className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
            Quy trình làm bài &amp; chấm thi đa thiết bị:
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <strong className="text-stone-900">Máy của Học sinh:</strong> Mở đường link trên (hoặc quét mã QR), chọn đề thi Lịch sử 6 hoặc Lịch sử 10, làm bài và nhấn <strong>"Nộp bài thi"</strong>.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <strong className="text-stone-900">Máy của Giáo viên:</strong> Mở đường link trên từ máy tính, laptop hoặc iPad khác, nhấn vào <strong>"Phòng Giáo viên (Chấm thi)"</strong> và nhập mật khẩu <code className="bg-amber-200 text-amber-950 px-1 py-0.5 rounded font-mono font-bold">taind93</code>.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <strong className="text-stone-900">Chấm bài thời gian thực:</strong> Tất cả bài nộp của học sinh sẽ tự động hiển thị trên máy giáo viên. Giáo viên chỉ cần nhấn <strong>"Chấm bài"</strong> hoặc <strong>"Xem bài"</strong>.
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-stone-900 hover:bg-stone-800 text-white transition-colors"
          >
            Đã hiểu, đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
