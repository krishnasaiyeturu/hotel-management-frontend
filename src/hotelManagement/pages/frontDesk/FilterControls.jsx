import PropTypes from "prop-types";

const FilterControls = (props) => {
  const { setFilter } = props;
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
      <button
        className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded"
        onClick={() => setFilter("due-in")}
      >
        Due In
      </button>
      <button
        className="bg-green-100 text-green-700 px-4 py-2 rounded"
        onClick={() => setFilter("checked-in")}
      >
        Checked In
      </button>
      <button
        className="bg-blue-100 text-blue-700 px-4 py-2 rounded"
        onClick={() => setFilter("checked-out")}
      >
        Checked Out
      </button>
      <button
        className="bg-red-100 text-red-700 px-4 py-2 rounded"
        onClick={() => setFilter("due-out")}
      >
        Due Out
      </button>
    </div>
  );
};

// PropTypes validation
FilterControls.propTypes = {
  setFilter: PropTypes.func.isRequired, // Ensure setFilter is a function and required
};


export default FilterControls;
