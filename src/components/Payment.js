import React, { useState } from 'react';
export const Payment = ({ bookingData, onComplete, onBack, isDarkMode }) => {
    const [receipt, setReceipt] = useState(null);
  
    const buttonStyle = isDarkMode ?
      "px-4 py-2 border border-white rounded hover:bg-gray-900" :
      "px-4 py-2 border border-black rounded hover:bg-gray-100";
  
    const cardStyle = isDarkMode ?
      "max-w-md mx-auto border border-white rounded-lg p-6" :
      "max-w-md mx-auto border border-black rounded-lg p-6";
  
    const generateReceipt = () => {
      const receiptData = {
        movieName: "Inception",
        theatre: "PVR Cinemas",
        showTime: bookingData.showTime,
        seats: bookingData.seats,
        totalAmount: bookingData.totalAmount,
        bookingId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString()
      };
      setReceipt(receiptData);
    };
  
    return (
      <div className="p-6">
        {!receipt ? (
          <div>
            <div className="flex items-center mb-6">
              <button onClick={onBack} className={buttonStyle}>Back</button>
              <h2 className="text-2xl font-bold ml-4">Payment</h2>
            </div>
            <button
              className={isDarkMode ? 
                "px-6 py-2 bg-white text-black rounded" : 
                "px-6 py-2 bg-black text-white rounded"}
              onClick={generateReceipt}
            >
              Complete Payment
            </button>
          </div>
        ) : (
          <div className={cardStyle}>
            <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
            <div className="space-y-2">
              <p><strong>Booking ID:</strong> {receipt.bookingId}</p>
              <p><strong>Movie:</strong> {receipt.movieName}</p>
              <p><strong>Theatre:</strong> {receipt.theatre}</p>
              <p><strong>Show Time:</strong> {receipt.showTime}</p>
              <p><strong>Date:</strong> {receipt.date}</p>
              <p><strong>Seats:</strong> {receipt.seats.join(', ')}</p>
              <p><strong>Total Amount:</strong> ₹{receipt.totalAmount}</p>
            </div>
            <button
              onClick={onComplete}
              className={isDarkMode ? 
                "mt-6 px-6 py-2 bg-white text-black rounded" : 
                "mt-6 px-6 py-2 bg-black text-white rounded"}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    );
  };