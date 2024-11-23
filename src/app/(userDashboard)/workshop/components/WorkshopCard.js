import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { truncateText, formatDate, formatTime } from './utils';

export default function WorkshopCard({ workshop, onClick }) {
  return (
    <div
      className="bg-white rounded-lg p-6 flex flex-col sm:flex-row items-center shadow-md cursor-pointer"
      onClick={() => onClick(workshop)}
    >
      <div className="w-full sm:w-1/3 h-48 sm:h-64 bg-gray-200 rounded-lg mb-4 sm:mb-0 sm:mr-6">
        {workshop.image && (
          <img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
      <div className="flex-grow flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-semibold mb-3">{workshop.title}</h2>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span className="mr-4">{formatDate(workshop.date)}</span>
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>{formatTime(workshop.time)}</span>
          </div>
          <p className="text-base text-gray-600 mb-4">
            {truncateText(workshop.description, 150)}
          </p>
        </div>
        <button className="bg-[#B85C38] text-white px-8 py-3 rounded-full text-lg font-medium self-start sm:self-end mt-4 transition duration-300 ease-in-out hover:bg-[#A04B2D] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-50">
          Join now
        </button>
      </div>
    </div>
  );
}