import  { useState } from "react";
import BookingGrid from "./BookingGrid";
import FilterControls from "./FilterControls";
// import DatePicker from "react-datepicker"; // For the date picker
import frontDeskBookingData from "../../modules/mockData";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FrontDesk = () => {
  const [filter, setFilter] = useState("");

  // Filter bookings based on selected status
  const filteredBookings = filter
    ? frontDeskBookingData.filter((booking) => booking.status === filter)
    : frontDeskBookingData;

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <FilterControls setFilter={setFilter} />

      {/* Grid for months and days */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* Months Row */}
          {months.map((month, index) => (
            <div key={index} className="col-span-1 text-center font-bold">
              {month}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Days Row (assuming 31 days for simplicity) */}
          {[...Array(31).keys()].map((day) => (
            <div key={day} className="col-span-1 text-center">
              {day + 1}
            </div>
          ))}
        </div>

        {/* Booking Blocks */}
        <div className="relative mt-4">
          {filteredBookings.map((booking, index) => {
            const startDay = new Date(booking.startDate).getDate();
            const endDay = new Date(booking.endDate).getDate();
            const duration = endDay - startDay + 1;

            return (
              <div
                key={index}
                className={`absolute top-${index * 20} left-${startDay} col-span-${duration} rounded-lg`}
              >
                <BookingGrid booking={booking} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FrontDesk;
