import { useState, useEffect } from "react";
import Header from "../component/header";
import TodaySummaryCard from "../component/DashBoard/TodaySummaryCard";
import InputForm from "../component/DashBoard/InputForm";
import PieGraph from "../component/DashBoard/PieGraph";
import HistoryList from "../component/DashBoard/HistoryList";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
const categories = [
  { id: 'food', label: '식비' },
  { id: 'life', label: '생활비' },
  { id: 'culture', label: '문화' },
  { id: 'etc', label: '기타' },
  { id: 'saving', label: '저축' }
];

function Home() {
  const [user, setUser] = useState(auth.currentUser);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    const storageKey = `transactions_${user.uid}`;
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [errorBalance, setErrorBalance] = useState('');


  // 로컬스토리지 저장 & 불러오기
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`transactions_${user.uid}`);
    setTransactions(saved ? JSON.parse(saved) : []);
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(transactions));
    }
  }, [transactions, user]);


  // Firebase에서 잔액 불러오기
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setErrorBalance("로그인이 필요합니다.");
          setLoadingBalance(false);
          return;
        }
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setBalance(userDocSnap.data().balance || 0);
        } else {
          setErrorBalance("잔액 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error(err);
        setErrorBalance("잔액 불러오기 실패");
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
  }, []);



  const addTransaction = async (tx) => {
    setTransactions(prev => [tx, ...prev]);

    setBalance(prevBalance => {
      let newBalance = prevBalance;
      if (tx.type === 'in') {
        newBalance += tx.amount;
      } else if (tx.type === 'out') {
        newBalance -= tx.amount;
      }

      //Firestore에 잔액 업데이트
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        setDoc(userDocRef, { balance: newBalance }, { merge: true })
          .catch(err => console.error("잔액 업데이트 실패:", err));
      }

      return newBalance;
    });
  };

  // 카테고리별 합계 계산
  const categoryTotals = categories.reduce((acc, c) => {
    acc[c.id] = transactions
      .filter(tx => tx.type === 'out' && tx.categoryId === c.id)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return acc;
  }, {});

  // 오늘 날짜의 트랜잭션
  const today = new Date().toISOString().slice(0, 10);
  const todayTransactions = transactions.filter(tx => tx.date === today);
  return (
    <section>
      <Header />
      <TodaySummaryCard transactions={todayTransactions} balance={balance}/>
      <InputForm fields={categories} onAddTransaction={addTransaction} />
      <PieGraph categoryTotals={categoryTotals} categories={categories} />
      <HistoryList transactions={transactions.slice(0, 5)} />
    </section>
  );
}

export default Home;