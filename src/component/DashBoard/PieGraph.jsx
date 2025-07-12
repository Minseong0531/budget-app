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

  //파이 차트 실적용 데이터 (비율 계산)
  const [saveData, setSaveData] = useState(getInitialData());

  //항목 전체의 금액
  const total = Object.values(saveData).reduce((sum, val)=> sum + val, 0);
        

      const inputChange = (name, value) => {
        const parsed = parseFloat(value);
      
        setFormData(prev => ({
          ...prev,
          [name]: prev[name] + parsed
        }));
      
        setSaveData(prev => ({
          ...prev,
          [name]: prev[name] + parsed
        }));
      };
    


//차트 데이터 내용
      const pieData = {
        labels: PieFields.map(tag => tag.label),
        datasets: [{
          label: '%',
          data: PieFields.map(data =>
            total === 0 ? 0 : Number(((saveData[data.id]/total)*100).toFixed(1))
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
        <div className="w-30 h-30 mx-auto bg-white dark:bg-[#1E2028] p-4 mt-4">
            <h2 className="text-center text-lg font-semibold mb-4">지출 내용 요약</h2>
            <Pie data={pieData} />
            {
              console.log(saveData)
            }
        </div>
    </div>
    )
}

export default PieGraph;