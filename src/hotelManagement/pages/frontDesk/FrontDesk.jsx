import axios from 'axios';
import toast from 'react-hot-toast';
import { API } from '../../../backend';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import { PulseLoader } from 'react-spinners';
import { useLocation, useNavigate } from "react-router-dom";
import YearSelector from '../../sharedComponents/YearSelector';
import {
  generateDates,
  generateMonthNames,
  getRandomNumber,
  OCCUPANCY_STATUSES,
  OCCUPANCY_STATUS_LABELS,
  OCCUPANCY_STATUS_STYLES,
  getDaysInMonth
} from "../../../utils/helper";

import './FrontDesk.css';
import moment from 'moment/moment';

const FrontDesk = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activeMonth, setActiveMonth] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const selectedHotel = useSelector((state) => state.admin.hotels.activeHotel);
  const [occupancyStatus, setOccupancyStatus] = useState(OCCUPANCY_STATUSES.BOOKINGS);
  const [monthOptions, setMonthOptions] = useState([]);
  const [dayOptions, setDayOptions] = useState([]);
  const [roomBookings, setRoomBookings] = useState([{ roomNumber: null, bookings: [] }]);
  const colorPalette = ['rgb(45 212 191)', "rgb(134 25 143)", "rgb(248 113 113)", "rgb(250 204 21)", "rgb(96 165 250)", "rgb(147 51 234)"];
  const backgroundColorPalette = ['rgba(45, 212, 191, 0.1)', "rgba(134, 25, 143, 0.1)", "rgba(248, 113, 113, 0.1)", "rgba(250, 204, 21, 0.1)", "rgba(96, 165, 250, 0.1)", "rgba(147, 51, 234, 0.1)"];
  const perPageOptions = [6, 12, 18, 24, 30];

  useEffect(() => {
    // Initialize date, month, year, and URL parameters on mount
    const currentDate = new Date();
    const initialMonth = currentDate.getMonth() + 1;
    const initialYear = currentDate.getFullYear();
    setActiveYear(initialYear);
    setActiveMonth(initialMonth);
    setMonthOptions(generateMonthNames());
    setDayOptions(generateDates(initialMonth, initialYear));


    const queryParams = new URLSearchParams(location.search);
    queryParams.set('type', occupancyStatus);
    navigate({
      pathname: location.pathname,
      search: `?${queryParams.toString()}`,
    }, { replace: true });
  }, []);

  useEffect(() => {
    // Fetch bookings when hotel, month, year, and occupancy status change
    if (selectedHotel ?._id && activeMonth && activeYear && occupancyStatus) {
      fetchBookingsData();
    }
  }, [activeMonth, activeYear, occupancyStatus, currentPageIndex, itemsPerPage]);

  const fetchBookingsData = async () => {
    try {
      setIsLoading(true);
      const query = {
        hotelId: selectedHotel._id,
        year: activeYear,
        month: activeMonth,
        status: OCCUPANCY_STATUS_LABELS[occupancyStatus],
      };
      const queryString = new URLSearchParams(query).toString();
      const url = `${API}bookings/?${queryString}`;
      const response = await axios.get(url);
      
      if (response?.data?.length) {
        const sanitizedData = sanitizeBookingData(response.data);
        setRoomBookings([...sanitizedData]);
      } else {
        setRoomBookings([]);
      }
    } catch (error) {
      setRoomBookings([]); // Clear bookings if there's an error
      toast.error('Failed to fetch bookings data');
    } finally {
      setIsLoading(false);
    }
  };

  const sanitizeBookingData = (bookingData) => {
    return bookingData.map((room) => {
      return {
        ...room,
        bookings: room.bookings.map((bookingData) => {
          const label = `${bookingData.name} (${moment(bookingData.checkin).format('DD-MM-YYYY')} - ${moment(bookingData.checkout).format('DD-MM-YYYY')})`;
          const { checkin, checkout} = getDaysInMonth(bookingData.checkin, bookingData.checkout, activeMonth);
          const randomNumber = getRandomNumber();
          return {
            ...bookingData,
            label,
            checkin: checkin + (occupancyStatus === OCCUPANCY_STATUSES.CHECK_IN ? 0 : 1),
            color: colorPalette[randomNumber],
            backgroundColor: backgroundColorPalette[randomNumber],
            checkout: checkout + (occupancyStatus === OCCUPANCY_STATUSES.CHECK_IN ? 0 : 1),
          };
        })
      }
    })
  }

  const handleMonthClick = (monthIndex) => {
    // Update month and regenerate day options
    setActiveMonth(monthIndex + 1);
    setDayOptions(generateDates(monthIndex + 1, activeYear));
  };

  const handleStatusClick = (status) => {
    // Update URL and status when user clicks a status option
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('type', status);
    navigate({
      pathname: location.pathname,
      search: `?${queryParams.toString()}`,
    }, { replace: true });
    setOccupancyStatus(status);
  };

  const handlePageClick = ($event) => {
    // Update current page index when pagination changes
    setCurrentPageIndex($event.selected);
  }

  return (
    <div className="date-container h-[85vh] bg-white">
      {/* Status and Year Selection */}
      <div className="year-container">
        <div className="me-5">
          {OCCUPANCY_STATUS_STYLES.map((status, index) => (
            <button
              className={`${status.className} ${
                occupancyStatus === status.name ? status.activeColor : ''
              }`}
              key={status.name + index}
              onClick={() => handleStatusClick(status.name)}
            >
              {status.name}
            </button>
          ))}
        </div>
        <label><b>Select Year: </b>&nbsp;&nbsp;</label>
        <YearSelector
          initialYear={activeYear}
          onYearChange={($event) => setActiveYear($event)}
        />
      </div>
  
      {/* Month Options */}
      <div className="month-options-container">
        {monthOptions?.map((month, index) => (
          <div
            className={`month-content ${index + 1 === activeMonth ? 'active' : ''}`}
            key={month + index}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </div>
        ))}
      </div>
  
      {/* Booking Days Table */}
      <div className="days-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {dayOptions?.map((day, index) => (
                <th key={day + index + 'th'}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading && roomBookings?.length ? (
              roomBookings
                .slice(
                  Number(currentPageIndex) * itemsPerPage,
                  Number(currentPageIndex) * itemsPerPage + itemsPerPage
                )
                .map((room, roomIndex) => (
                  <tr key={room.id}>
                    {occupancyStatus === OCCUPANCY_STATUSES.CHECK_IN && room.roomNumber && (
                      <td>{room.roomNumber}</td>
                    )}
                    {dayOptions?.map((day, index) => {
                      const bookingsForRoom = room.bookings.filter(
                        (booking) => booking.checkin <= day && booking.checkout >= day
                      );
  
                      const currentBooking = bookingsForRoom.length > 0 ? bookingsForRoom[0] : null;
                      const isBookingStart = currentBooking && currentBooking.checkin === day;
  
                      return (
                        <td
                          key={day + index + 'td'}
                          className={index === dayOptions.length - 1 ? 'last-child' : ''}
                          style={{ position: 'relative' }}
                        >
                          {isBookingStart && currentBooking && (
                            <div
                              className='bookings-tag'
                              style={{
                                width: `calc(${
                                  (currentBooking.checkout - currentBooking.checkin + 1) * 100
                                }% + ${(currentBooking.checkout - currentBooking.checkin + 1) * 1}px)`,
                                backgroundColor: currentBooking.backgroundColor,
                                color: currentBooking.color,
                              }}
                              title={currentBooking.label}
                            >
                              {currentBooking.label}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={dayOptions.length}>
                  <div className="booking-loader">
                    {isLoading ? (
                      <PulseLoader size={10} color="#9fa1a4" />
                    ) : (
                      <span>No Booking Data.</span>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Pagination and Per Page Options */}
      <div className="pagination-container">
        {roomBookings?.length / itemsPerPage > 1 && (
          <select
            className="per-page"
            value={itemsPerPage}
            onChange={($event) => setItemsPerPage($event.target.value)}
          >
            {perPageOptions.map((option, index) => (
              <option key={option + index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
  
        {roomBookings?.length / itemsPerPage > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(roomBookings?.length / itemsPerPage)}
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
            forcePage={currentPageIndex}
          />
        )}
      </div>
    </div>
  );  
};

export default FrontDesk;