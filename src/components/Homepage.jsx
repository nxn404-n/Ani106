// import { useSelector } from "react-redux";
import NewAnime from "./NewAnime";
import TopAni from './TopAni';
import UpcomingAni from './UpcomingAni';

const Homepage = () => {
  // const { showDetails } = useSelector((state) => state.aniDetails);
  // const { searchShow } = useSelector((state) => state.search);

  return (
    <div>
      <NewAnime />
      <TopAni />
      <UpcomingAni />
    </div>
  )
}

export default Homepage;