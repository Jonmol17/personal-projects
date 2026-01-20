import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useAuth } from "../context/AuthContext";

export function useRealtimeWeather() {
  const [ isLoading, setIsLoading ] = useState(false);

  const [ lat , setLat ] = useState(null);
  const [ lon , setLon ] = useState(null);
  const [ realTimeWeatherData, setRealTimeWeatherData ] = useState(null);

  const {
    isAuthenticated,
  } = useAuth();
  
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      setLat(latitude);
      setLon(longitude);
    })
  }

  useEffect(() => {
    if (lat == null || lon == null) return;

    if (!isAuthenticated) return;

    console.log("Token: ", localStorage.getItem("Token"));

    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8080/DataHubV1", {
        accessTokenFactory: () => localStorage.getItem("Token")
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("WeatherData", data => {
      setRealTimeWeatherData(data);
    });

    connection.start()
      .then(() => connection.invoke("JoinWeatherHubByCity", lat, lon))
      .catch(console.error);

    return () => {
      connection.off("WeatherData");
      connection.stop();
    };
  }, [lat, lon, isAuthenticated]);


  return {
    getCurrentLocation,
    lat,
    lon,
    realTimeWeatherData,
  }
}