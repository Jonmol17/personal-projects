import Header from "../Components/Header"
import AddFavorite from "./components/AddFavorite"


function page() {


  return (
    <div className="min-h-screen bg-gray-800">
      <Header />
      
      <AddFavorite />
    </div>
  )
}

export default page
