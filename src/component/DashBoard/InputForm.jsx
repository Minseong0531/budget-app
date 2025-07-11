import { useState } from "react";

function InputForm({ formData, onInputChange, fields }) {
  const [selectedField, setSelectedField] = useState(fields[0].id);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');
  const [type, setType] = useState('out'); 
  const [history, setHistory] = useState([]);

  const handleAdd = () => {

    if (!amount || isNaN(amount)) return;

    const newAmount = parseFloat(amount) || 0;

    
    if (type === 'out') {
      const prevValue = formData[selectedField] || 0;
      onInputChange(selectedField, prevValue + newAmount);
    }

    const newRecord = {
      type,
      field: selectedField,
      label: fields.find(f => f.id === selectedField).label,
      amount: newAmount,
      date,
      memo,
    };
    setHistory(prev => [newRecord, ...prev.slice(0, 4)]);

    
    setAmount('');
    setDate('');
    setMemo('');
  };

  return (
    <div className="space-y-4">
      {/* 날짜 입력 + 입출금 선택 */}
      <div className="flex justify-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1 dark:bg-[#2a2c34] dark:text-white"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-2 py-1 dark:bg-[#2a2c34] dark:text-white"
        >
          <option value="out">출금</option>
          <option value="in">입금</option>
        </select>
      </div>

      {/* 항목 + 금액 */}
      <div className="flex gap-4">
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="border rounded px-2 py-1 dark:bg-[#2a2c34] dark:text-white"
        >
          {fields.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액"
          className="border rounded px-2 py-1 w-full dark:bg-[#2a2c34] dark:text-white"
          min="0"
        />
      </div>

      {/* 메모 + 추가 버튼 */}
      <div className="flex justify-between">
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모"
          className="border rounded px-2 py-1 flex-1 mr-2 dark:bg-[#2a2c34] dark:text-white"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          추가
        </button>
      </div>

      {/* 항목별 합계 표시 */}
      <div className="bg-gray-100 dark:bg-[#2a2c34] p-3 rounded text-sm">
        {fields.map(({ id, label }) => (
          <div key={id} className="flex justify-between">
            <span>{label}</span>
            <span>{formData[id].toLocaleString()}원</span>
          </div>
        ))}
      </div>

      {/* 최근 입력 내역 */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-[#2a2c34] p-3 rounded shadow mt-4 text-sm">
          <h3 className="font-semibold mb-2">최근 입력 내역</h3>
          <ul className="space-y-1">
            {history.map((item, idx) => (
              <li key={idx} className="border-b pb-1">
                <strong>[{item.type === 'out' ? '출금' : '입금'}]</strong>{' '}
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

export default InputForm;
