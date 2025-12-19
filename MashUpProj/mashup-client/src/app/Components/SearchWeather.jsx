'use client';

import { useState } from 'react';
import '../globals.css';

import { useSearchWeather } from "../Hooks/useSearchWeather";

function SearchWeather() {
  const [openShowMore, setOpenShowMore] = useState(false);

  const {
    query, 
    setQuery,
    fetchWeatherCurrent,
    isLoadingWeather,
    weatherError,
    weatherData
  } = useSearchWeather();

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherCurrent();
  }

  return (
    <div className="flex flex-col justify-center ml-10 p-4 rounded-lg max-w-2xl min-h-96 text-black">
      <h2 className="text-2xl font-semibold mb-4">Väderprognos</h2>

      <form className="flex bg-white/90 rounded-md shadow-sm mb-6 max-w-sm">
        <input  
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Stad / ort"
          className="p-2 flex-1 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-200"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-black text-white rounded-r-md hover:bg-gray-800 hover:cursor-pointer "
        >
          Sök
        </button>
      </form>

      <div className='bg-gradient-to-r from-cyan-500 from- via-blue-500 via- to-purple-600 to- rounded-md p-4 shadow-md max-w-sm'>
        {isLoadingWeather && <p className="text-gray-200">Laddar...</p>}
        {weatherError && <p className="text-red-300">{weatherError}</p>}

        {weatherData && (
          <div className="flex-col bg-white/60 p-4 rounded-md text-black shadow-sm max-w-sm">
            <div className='flex flex-row items-center mb-2'>
              <h2 className="text-xl font-bold mr-2">{weatherData.location.name} <span className='font-normal text-md'>{weatherData.location.country}</span></h2>
            </div>

            <div className='flex flex-row rounded-full bg-white/70 p-2 w-16 items-baseline justify-center mb-2'>
              <p className=''>{weatherData.current.temp_c}</p>
              <span >°C</span>
            </div>

            <div className='flex flex-row items-center'>
              <p>{weatherData.current.condition.text}</p>
              <img className='w-10' src={"https:" + weatherData.current.condition.icon} alt=""/>
            </div>

            <span onClick={() => setOpenShowMore(!openShowMore)} className='flex justify-end hover:cursor-pointer hover:underline'>{openShowMore ? 'Dölj' : 'Visa mer'}</span>

            { weatherData && openShowMore && (
              <div className="border-t text-black max-w-sm">
                <h3 className="text-lg font-semibold mb-2 mt-2">Mer information</h3>
                <p>Information från {weatherData.current.last_updated}</p>
                <p>Kordinater: {weatherData.location.lat}, {weatherData.location.lon}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchWeather
