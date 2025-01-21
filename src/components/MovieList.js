import React, { useState } from 'react';
 export const MovieList = ({ onSelectMovie, isDarkMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [movies] = useState([
    { id: 1, name: 'Inception', language: 'english', image: '/images/movies/Inception.png' },
    { id: 2, name: 'Dangal', language: 'hindi', image: '/images/movies/Dangal.png' },
    { id: 3, name: 'RRR', language: 'telugu', image: '/images/movies/RRR.png' },
    { id: 4, name: 'KGF', language: 'kannada', image: '/images/movies/KGF.png' }
  ]);

  const cardStyle = isDarkMode ? 
    "border border-white rounded-lg p-4 cursor-pointer hover:bg-gray-900" :
    "border border-black rounded-lg p-4 cursor-pointer hover:bg-gray-100";

  const selectStyle = isDarkMode ?
    "p-2 border border-white rounded bg-black text-white" :
    "p-2 border border-black rounded bg-white text-black";

  const filteredMovies = selectedLanguage === 'all' 
    ? movies 
    : movies.filter(movie => movie.language === selectedLanguage);

  return (
    <div className="p-6">
      <div className="mb-6">
        <select 
          className={selectStyle}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="all">All Languages</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
          <option value="kannada">Kannada</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map(movie => (
          <div 
            key={movie.id}
            className={cardStyle}
            onClick={() => onSelectMovie(movie.id)}
          >
            <img 
              src={movie.image} 
              alt={movie.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">{movie.name}</h3>
            <p className="capitalize opacity-75">{movie.language}</p>
          </div>
        ))}
      </div>
    </div>
  );
};