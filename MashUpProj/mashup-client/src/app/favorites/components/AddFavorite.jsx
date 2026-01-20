/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useSearchWeather } from '@/app/Hooks/useSearchWeather';
import { useEffect, useState } from 'react';
import Favoriter from './Favoriter';

function AddFavorite() {
const [ favoriteWeather, setFavoriteWeather ] = useState([]);
const [ isLoadingWeather, setIsLoadingWeather ] = useState(false);
const [ weatherError, setWeatherError ] = useState(null);

  const {
    query, 
    setQuery,
    weatherData,
    fetchWeatherCurrent,
  } = useSearchWeather();

  const { api } = useAuth();

  async function handleSearch(e) {
    e.preventDefault();
    fetchWeatherCurrent();
  }

  async function addFavoriteAsync() {

    if (!weatherData) {
      return;
    }

    try {
      await api.post("api/favorite/addFavorite", {
        City: weatherData.location.name,
        Country: weatherData.location.country
      });

    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  useEffect(() => {
    async function fetchFavorites() {
      setIsLoadingWeather(true);
      try {
        const res = await api.get("api/favorite/favoriteWeather");
        setFavoriteWeather(res.data);
        console.log("Favorites: ", res.data);
      } catch (error) {
        setWeatherError(error.message);
        console.error(error);
      } finally {
        setIsLoadingWeather(false);
      }
    }
    fetchFavorites();
  }, [api]);

  return (
    <div className='flex flex-col p-8 text-white'>
      <h2 className='text-2xl mb-2'>Lägg till favorit</h2>
      <p>Fyll i en <span className='font-semibold'>stad/ort</span> och klicka på sök knappen</p>
      <p>Klicka på plussknappen för att lägga till som <span className='font-semibold text-yellow-300'>FAVORIT!</span></p>
      
      <div className='w-1/2'>
        <form
          onSubmit={handleSearch}
          className="flex bg-white rounded-md shadow-sm overflow-hidden mt-4"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stad / ort"
            className="p-2 flex-1 border border-gray-300 text-black"
          />
          <button
            type="submit"
            className="px-4 bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
          >
            Sök
          </button>
        </form>

        { weatherData &&
        <div className="bg-white/80 rounded-lg p-5 shadow-md space-y-4 mt-4 text-black">
          <span 
            className='float-right bg-green-300 rounded-full px-2 hover:scale-105 cursor-pointer'
            onClick={addFavoriteAsync}
            >
              +
            </span>
          <div>
            <h3 className="text-xl font-bold">
              {weatherData.location.name}
              <span className="ml-2 text-sm font-normal text-gray-600">
                {weatherData.location.country}
              </span>
            </h3>
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
        </div>
        }
      </div>

      <div className='flex flex-col justify-center mt-20'>
        <h2 className="text-3xl font-semibold mb-6 text-white">Favoriter</h2>
        <Favoriter favoriteWeather={favoriteWeather} isLoadingWeather={isLoadingWeather} weatherError={weatherError} />
      </div>
    </div>
  )
}

export default AddFavorite
