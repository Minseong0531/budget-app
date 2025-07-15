import { useState, useEffect } from "react";
import Header from "../component/header";
import TodaySummaryCard from "../component/DashBoard/TodaySummaryCard";
import InputForm from "../component/DashBoard/InputForm";
import PieGraph from "../component/DashBoard/PieGraph";
import HistoryList from "../component/DashBoard/HistoryList";

const categories = [
  { id: 'food', label: '식비' },
  { id: 'life', label: '생활비' },
  { id: 'culture', label: '문화' },
  { id: 'etc', label: '기타' },
  { id: 'saving', label: '저축' }
];

function Home() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // 로컬스토리지 저장 & 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions(prev => [tx, ...prev]);
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
  console.log("transactions", transactions)
  return (
    <section>
      <Header />
      <TodaySummaryCard transactions={todayTransactions} />
      <InputForm fields={categories} onAddTransaction={addTransaction} />
      <PieGraph categoryTotals={categoryTotals} categories={categories} />
      <HistoryList transactions={transactions.slice(0, 5)} />
    </section>
  );
}

export default Home;