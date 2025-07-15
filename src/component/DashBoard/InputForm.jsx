import { useState } from "react";

function InputForm({ fields, onAddTransaction }) {
  const [selectedField, setSelectedField] = useState(fields[0].id);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');
  const [type, setType] = useState('out');



  const handleSubmit = () => {
    const newAmount = parseFloat(amount);
    if (isNaN(newAmount) || newAmount <= 0) return alert('금액을 입력하세요');
    if (!date) return alert('날짜를 선택하세요');

    onAddTransaction({
      id: Date.now(),
      type,
      categoryId: selectedField,
      label: fields.find(f => f.id === selectedField).label,
      amount: newAmount,
      date,
      memo
    });

    // 폼 초기화
    setAmount('');
    setDate('');
    setMemo('');
    setType('out');
    setSelectedField(fields[0].id);
  };

  return (
    <div className="bg-white dark:bg-[#1E2028] p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">거래 추가</h2>

      {/* 날짜 + 타입 */}
      <div className="flex gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className="border rounded px-2 py-1 flex-1 dark:bg-[#2a2c34] dark:text-white"
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

      {/* 카테고리 + 금액 */}
      <div className="flex gap-2">
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="border rounded px-2 py-1 dark:bg-[#2a2c34] dark:text-white"
        >
          {fields.map(f => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액"
          className="border rounded px-2 py-1 flex-1 dark:bg-[#2a2c34] dark:text-white"
        />
      </div>

      {/* 메모 */}
      <input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모"
        className="border rounded px-2 py-1 w-full dark:bg-[#2a2c34] dark:text-white"
      />

      {/* 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        추가
      </button>
    </div>
  );
}

export default InputForm;