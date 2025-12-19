import Header from "./Components/Header";
import HomeAside from "./Components/HomeAside";
import SearchWeather from "./Components/SearchWeather";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />

        <div className="mt-2 rounded-lg shadow-md">
          <HomeAside />
        
          <SearchWeather />
        </div>
      
    </div>
  );
}
