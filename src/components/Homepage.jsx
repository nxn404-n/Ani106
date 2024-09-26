import NewAnime from "./NewAnime";
import TopAni from "./TopAni";
import UpcomingAni from "./UpcomingAni";
import SeasonalAni from "./SeasonalAni";

const Homepage = () => {
  return (
    <div className="pl-4">
      <NewAnime />
      <TopAni />
      <SeasonalAni />
      <UpcomingAni />
    </div>
  );
};

export default Homepage;
