function LoadingScreen() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-indigo-600 text-white">
        <p className="text-3xl font-bold mb-4">TodayBudget</p>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <div className="text-3xl font-bold mb-4">환영합니다.</div>
      </div>
    );
  }

export default LoadingScreen;