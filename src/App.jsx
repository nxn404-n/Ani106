import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import SeasonalAni from "./components/SeasonalAni";
import TopAni from "./components/TopAni";
import AniDetails from "./components/AniDetails";

function App() {
  const { showDetails } = useSelector((state) => state.aniDetails);

  return (
    <div className='bg-[#996DAD] h-full w-full p-3'>
      <Navbar />

      {showDetails ? (
        <AniDetails />
      ) : (
        <div>
          <TopAni />
          <SeasonalAni />
        </div>
      )}
    </div>
  );
}

export default App;
