import React, { useState } from 'react';
export const SeatBooking = ({ onConfirmSeats, onBack, isDarkMode }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatLayout] = useState({
      rows: ['A', 'B', 'C', 'D', 'E'],
      seatsPerRow: 8,
      occupiedSeats: ['A2', 'B5', 'C3', 'D7'],
      pricePerSeat: 200
    });
  
    const buttonStyle = isDarkMode ?
      "px-4 py-2 border border-white rounded hover:bg-gray-900" :
      "px-4 py-2 border border-black rounded hover:bg-gray-100";
  
    const selectedButtonStyle = isDarkMode ?
      "px-4 py-2 bg-white text-black rounded" :
      "px-4 py-2 bg-black text-white rounded";
  
    const handleSeatClick = (seatId) => {
      if (seatLayout.occupiedSeats.includes(seatId)) return;
      
      setSelectedSeats(prev => 
        prev.includes(seatId)
          ? prev.filter(seat => seat !== seatId)
          : [...prev, seatId]
      );
    };
  
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className={buttonStyle}>Back</button>
          <h2 className="text-2xl font-bold ml-4">Select Seats</h2>
        </div>
  
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 ${isDarkMode ? 'border-white' : 'border-black'} border`}></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500"></div>
              <span>Occupied</span>
            </div>
          </div>
        </div>
  
        <div className="mb-8">
          {seatLayout.rows.map(row => (
            <div key={row} className="flex gap-2 mb-2">
              <div className="w-8 flex items-center justify-center">{row}</div>
              {[...Array(seatLayout.seatsPerRow)].map((_, index) => {
                const seatId = `${row}${index + 1}`;
                const isOccupied = seatLayout.occupiedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
  
                return (
                  <button
                    key={seatId}
                    className={`w-8 h-8 rounded ${
                      isOccupied ? 'bg-red-500' :
                      isSelected ? 'bg-green-500' :
                      isDarkMode ? 'border-white border hover:bg-gray-900' : 'border-black border hover:bg-gray-100'
                    }`}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={isOccupied}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
  
        <div className="border-t pt-4">
          <div className="mb-4">
            <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
            <p>Total Amount: ₹{selectedSeats.length * seatLayout.pricePerSeat}</p>
          </div>
          <button
            className={selectedSeats.length > 0 ? selectedButtonStyle : `${buttonStyle} opacity-50`}
            disabled={selectedSeats.length === 0}
            onClick={() => onConfirmSeats(selectedSeats, selectedSeats.length * seatLayout.pricePerSeat)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    );
  };