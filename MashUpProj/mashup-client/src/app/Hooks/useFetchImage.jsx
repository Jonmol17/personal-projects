/* import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchWeather } from "./useSearchWeather";

export function useFetchImage() {
  const [imagedata, setImagedata] = useState(null);

  const { api } = useAuth();

  async function fetchImage() {
    console.log("Fetching image for query:", fixedQuery);

    try {
      const res = await api.get(`/api/image/fetchImage/${fixedQuery}`);
      setImagedata(res.data);
      console.log("Image data:", res.data);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  }

  return {
    imagedata,
    fetchImage
  };
} */