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

  const handleShowSeasons = () => {
    setShowSeasons(!showSeasons);
  };

  const dispatch = useDispatch();
  const { seasonalAniData, seasons } = useSelector(
    (state) => state.seasonalAni,
  );

  const handleClick = (season, year) => {
    dispatch(fetchSeasonalAniData({ url: apiUrl, season: season, year: year }));
  };

  useEffect(() => {
    dispatch(getSeasonsData(apiUrl));
  }, [apiUrl, dispatch]);

  return (
    <div>
      <h2 className="mt-9 text-xl text-white">Seasonal Anime</h2>

      <div className="cursor-pointer">
        <div
          className="relative flex max-w-44 items-center justify-center gap-1 rounded-md border-2 py-1"
          onClick={() => handleShowSeasons()}
        >
          <p>Select any season</p>
          <MdKeyboardArrowDown className="text-2xl" />
        </div>
        {showSeasons && (
          <div
            className="absolute z-10 max-h-72 w-1/2 max-w-96 cursor-pointer overflow-y-scroll border-2 border-red-800 bg-gray-600"
            onClick={() => handleShowSeasons()}
          >
            {/* It maps through the seasons data and returns a long list of all the year and seasons */}
            {seasons.map((yearData) => (
              <div key={yearData.year}>
                <hr />
                <strong>{yearData.year}</strong>
                {yearData.seasons.map((season, index) => (
                  <div
                    key={`${yearData.year}-${index}`}
                    onClick={() => handleClick(season, yearData.year)}
                  >
                    {season} {yearData.year}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <HorizontalSlide data={seasonalAniData} sliderId="SeasonalAni" />
    </div>
  );
};

export default SeasonalAni;
