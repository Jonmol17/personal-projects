/* eslint-disable @next/next/no-img-element */

function Favoriter({ favoriteWeather, isLoadingWeather, weatherError }) {

  return (
    <div className='flex'>

      <div className=" flex flex-row flex-wrap justify-center gap-4 bg-white/80 rounded-lg p-5 border">
        { favoriteWeather.length > 0 && favoriteWeather.map((fav, i) => (
          <div 
            className={fav.current.is_day === 1 ? "mb-2 text-white border p-4 rounded-xl bg-yellow-400" : "mb-2 text-black border p-4 rounded-xl bg-[#5b6efc]"}
            key={i}
          >
            <div className="">
              <h3 className="text-xl font-bold">
                {fav.location.name}
                <span className="ml-2 text-sm font-normal">
                  {fav.location.country}
                </span>
              </h3>
              <h2 className="text-sm font-normal mb-2">{fav.location.region}</h2>
            </div>

            <div className="flex text-black items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm w-fit">
              <span className="text-3xl font-semibold">
                {fav.current.temp_c}°
              </span>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8"
                  src={"https:" + fav.current.condition.icon}
                  alt={fav.current.condition.text}
                />
                <span className="text-md">
                  {fav.current.condition.text}
                </span>
              </div>
            </div>

            <p className="mt-2 text-sm">Senast uppdaterad: <span className="text-sm text-white">{fav.current.last_updated}</span></p>
            <span className="">{fav.current.is_day === 1 ? "Dag ☀️" : "Natt 🌑"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favoriter
