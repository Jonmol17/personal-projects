/* eslint-disable @next/next/no-img-element */
'use client';

import { useRealtimeWeather } from "../Hooks/useRealtimeWeather";
import RealtimeWeatherData from "./RealtimeWeatherData";

function HomeAside() {
  const { realTimeWeatherData } = useRealtimeWeather();
  

  return (
    <div className="flex flex-col items-center bg-gray-700 float-right overflow-hidden min-h-screen w-1/4 p-4 rounded-lg mt-1 shadow-lg">
      <aside className="">
        <h2 className="text-xl text-center text-white font-bold border-b-2 border-black pb-2 mb-4">
          Realtidsväder utifrån position
        </h2>

        {realTimeWeatherData !== null && <p className="text-white mb-2">Hämta din platsdata och håll dig uppdaterad om vädret!</p>}

        <RealtimeWeatherData />
        
      </aside>
    </div>
  )
}

export default HomeAside
