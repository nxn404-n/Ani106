import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import SeasonalAni from "./components/SeasonalAni";
import TopAni from "./components/TopAni";
import AniDetails from "./components/AniDetails";
import SearchLandingPage from "./components/SearchLandingPage";
import UpcomingAni from "./components/UpcomingAni";
import NewAnime from "./components/NewAnime";

function App() {
  const { showDetails } = useSelector((state) => state.aniDetails);
  const { searchShow } = useSelector((state) => state.search);

  return (
    <div className='p-3'>
      <Navbar />

      {/* If searchShow is true then it only shows the SearchLandingPage or if the showDetailsis true then it shows AniDetails or else it only shows TopAni and SeasonalAni component */}
      {searchShow ? (
        <SearchLandingPage />
      ) : showDetails ? (
        <AniDetails />
      ) : (
        <div>
          <NewAnime />
          <TopAni />
          <UpcomingAni />
          <SeasonalAni />
        </div>
      )}
    </div>
  );
}

export default App;
