import { Chart as ChartJS ,ArcElement, Legend, Tooltip } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import InputForm from "./InputForm";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = () =>{
    const PieFields = [
        {id:'food', label:'식비', unit:'food'},
        {id:'life', label:'생활비', unit:'life'},
        {id:'culture', label:'문화', unit:'culture'},
        {id:'etc', label:'기타', unit:'etc'},
        {id:'saving', label:'저축', unit:'saving'}
      ];
      const [formData, setFormData] = useState({
        food:0, life:0, culture:0, etc:0, saving:0
      });
      const [saveData, setSaveData] = useState({
        food:0, life:0, culture:0, etc:0, saving:0
      });
      const [ chartKey, setChartKey ] = useState(0);

      const total =
        saveData.food +
        saveData.life +
        saveData.culture +
        saveData.etc +
        saveData.saving;

      const inputChange = (name, value) => {
        const parsed = parseFloat(value) || 0;
      
        setFormData(prev => ({
          ...prev,
          [name]: (prev[name] || 0) + parsed
        }));
      
        setSaveData(prev => ({
          ...prev,
          [name]: (prev[name] || 0) + parsed
        }));
      };
    



      const data = {
        labels: [
        "식비", "생활비", "문화/교육비", "기타", "저축"
        ],
        datasets: [{
          label: '%',
          data: total === 0 ? [0, 0, 0, 0, 0] : [
            Number(((saveData.food / total) * 100).toFixed(1)),
            Number(((saveData.life / total) * 100).toFixed(1)),
            Number(((saveData.culture / total) * 100).toFixed(1)),
            Number(((saveData.etc / total) * 100).toFixed(1)),
            Number(((saveData.saving / total) * 100).toFixed(1)),
          ],
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
            <Pie key={chartKey} data={data} />
        </div>
    </div>
    )
}

export default PieGraph;