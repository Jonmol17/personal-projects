/* eslint-disable @next/next/no-img-element */

import { useAuth } from "../context/AuthContext";
import { useRealtimeWeather } from "../Hooks/useRealtimeWeather";


function RealtimeWeatherData() {
    const { lat, lon, getCurrentLocation, realTimeWeatherData } = useRealtimeWeather();

    const {
        isAuthenticated,
      } = useAuth();

  return (
    <div>
    { !lat && !lon &&
          <button onClick={getCurrentLocation} disabled={!isAuthenticated} className={isAuthenticated ? `bg-black text-white p-2 rounded-md hover:bg-gray-800 cursor-pointer` : ' bg-red-400 text-black p-2 rounded-md cursor-pointer'}>
            { isAuthenticated ? 'Hämta platsdata' : 'Logga in för att hämta platsdata' }
          </button>
        }

        {realTimeWeatherData && (
          <div className="max-w-sm w-full rounded-xl shadow-lg bg-white/70 backdrop-blur p-5 border border-gray-200">
            
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                {realTimeWeatherData.location.name}
              </h3>
              <span className="text-sm text-gray-500">
                {realTimeWeatherData.location.country}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl font-bold text-gray-900">
                {realTimeWeatherData.current.temp_c}°
              </span>

              <img
                className="w-14 h-14"
                src={"https:" + realTimeWeatherData.current.condition.icon}
                alt={realTimeWeatherData.current.condition.text}
              />

              <span className="text-gray-700">
                {realTimeWeatherData.current.condition.text}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-700">Uppdaterad:</span>{" "}
                {realTimeWeatherData.current.last_updated}
              </p>

              <p>
                <span className="font-medium text-gray-700">Koordinater:</span>{" "}
                {realTimeWeatherData.location.lat}, {realTimeWeatherData.location.lon}
              </p>
            </div>
          </div>
        )}
    </div>
  )
}

export default RealtimeWeatherData
