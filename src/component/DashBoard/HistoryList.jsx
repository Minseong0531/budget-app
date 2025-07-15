import { useState } from "react";

function HistoryList({ transactions}) {

    const [filterMonth, setFilterMonth] = useState(""); // YYYY-MM
    const [filterDay, setFilterDay] = useState(""); // YYYY-MM-DD

    const filteredHistory = transactions.filter((item) => {
      if (filterDay) return item.date === filterDay;
      if (filterMonth) return item.date.startsWith(filterMonth);
      return true;
    });

    if (transactions.length === 0) return null;
  


    return (
      <div className="bg-white dark:bg-[#1E2028] p-4 rounded shadow">
        <div className="flex justify-between items-center mt-4 gap-2 text-sm">
        <div className="flex flex-col">
          <label>월별 필터</label>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => {
              setFilterMonth(e.target.value);
              setFilterDay(""); // 일 단위 초기화
            }}
            className="border rounded px-2 py-1 dark:bg-[#2a2c34] dark:text-white"
          />
        </div>

        <div className="flex flex-col">
          <label>일별 필터</label>
          <input
            type="date"
            value={filterDay}
            onChange={(e) => {
              setFilterDay(e.target.value);
              setFilterMonth(""); // 월 단위 초기화
            }}
            className="border rounded px-2 py-1 dark:bg-[#2a2c34] dark:text-white"
          />
        </div>

        <button
          onClick={() => {
            setFilterMonth("");
            setFilterDay("");
          }}
          className="mt-4 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
        >
          초기화
        </button>
      </div>

      {/* 필터된 입력 내역 */}
      {filteredHistory.length > 0 && (
        <div className="bg-white dark:bg-[#2a2c34] p-3 rounded shadow mt-4 text-sm">
          <h3 className="font-semibold mb-2">입력 내역</h3>
          <ul className="space-y-1">
            {filteredHistory.map((item, idx) => (
              <li key={idx} className="border-b pb-1">
                <strong>[{item.type === "out" ? "출금" : "입금"}]</strong>{" "}
                {item.date && `${item.date} | `}
                {item.label} - {item.amount.toLocaleString()}원
                {item.memo && ` | 메모: ${item.memo}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      </div>
    );
  }
  
  export default HistoryList;