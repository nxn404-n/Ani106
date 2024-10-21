import { useDispatch, useSelector } from "react-redux";
import fetchSeasonalAniData from "../api/seasonalAniApi";
import HorizontalSlide from "./HorizontalSlide";
import { useState, useEffect } from "react";
import getSeasonsData from "../api/getSeasonsApi";
import { MdKeyboardArrowDown } from "react-icons/md";

const SeasonalAni = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // This state decides that if the seasons dropdown menu is gonna show or not
  const [showSeasons, setShowSeasons] = useState(false);

  // Stores the value that was clicked so that we can show it above the list
  const [currentSeason, setCurrentSeason] = useState({
    year: '',
    season: '',
  })

  const handleShowSeasons = () => {
    setShowSeasons(!showSeasons);
  };

  const dispatch = useDispatch();
  const { seasonalAniData, seasons } = useSelector(
    (state) => state.seasonalAni,
  );

  // Fetches specified season anime data from the api
  const handleClick = (season, year) => {
    dispatch(fetchSeasonalAniData({ url: apiUrl, season: season, year: year }));
    setCurrentSeason({
      year: year,
      season: season,
    })
  };

  // Gets all the seasons when the app renders
  useEffect(() => {
    dispatch(getSeasonsData(apiUrl));
  }, [apiUrl, dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="mt-9 text-xl">Seasonal Anime</h2>

      <div className="cursor-pointer">
        <div
          className="relative flex max-w-44 items-center justify-center gap-1 rounded-md border-2 border-[#FFBADE] py-1"
          onClick={handleShowSeasons}
        >
          <p>Select any season</p>
          <MdKeyboardArrowDown className="text-2xl" />
        </div>
        {showSeasons && (
          <div
            className="absolute z-10 max-h-72 w-1/2 max-w-96 cursor-pointer overflow-y-scroll border-2 border-[#FFBADE] bg-[#201F31] p-3 rounded-md flex flex-col gap-5"
            onClick={() => handleShowSeasons()}
          >
            {/* It maps through the seasons data and returns a long list of all the year and seasons */}
            {seasons.map((yearData) => (
              <div key={yearData.year}>
                <strong className="text-[#FFBADE]">{yearData.year}</strong>
                {yearData.seasons.map((season, index) => (
                  <div key={`${season} ${yearData.year}`}>
                    <div
                      key={`${yearData.year}-${index}`}
                      onClick={() => handleClick(season, yearData.year)}
                    >
                      {season} {yearData.year}
                    </div>
                    <hr/>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* This shows the selected season and year and the data*/}
        <div className="text-xl pl-2 ">{ currentSeason.season } { currentSeason.year }</div>
      <HorizontalSlide data={seasonalAniData} sliderId="SeasonalAni" />
      </div>
    </div>
  );
};

export default SeasonalAni;
