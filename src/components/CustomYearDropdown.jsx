import { useEffect, useState } from 'react';
import { getDecadeRange } from '../utils/helper';
import './CustomYearDropdown.css';
import { FaCaretLeft, FaCaretRight, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const CustomYearDropdown = ({ year, onChangeYear }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [years, setSelectedYears] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setSelectedYear(year ?? currentYear);
  }, []);

  useEffect(() => {
    const years = getDecadeRange(selectedYear);
    setSelectedYears(years);
  }, [selectedYear]);

  const handleClickYear = (year) => {
    console.log(year)
    setSelectedYear(year);
    onChangeYear(year);
  }

  const handleYearAction = (type) => {
    if (type === 'LEFT') {
      const previousYears = [...years].map((year) => year - 10);
      setSelectedYears([...previousYears]);
    } else {
      const nextYears = [...years].map((year) => year + 10);
      setSelectedYears([...nextYears]);
    }
  }

  return(
    <div class="dropdown">
      <button class="dropbtn">{selectedYear ?? 'Select Year'} <FaChevronDown /></button>
      <div class="dropdown-content-container">
        <div className='dropdown-navigations'>
          <span onClick={() => handleYearAction('LEFT')}><FaCaretLeft /></span>
          <span className='year-range-label'>{years[0]} - {years[9]}</span>
          <span onClick={() => handleYearAction('RIGHT')}><FaCaretRight /></span>
        </div>
        <div className='dropdown-content-years'>
          {years?.map((sYear, index) => (<div className={sYear === selectedYear ? 'active' : ''} key={sYear + index + 'year-picker'} onClick={() => handleClickYear(sYear)}>{sYear}</div>))}
        </div>
      </div>
    </div>

  )
}