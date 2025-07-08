import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">환영합니다!</h1>
      <p className="text-gray-600 mb-8">TodayBudget에 오신 것을 환영해요.</p>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link to="/signin" className="bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:bg-indigo-700">
          기존 회원이신가요?
        </Link>
        <Link to="/signup" className="border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50">
          처음 오셨나요?
        </Link>
      </div>
    </div>
  );
}