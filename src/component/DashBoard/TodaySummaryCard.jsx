function TodaySummaryCard({ transactions = [], balance = 0 }) {
  const outTotal = transactions
    .filter(tx => tx.type === 'out')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const inTotal = transactions
    .filter(tx => tx.type === 'in')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="bg-white dark:bg-[#1E2028] p-4 rounded shadow flex justify-between">
      <div>
        <p className="text-gray-500">오늘 지출</p>
        <p className="text-xl font-semibold text-red-500">{outTotal.toLocaleString()}원</p>
      </div>
      <div>
        <p className="text-gray-500">오늘 입금</p>
        <p className="text-xl font-semibold text-indigo-500">{inTotal.toLocaleString()}원</p>
      </div>
      <div>
        <p className="text-gray-500">잔액</p>
        <p className="text-xl font-semibold text-green-600">{balance.toLocaleString()}원</p>
      </div>
    </div>
  );
}

export default TodaySummaryCard;