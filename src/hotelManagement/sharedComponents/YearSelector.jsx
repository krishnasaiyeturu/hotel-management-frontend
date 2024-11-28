import { useEffect, useState } from 'react';
import { FaCaretLeft, FaCaretRight, FaChevronDown } from 'react-icons/fa';
import { getDecadeRange } from '../../utils/helper';

const YearSelector = ({ initialYear, onYearChange }) => {
  const [currentYear, setCurrentYear] = useState(null);
  const [yearOptions, setYearOptions] = useState([]);

  // Set the current year based on props or the current date
  useEffect(() => {
    const currentDate = new Date();
    const defaultYear = initialYear ?? currentDate.getFullYear();
    setCurrentYear(defaultYear);
  }, [initialYear]);

  // Update the decade range based on the selected year
  useEffect(() => {
    const decadeYears = getDecadeRange(currentYear);
    setYearOptions(decadeYears);
  }, [currentYear]);

  const handleYearClick = (year) => {
    setCurrentYear(year);
    onYearChange(year);
  };

  const handleDecadeNavigation = (direction) => {
    const updatedYears = direction === 'PREV'
      ? yearOptions.map((year) => year - 10)
      : yearOptions.map((year) => year + 10);
    setYearOptions(updatedYears);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle">
        {currentYear ?? 'Select Year'} <FaChevronDown />
      </button>
      <div className="dropdown-menu">
        <div className="dropdown-header">
          <span onClick={() => handleDecadeNavigation('PREV')}>
            <FaCaretLeft />
          </span>
          <span className="year-range">
            {yearOptions[0]} - {yearOptions[9]}
          </span>
          <span onClick={() => handleDecadeNavigation('NEXT')}>
            <FaCaretRight />
          </span>
        </div>
        <div className="dropdown-years">
          {yearOptions?.map((year, index) => (
            <div
              className={year === currentYear ? 'active' : ''}
              key={`year-option-${index}`}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSelector;
