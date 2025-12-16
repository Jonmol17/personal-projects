import Header from "./GlobalComponents/Header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <div className="min-h-100 flex items-center justify-center bg-gradient-to-tr from-slate-200 to-sky-600 rounded-md">
        <h1 className="text-4xl font-bold text-center text-white">
          Välkommen till PictureTheWeather
        </h1>
      </div>
    </div>
  );
}
