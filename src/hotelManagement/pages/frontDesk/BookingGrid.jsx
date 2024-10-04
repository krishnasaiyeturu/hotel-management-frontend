/* eslint-disable react/prop-types */
import { format } from "date-fns";

// Define status colors for different booking statuses
const statusColors = {
  "due-in": "bg-yellow-100 text-yellow-700",
  "checked-in": "bg-green-100 text-green-700",
  "checked-out": "bg-blue-100 text-blue-700",
  "due-out": "bg-red-100 text-red-700",
};

const BookingCard = ({ booking }) => {
  const { name, startDate, endDate, status } = booking;

  // Use date-fns to format the dates
  const startDay = format(new Date(startDate), "MMM d");
  const endDay = format(new Date(endDate), "MMM d");

  return (
    <div className={`p-3 sm:p-4 md:p-5 lg:p-6 rounded ${statusColors[status]}`}>
      {/* Guest Name */}
      <div className="font-bold text-xs sm:text-sm md:text-base lg:text-lg">
        {name}
      </div>

      {/* Booking Date Range */}
      <div className="text-xs sm:text-sm md:text-base lg:text-lg">
        {`${startDay} - ${endDay}`}
      </div>
    </div>
  );
};

// Default props for validation
BookingCard.defaultProps = {
  booking: {
    name: "Guest Name",
    startDate: new Date(), // Default start date
    endDate: new Date(), // Default end date
    status: "checked-in", // Default status
  },
};

export default BookingCard;
