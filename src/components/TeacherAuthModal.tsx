import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface TeacherAuthModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const TEACHER_PASSCODE = 'taind93';

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  isOpen,
  onSuccess,
  onClose
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === TEACHER_PASSCODE) {
      setError(null);
      setPassword('');
      // Save session in sessionStorage
      sessionStorage.setItem('teacher_auth_token', 'authenticated_' + Date.now());
      onSuccess();
    } else {
      setError('Mật khẩu không chính xác! Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>Bảo Mật Phòng Giáo Viên</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center my-5">
          <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            Xác Thực Quyền Giáo Viên
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            Để truy cập vào phòng chấm thi và quản lý điểm số của học sinh, vui lòng nhập mật khẩu xác thực.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mật khẩu phòng giáo viên
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className={`w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-red-300 focus:ring-red-500 bg-red-50/20'
                    : 'border-stone-300 focus:ring-amber-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2 font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Xác nhận mở phòng</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
