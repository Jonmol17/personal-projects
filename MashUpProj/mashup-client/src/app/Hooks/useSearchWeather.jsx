'use client';

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function useSearchWeather() {
  const [ query, setQuery ] = useState('');
  const [ isLoadingWeather, setIsLoadingWeather ] = useState(false);
  const [ weatherError, setWeatherError ] = useState(null);
  const [ weatherData, setWeatherData ] = useState(null);

  const { api } = useAuth();

  async function fetchWeatherCurrent() {

    if (!query) {
      setWeatherError("Ange en stad eller ort.");
      return;
    }

    setIsLoadingWeather(true);
    setWeatherError(null);

    try {
      const res = await api.get(`api/weather/current/${query}`);
      setWeatherData(res.data);
      console.log("Fetched current weather data:", res.data);
    } catch (err) {
      console.error("Error fetching current weather:", err);
      setWeatherError(err);
    } finally {
      setIsLoadingWeather(false);
    }
  }

  return {
    query, 
    setQuery,
    fetchWeatherCurrent,
    isLoadingWeather,
    weatherError,
    weatherData
  };
}