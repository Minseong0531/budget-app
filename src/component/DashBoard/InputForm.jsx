import { useEffect, useState } from "react";

function InputForm({ formData, onInputChange, fields }) {

/*   const [charts, setCharts] = useState([]);

  const getChart = () =>{
    const storedCharts = localStorage.getItem('charts')
    if(storedCharts){
      setCharts(JSON.parse(storedCharts));
    }
  }
  
  useEffect(()=> {
    getChart();
  },[]);
  
  const saveLocalCharts = (chart) =>{
    const newCharts = [...charts, {text: chart, completed:false}];
    setCharts(newCharts);
    localStorage.setItem('charts',JSON.stringify(newCharts));
  }
  const removeLocalCharts = (chartToRemove) =>{
    const newCharts = charts.filter(chart => chart.text !== chartToRemove.text);
    setCharts( newCharts );
    localStorage.setItem('charts',JSON.stringify(newCharts));
  } */
  


  // 카테고리 선택 = 초기값 첫번째
  const [selectedField, setSelectedField] = useState(fields[0].id);

  //입력값
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');

  //입출금
  const [type, setType] = useState('out'); 


  //추가 버튼 클릭시 실행
  const handleAdd = () => {
    const newAmount = parseFloat(amount);

    if (isNaN(newAmount) || !selectedField) return;
      onInputChange(selectedField, newAmount, type, date, memo);

    //입력 이후 필드 초기화
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
    </div>
  );
}

export default InputForm;
