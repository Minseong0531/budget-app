
const TodaySummaryCard = () => {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center" >Today DashBoard</h2>
        <div className="flex flex-col justify-between mb-4">
          <div className="text-center flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">잔액</p>
            <p className="text-2xl font-bold text-black-500">500,000</p>
          </div>
          <div className="text-center flex flex-row justify-around mt-5">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">수입</p>
                <p className="text-2xl font-bold text-indigo-500">50,000</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">지출</p>
                <p className="text-2xl font-bold text-red-600">20,000</p>
            </div>
          </div>
        </div>
  
        <div className="flex justify-center">
          
        </div>
      </div>
    );
  };
  
  export default TodaySummaryCard;