'use client';

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function useSearchWeather() {
  const [ query, setQuery ] = useState('');
  const [ isLoadingWeather, setIsLoadingWeather ] = useState(false);
  const [ weatherError, setWeatherError ] = useState(null);
  const [ weatherData, setWeatherData ] = useState(null);

  const [ imagedata, setImagedata ] = useState(null);

  const { api } = useAuth();

  const replaceSweChar = (str) => {
    return str.replaceAll('å', 'a')
      .replaceAll('ä', 'a')
      .replaceAll('ö', 'o')
      .replaceAll('Å', 'A')
      .replaceAll('Ä', 'A')
      .replaceAll('Ö', 'O');
  }

  async function fetchWeatherCurrent() {

    if (!query) {
      setWeatherError("Ange en stad eller ort.");
      return;
    }

    setIsLoadingWeather(true);
    setWeatherError(null);

    try {
      const fixedQuery = replaceSweChar(query);

      const res = await api.get(`api/weather/current/${fixedQuery}`);
      setWeatherData(res.data);

      var condition = res.data.current.condition.text;

      if (condition === "Soligt") {
        condition = "Sunny weather";
      } else if (condition === "Molnigt") {
        condition = "Cloudy weather";
      } else if (condition === "Lätt duggregn") {
        condition = "Rainy weather";
      } else if (condition === "Lätt snöfall") {
        condition = "Snowy weather";
      }

      const imageQuery = fixedQuery + " " + condition;
      console.log("Image query:", imageQuery);

      const res2 = await api.get(`api/image/fetchImage/${fixedQuery}`);
      setImagedata(res2.data);

      console.log("Image data:", res2.data);

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
    weatherData,
    imagedata,
  };
}