import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { MovieList } from './components/MovieList';
import { Payment } from './components/Payment';
import { SeatBooking } from './components/SeatBooking';
import { TheatreSelection } from './components/TheatreSelection';

const App = () => {
  const [currentPage, setCurrentPage] = useState('movies');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookingData, setBookingData] = useState({
    movieId: null,
    theatreId: null,
    showTime: null,
    seats: [],
    totalAmount: 0
  });

  const baseStyles = isDarkMode ? 
    "bg-black text-white min-h-screen" : 
    "bg-white text-black min-h-screen";

  const renderPage = () => {
    switch(currentPage) {
      case 'movies':
        return <MovieList 
          isDarkMode={isDarkMode}
          onSelectMovie={(movieId) => {
            setBookingData({ ...bookingData, movieId });
            setCurrentPage('theatres');
          }} 
        />;
      case 'theatres':
        return <TheatreSelection 
          isDarkMode={isDarkMode}
          onSelectShow={(theatreId, showTime) => {
            setBookingData({ ...bookingData, theatreId, showTime });
            setCurrentPage('booking');
          }}
          onBack={() => setCurrentPage('movies')}
        />;
      case 'booking':
        return <SeatBooking 
          isDarkMode={isDarkMode}
          onConfirmSeats={(seats, totalAmount) => {
            setBookingData({ ...bookingData, seats, totalAmount });
            setCurrentPage('payment');
          }}
          onBack={() => setCurrentPage('theatres')}
        />;
      case 'payment':
        return <Payment 
          isDarkMode={isDarkMode}
          bookingData={bookingData}
          onComplete={() => setCurrentPage('movies')}
          onBack={() => setCurrentPage('booking')}
        />;
      default:
        return <MovieList isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={baseStyles}>
      <div className="container mx-auto">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        {renderPage()}
      </div>
    </div>
  );
};









export default App;
