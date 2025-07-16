import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuth } from "./AuthContext";

function Header(){
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

    return(
<header className="bg-white">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4">
    <a className="block text-teal-600" href="#">
      <span className="sr-only">Home</span>
      <img
              alt="TodayBudget"
              src="/Logo.svg"
              className="mx-auto h-10 w-auto"
            />
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
        {user ? <p>{user.email.split('@')[0]}님 어서오세요</p> : <Link to='/signIn'>로그인 해주세요</Link>}
      {user && (
        <button onClick={handleLogout}>
          로그아웃
        </button>
      )}
        </div>

        
      </div>
    </div>
  </div>
</header>
    )
}
export default Header;