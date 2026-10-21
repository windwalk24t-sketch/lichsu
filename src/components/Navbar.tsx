import React from 'react';
import { BookOpen, Award, BarChart3, Search, RefreshCw, Lock, Unlock, LogOut, Share2 } from 'lucide-react';

interface NavbarProps {
  currentTab: 'exam' | 'teacher' | 'stats' | 'lookup';
  onSelectTab: (tab: 'exam' | 'teacher' | 'stats' | 'lookup') => void;
  pendingGradingCount: number;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
  isTeacherAuthenticated?: boolean;
  onLogoutTeacher?: () => void;
  onOpenShareModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  pendingGradingCount,
  onRefreshData,
  isRefreshing = false,
  isTeacherAuthenticated = false,
  onLogoutTeacher,
  onOpenShareModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Brand Wordmark */}
          <div 
            onClick={() => onSelectTab('exam')}
            className="cursor-pointer flex items-center gap-3 shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-inner">
              <BookOpen className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
                Sử Học Việt
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-stone-400 font-normal">
                Khảo thí & Chấm thi Đa Thiết Bị
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <button
              onClick={() => onSelectTab('exam')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                currentTab === 'exam'
                  ? 'bg-amber-600/20 text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Học sinh làm bài</span>
            </button>

            <button
              onClick={() => onSelectTab('teacher')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 relative ${
                currentTab === 'teacher'
                  ? 'bg-amber-600/20 text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Phòng Giáo viên (Chấm thi)</span>
              {!isTeacherAuthenticated && (
                <Lock className="w-3.5 h-3.5 text-stone-400" />
              )}
              {pendingGradingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-stone-950 text-xs font-bold rounded-full">
                  {pendingGradingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('stats')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                currentTab === 'stats'
                  ? 'bg-amber-600/20 text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Thống kê điểm & Báo cáo</span>
            </button>

            <button
              onClick={() => onSelectTab('lookup')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                currentTab === 'lookup'
                  ? 'bg-amber-600/20 text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Tra cứu kết quả</span>
            </button>
          </nav>

          {/* Sync / Refresh Button & Lock status */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                title="Chia sẻ link & mã QR cho học sinh / máy khác"
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Chia sẻ link thi</span>
              </button>
            )}

            {onRefreshData && (
              <button
                onClick={onRefreshData}
                disabled={isRefreshing}
                title="Đồng bộ dữ liệu đa thiết bị"
                className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            )}

            {isTeacherAuthenticated && onLogoutTeacher && (
              <button
                onClick={onLogoutTeacher}
                title="Khóa quyền giáo viên / Đăng xuất"
                className="px-2.5 py-1.5 text-xs font-medium text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1 border border-stone-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Khóa phòng GV</span>
              </button>
            )}

            <button
              onClick={() => onSelectTab(currentTab === 'teacher' ? 'exam' : 'teacher')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 bg-amber-600 hover:bg-amber-500 text-stone-950 flex items-center gap-1.5"
            >
              {!isTeacherAuthenticated && currentTab !== 'teacher' && (
                <Lock className="w-3 h-3" />
              )}
              <span>{currentTab === 'teacher' ? 'Chế độ Học sinh' : 'Chấm thi Giáo viên'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-800 text-xs">
          <button
            onClick={() => onSelectTab('exam')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'exam' ? 'text-amber-400 font-medium' : 'text-stone-400'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Làm bài</span>
          </button>
          <button
            onClick={() => onSelectTab('teacher')}
            className={`flex flex-col items-center gap-1 py-1 px-2 relative ${currentTab === 'teacher' ? 'text-amber-400 font-medium' : 'text-stone-400'}`}
          >
            <Award className="w-4 h-4" />
            <span className="flex items-center gap-0.5">
              <span>Chấm thi</span>
              {!isTeacherAuthenticated && <Lock className="w-2.5 h-2.5" />}
            </span>
          </button>
          <button
            onClick={() => onSelectTab('stats')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'stats' ? 'text-amber-400 font-medium' : 'text-stone-400'}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Thống kê</span>
          </button>
          <button
            onClick={() => onSelectTab('lookup')}
            className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'lookup' ? 'text-amber-400 font-medium' : 'text-stone-400'}`}
          >
            <Search className="w-4 h-4" />
            <span>Tra cứu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
