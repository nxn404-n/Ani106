import NewAnime from "./NewAnime";
import TopAni from "./TopAni";
import UpcomingAni from "./UpcomingAni";
import SeasonalAni from "./SeasonalAni";

const Homepage = () => {
  return (
    <div>
      <NewAnime />
      <TopAni />
      <SeasonalAni />
      <UpcomingAni />
    </div>
  );
};

export default Homepage;
