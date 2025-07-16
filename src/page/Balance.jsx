import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

function Balance() {
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setBalance(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(balance) || balance < 0) {
      setError("유효한 0 이상의 숫자를 입력해주세요.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("로그인이 필요합니다.");
        return;
      }
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        balance: Number(balance),
        createdAt: new Date()
      });
      navigate("/home");
    } catch (err) {
      setError("잔액 저장에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">최초 잔액을 입력해주세요</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="number"
          min="0"
          step="1"
          value={balance}
          onChange={onChange}
          placeholder="잔액을 숫자로 입력"
          className="w-full border px-3 py-2 rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
        >
          저장 및 시작하기
        </button>
      </form>
    </div>
  );
}

export default Balance;