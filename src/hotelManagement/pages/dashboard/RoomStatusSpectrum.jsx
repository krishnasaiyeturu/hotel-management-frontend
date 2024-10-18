import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RoomStatusSpectrum = () => {
  // Total rooms
  const totalRooms = 50;

  // Mock data for room statuses
  const mockData = {
    checkedIn: 20,
    available: 25,
    maintenance: 5,
  };

  // Verify the total matches
  const totalCalculated =
    mockData.checkedIn + mockData.available + mockData.maintenance;

  // If the calculated total doesn't match, warn about potential data issues
  if (totalCalculated !== totalRooms) {
    console.warn("The total of room statuses doesn't match the total rooms.");
  }

  const [chartData] = useState({
    series: [mockData.available, mockData.checkedIn, mockData.maintenance],
    options: {
      chart: {
        type: "donut",
      },
      labels: [
        `Available Rooms (${mockData.available})`,
        `Checked-In (${mockData.checkedIn})`,
        `Under Maintenance (${mockData.maintenance})`,
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="mt-10">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={280}
      />
      </div>
  )
}
export default RoomStatusSpectrum;