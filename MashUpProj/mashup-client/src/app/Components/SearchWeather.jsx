/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import '../globals.css';

import { useSearchWeather } from "../Hooks/useSearchWeather";
import { useAuth } from '../context/AuthContext';

function SearchWeather() {
  const [openShowMore, setOpenShowMore] = useState(false);

  const { username } = useAuth();

  const {
    query, 
    setQuery,
    fetchWeatherCurrent,
    isLoadingWeather,
    weatherError,
    weatherData,
    imagedata
  } = useSearchWeather();

  function handleSearch(e) {
    e.preventDefault();
    fetchWeatherCurrent();
  }

  console.log("Image data:", imagedata);

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className='text-2xl mb-10'>Hej {username}</h1>

      <h2 className="text-2xl font-semibold mb-6">Väderprognos</h2>

      <form
        onSubmit={handleSearch}
        className="flex bg-white rounded-md shadow-sm mb-8 max-w-lg overflow-hidden"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Stad / ort"
          className="p-3 flex-1 border border-gray-300 text-black font-semibold"
        />
        <button
          type="submit"
          className="px-4 bg-black text-white hover:bg-gray-800 cursor-pointer"
        >
          Sök
        </button>
      </form>

      {weatherData && weatherData !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div className="bg-white/80 rounded-lg p-5 shadow-md space-y-4">
            {isLoadingWeather && <p className="text-gray-green">Laddar...</p>}
            {weatherError && weatherError && <p className="text-red-500">{weatherError}</p>}

            <div>
              <h3 className="text-xl font-bold">
                {weatherData.location.name}
                <span className="ml-2 text-sm font-normal text-gray-600">
                  {weatherData.location.country}
                </span>
              </h3>

              <h2 className="text-sm font-normal text-gray-600 mb-2">{weatherData.location.region}</h2>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm w-fit">
              <span className="text-3xl font-semibold">
                {weatherData.current.temp_c}°
              </span>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8"
                  src={"https:" + weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                />
                <span className="text-sm">
                  {weatherData.current.condition.text}
                </span>
              </div>
            </div>

            {imagedata?.results?.length > 0 &&
              imagedata.results.map((img) => (
                <div key={img.id} className="space-y-2">
                  <img
                    src={img.urls.regular}
                    alt={img.alt_description || "saknas"}
                    className="rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-700">
                    {img.alt_description || "Ingen beskrivning"}
                  </p>
                </div>
              ))}

            <button
              onClick={() => setOpenShowMore(!openShowMore)}
              className="text-sm text-right w-full hover:underline hover:cursor-pointer "
            >
              {openShowMore ? "Dölj" : "Visa mer"}
            </button>

            {weatherData && openShowMore && (
              <div className="border-t pt-3 text-sm space-y-1">
                <h4 className="font-semibold">Mer information</h4>
                <p>Uppdaterad: {weatherData.current.last_updated}</p>
                <p>
                  Koordinater: {weatherData.location.lat},{" "}
                  {weatherData.location.lon}
                </p>
              </div>
            )}
          </div>

          <div className='float-right'>
            <h1>Historisk data</h1>
          </div>

        </div>        
      )}  
    </div>
  )
}

export default SearchWeather
