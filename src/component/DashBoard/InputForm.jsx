function InputForm({ formData, onInputChange, onSubmit, fields}) {
    console.log(fields)
    return(
        <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
    {
    fields.map(({ id, label }) => (
        <div key={id} className="flex justify-between items-center">
          <label className="font-medium">
            {label}
          </label>
          <input
            id={id}
            type="number"
            min="10"
            step="100"
            value={formData[id]}
            onChange={(e) => onInputChange(id, e.target.value)}
            className="w-24 p-1 border rounded text-right"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        차트 업데이트
      </button>
    </form>
  );
}

export default InputForm;