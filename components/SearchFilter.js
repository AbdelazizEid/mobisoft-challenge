const SearchFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      className="border-2 rounded-md h-8"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
};

export default SearchFilter;
