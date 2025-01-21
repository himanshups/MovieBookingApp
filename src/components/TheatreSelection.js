import React, { useState } from 'react';
export const TheatreSelection = ({ onSelectShow, onBack, isDarkMode }) => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [theatres] = useState([
    {
      id: 1,
      name: 'PVR Cinemas',
      shows: ['10:30 AM', '2:30 PM', '6:30 PM', '9:30 PM']
    },
    {
      id: 2,
      name: 'INOX',
      shows: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
    }
  ]);

  const buttonStyle = isDarkMode ?
    "px-4 py-2 border border-white rounded hover:bg-gray-900" :
    "px-4 py-2 border border-black rounded hover:bg-gray-100";

  const selectedButtonStyle = isDarkMode ?
    "px-4 py-2 bg-white text-black rounded" :
    "px-4 py-2 bg-black text-white rounded";

  const cardStyle = isDarkMode ?
    "mb-6 border border-white rounded-lg p-4" :
    "mb-6 border border-black rounded-lg p-4";

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className={buttonStyle}>
          Back
        </button>
        <h2 className="text-2xl font-bold ml-4">Select Theatre and Show Time</h2>
      </div>
      
      {theatres.map(theatre => (
        <div key={theatre.id} className={cardStyle}>
          <h3 className="text-xl font-semibold mb-4">{theatre.name}</h3>
          <div className="flex flex-wrap gap-4">
            {theatre.shows.map(show => (
              <button
                key={`${theatre.id}-${show}`}
                className={
                  selectedShow?.theatreId === theatre.id && selectedShow?.showTime === show
                    ? selectedButtonStyle
                    : buttonStyle
                }
                onClick={() => setSelectedShow({ theatreId: theatre.id, showTime: show })}
              >
                {show}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className={selectedShow ? selectedButtonStyle : `${buttonStyle} opacity-50`}
        disabled={!selectedShow}
        onClick={() => selectedShow && onSelectShow(selectedShow.theatreId, selectedShow.showTime)}
      >
        Continue
      </button>
    </div>
  );
};