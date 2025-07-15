import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieGraph({ categoryTotals, categories }) {
  const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const data = {
    labels: categories.map(c => c.label),
    datasets: [{
      data: categories.map(c => total === 0 ? 0 : ((categoryTotals[c.id] / total) * 100).toFixed(1)),
      backgroundColor: ["#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF"
                      ],
      hoverOffset: 8
    }]
  };

  return (
    <div className="bg-white dark:bg-[#1E2028] p-4 rounded shadow">
      <h2 className="text-center text-lg font-semibold mb-4">지출 비율</h2>
      <Pie data={data} />
    </div>
  );
}

export default PieGraph;