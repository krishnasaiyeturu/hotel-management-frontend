import axios from 'axios';
import { API } from '../../../backend';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YearSelector from '../../sharedComponents/YearSelector';
import {
  generateDates,
  generateMonthNames,
  getRandomNumber,
  OCCUPANCY_STATUSES,
  OCCUPANCY_STATUS_LABELS,
  OCCUPANCY_STATUS_STYLES
} from "../../../utils/helper";

import './FrontDesk.css';
import { PulseLoader } from 'react-spinners';

const FrontDesk = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [currentPerPage, setPerPage] = useState(6);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const activeHotel = useSelector((state) => state.admin.hotels.activeHotel);
  const [currentStatus, setCurrentStatus] = useState(OCCUPANCY_STATUSES.BOOKINGS);
  const [months, setMonths] = useState([]);
  const [days, setDays] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([{ roomNumber: null, bookings: [] }]);
  const spansRef = useRef({});
  const randomColors = ['rgb(45 212 191)', "rgb(134 25 143)", "rgb(248 113 113)", "rgb(250 204 21)", "rgb(96 165 250)", "rgb(147 51 234)"];
  const randomBgColors = ['rgba(45, 212, 191, 0.1)', "rgba(134, 25, 143, 0.1)", "rgba(248, 113, 113, 0.1)", "rgba(250, 204, 21, 0.1)", "rgba(96, 165, 250, 0.1)", "rgba(147, 51, 234, 0.1)"];
  const perPageOptions = [6, 12, 18, 24, 30];


  useLayoutEffect(() => {
    console.log(spansRef, 'CHANGING SPANS_REF')
  }, [spansRef.current])

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setMonths(generateMonthNames());
    setDays(generateDates(currentMonth, currentYear));
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('type', currentStatus);
    navigate({
      pathname: location.pathname,
      search: `?${queryParams.toString()}`,
    }, { replace: true });
  }, []);

  useEffect(() => {
    fetchBookingsData();
  }, [selectedMonth, selectedYear, currentStatus, currentPage, currentPerPage]);

  const fetchBookingsData = async () => {
    try {
      setIsLoading(true);
      const query = {
        hotelId: activeHotel._id,
        year: selectedYear,
        month: selectedMonth,
        status: OCCUPANCY_STATUS_LABELS[currentStatus],
      };
      const queryString = new URLSearchParams(query).toString();
      const url = `${API}bookings/?${queryString}`;
      const response = await axios.get(url);
      if (response?.data?.length) {
        const data = sanitizeBookingData(response.data);
        console.log(data, 'DATA')
        setBookingDetails([...data]);
        setIsLoading(false);
      } else {
        setBookingDetails([]);
        setIsLoading(false);
      }
    } catch (error) {
      setBookingDetails([]);
      setIsLoading(false);
      console.error("Error fetching countries:", error);
    }
  };

  const sanitizeBookingData = (bookingData) => {
    return bookingData.map((room) => {
      return {
        ...room,
        bookings: room.bookings.map((bookingData) => {
          const checkout = bookingData.checkin > bookingData.checkout
            ? days[days.length - 1]
            : bookingData.checkout;
          const randomNumber = getRandomNumber();
          return {
            ...bookingData,
            checkin: bookingData.checkin + (currentStatus === OCCUPANCY_STATUSES.CHECK_IN ? 0 : 1),
            color: randomColors[randomNumber],
            backgroundColor: randomBgColors[randomNumber],
            checkout: checkout + (currentStatus === OCCUPANCY_STATUSES.CHECK_IN ? 0 : 1),
          };
        })
      }
    })
  }

  const onClickMonth = (monthIndex) => {
    setSelectedMonth(monthIndex + 1);
    setDays(generateDates(monthIndex + 1, selectedYear));
  }

  const onClickStatus = (name) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('type', name);
    navigate({
      pathname: location.pathname,
      search: `?${queryParams.toString()}`,
    }, { replace: true });
    setCurrentStatus(name);
  }

  const handlePageClick = ($event) => {
    setCurrentPage($event.selected);
  }


  return (
    <div className="date-container bg-white">
      <div className="year-container">
        <div className="me-5">{OCCUPANCY_STATUS_STYLES.map((status, index) => (<button className={`${status.className} ${currentStatus === status.name ? status.activeColor : ''}`} key={status.name + index} onClick={() => onClickStatus(status.name)}>{status.name}</button>))}</div>
        <label><b>Select Year: </b>&nbsp;&nbsp;</label>
        <YearSelector year={selectedYear} onChangeYear={($event) => setSelectedYear($event)} />
      </div>
      <div className="months-container">
        {months?.map((month, index) => (<div className={`month-content ${index + 1 === selectedMonth ? 'active' : ''}`} key={month + index} onClick={() => onClickMonth(index)}>{month}</div>))}
      </div>
      {/* DAYS-CONTAINER */}
      {<div className="days-container">
        <table>
          <thead>
            <tr>
              <th className="room-header"></th>
              {days?.map((day, index) => (<th key={day + index + 'th'}>{day}</th>))}
            </tr>
          </thead>
          <tbody>
            {!loading && bookingDetails?.length ? (bookingDetails
              .slice(
                Number(currentPage) * currentPerPage,
                Number(currentPage) * currentPerPage + currentPerPage
              )
              .map((room, roomIndex) => {
                return (
                  <tr key={room.id}>
                    {currentStatus === OCCUPANCY_STATUSES.CHECK_IN && room.roomNumber && (
                      <td>{room.roomNumber}</td>
                    )}
                    {days?.map((day, index) => {
                      const bookingsForRoom = room.bookings.filter(
                        (booking) => booking.checkin <= day && booking.checkout >= day
                      );

                      const currentBooking = bookingsForRoom.length > 0 ? bookingsForRoom[0] : null;

                      const isBookingStart = currentBooking && currentBooking.checkin === day;


                      return (
                        <td
                          key={day + index + "td"}
                          className={index === days.length - 1 ? "last-child" : ""}
                          id={`${selectedYear}-${selectedMonth}-${roomIndex}-${index}`}
                          style={{
                            position: "relative",
                          }}
                        >
                          {isBookingStart && currentBooking && (
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                fontSize: "14px",
                                padding: "3px 5px",
                                marginTop: '7px',
                                width: `calc(${(currentBooking.checkout - currentBooking.checkin + 1) * 100}% + ${(currentBooking.checkout - currentBooking.checkin + 1) * 1}px)`, // Adjust width based on days
                                backgroundColor: currentBooking.backgroundColor,
                                color: currentBooking.color,
                                zIndex: 1,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              title={currentBooking.name}
                            >
                              {currentBooking.name}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })) : <tr><td colSpan={days.length}><div className='booking-loader'>{loading ? <PulseLoader size={10} color={"#9fa1a4"} /> : <span>No Booking Data.</span>}</div></td></tr>}
          </tbody>
        </table>
      </div>}
      <div className="pagination-container">
        {(bookingDetails?.length) / currentPerPage > 1 ? (<select className="per-page" value={currentPerPage} onChange={($event) => setPerPage($event.target.value)}>
          {perPageOptions.map((option, index) => (<option key={option + index} value={option}>{option}</option>))}
        </select>) : null}
        {(bookingDetails?.length) / currentPerPage > 1 && (<ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={(bookingDetails?.length) / currentPerPage}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          forcePage={currentPage}
        />)}
        
      </div>
    </div>
  )
};

export default FrontDesk;