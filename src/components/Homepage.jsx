import NewAnime from "./NewAnime";
import TopAni from './TopAni';
import UpcomingAni from './UpcomingAni';
import SeasonalAni from './SeasonalAni';

const Homepage = () => {

  return (
    <div>
      <NewAnime />
      <TopAni />
      <UpcomingAni />
      <SeasonalAni />
    </div>
  )
}

export default Homepage;