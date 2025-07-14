import { Chart as ChartJS ,ArcElement, Legend, Tooltip } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import InputForm from "./InputForm";

ChartJS.register(ArcElement, Tooltip, Legend);

//지출 항목 데이터 설정
const PieFields = [
        {id:'food', label:'식비'},
        {id:'life', label:'생활비'},
        {id:'culture', label:'문화'},
        {id:'etc', label:'기타'},
        {id:'saving', label:'저축'}
      ];
//초기값
      const getInitialData = () => ({
        food:0, life:0, culture:0, etc:0, saving:0
      })


const PieGraph = () =>{
  // 사용자 입력값
  const [formData, setFormData] = useState(getInitialData());
  // 입력 내용
  const [history, setHistory] = useState([]);
        
  const income = history
    .filter((item) => item.type === "in")
    .reduce((sum, item) => sum + item.amount, 0);
  const expenses = history
    .filter((item) => item.type === "out")
    .reduce((sum, item) => sum + item.amount, 0);
  const total = Object.values(formData).reduce((sum, val) => sum + val, 0);


  const inputChange = (field, amount, type, date, memo) => {
    if (type === "out") {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field] + amount,
    }));
  }
    const newRecord = { field, amount, type, date, memo };
    setHistory((prev) => [newRecord, ...prev.slice(0, 4)]);
  };

//차트 데이터 내용
      const pieData = {
        labels: PieFields.map(tag => tag.label),
        datasets: [{
          label: '%',
          data: PieFields.map(data =>
            total === 0 ? 0 : Number(((formData[data.id]/total)*100).toFixed(1))
          ),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF"
          ],
          hoverOffset: 8,
        }]
      };

    return(
        <div className="max-w-md mx-auto bg-white dark:bg-[#1E2028] p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-center text-xl font-semibold mb-4">가계부 입력</h2>
            <InputForm
                formData={formData}
                onInputChange={inputChange}
                fields={PieFields}
            />
            {/* 최근 입력 내역 */}
            {history.length > 0 && (
                    <div className="bg-white dark:bg-[#2a2c34] mt-6 p-4 rounded shadow text-sm">
                      <h3 className="font-semibold mb-2">최근 입력 내역</h3>
                      <ul className="space-y-1">
                        {history.slice(0, 5).map((item, idx) => (
                          <li key={idx} className="border-b pb-1">
                            <strong>[{item.type === "out" ? "출금" : "입금"}]</strong>{" "}
                            {item.date && `${item.date} | `}
                            {PieFields.find((f) => f.id === item.field)?.label || item.field} -{" "}
                            {item.amount.toLocaleString()}원
                            {item.memo && ` | 메모: ${item.memo}`}
                          </li>
                        ))}
                      </ul>
                    </div>
            )}
        <div className="w-30 h-30 mx-auto bg-white dark:bg-[#1E2028] p-4 mt-4">
            <h2 className="text-center text-lg font-semibold mb-4">지출 내용 요약</h2>
            <Pie data={pieData} />
        </div>
    </div>
    )
}

export default PieGraph;