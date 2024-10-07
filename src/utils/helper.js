export const generateDates = (month, year) => {
  let days = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
};

export const generateMonthNames = () => {
  const monthAbbreviations = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthAbbreviations;
};

export const getDayFromDateString = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
};

export const getDecadeRange = (year) => {
  const startYear = Math.floor(year / 10) * 10;
  const endYear = startYear + 9;
  
  let years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  
  return years;
}

export const OCCUPANCY_STATUSES = {
  BOOKINGS: 'Bookings',
  CHECK_IN: 'Checked In / Out',
  CHECK_OUT: 'Checked Out',
  NO_SHOW: 'No Show'
};

export const OCCUPANCY_STATUS_LABELS = {
  [OCCUPANCY_STATUSES.BOOKINGS]: 'booked',
  [OCCUPANCY_STATUSES.CHECK_IN]: 'checked-in',
  [OCCUPANCY_STATUSES.CHECK_OUT]: 'checked-out',
  [OCCUPANCY_STATUSES.NO_SHOW]: 'no-show'
};

export const OCCUPANCY_STATUS_STYLES = [
  {
    name: OCCUPANCY_STATUSES.BOOKINGS,
    className: 'rounded-lg bg-blue-100 text-blue-400 p-2 me-2 text-sm',
    activeColor: 'border-2 border-blue-600 text-blue-800',
  },
  {
    name: OCCUPANCY_STATUSES.CHECK_IN,
    className: 'rounded-lg bg-yellow-100 text-yellow-400 p-2 me-2 text-sm',
    activeColor: 'border-2 border-yellow-600 text-yellow-600',
  },
  {
    name: OCCUPANCY_STATUSES.NO_SHOW,
    className: 'rounded-lg bg-red-100 text-red-400 p-2 me-2 text-sm',
    activeColor: 'border-2 border-red-600 text-red-600',
  }
];

export const getRandomNumber = () => Math.floor(Math.random() * 5);


export const getDaysInMonth = (checkIn, checkOut, month) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const startOfMonth = new Date(checkInDate.getFullYear(), month - 1, 1);
  const endOfMonth = new Date(checkInDate.getFullYear(), month, 0);

  let checkin = startOfMonth.getDate();
  let checkout = endOfMonth.getDate();

  if (month === checkInDate.getMonth() + 1) {
    checkin = checkInDate.getDate();
  }

  if (month === checkOutDate.getMonth() + 1) {
    checkout = checkOutDate.getDate();
  }

  return { checkin, checkout };
}



