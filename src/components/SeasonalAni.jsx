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
    (state) => state.seasonalAni
  );

  const handleClick = (season, year) => {
    dispatch(fetchSeasonalAniData({ url: apiUrl, season: season, year: year }));
  };

  useEffect(() => {
    dispatch(getSeasonsData(apiUrl));
  }, [apiUrl, dispatch]);
  console.log(seasons);

  return (
    <div>
      <h2 className='text-xl mt-9 text-white'>Seasonal Anime</h2>

      <div>
        <div
          className='flex items-center gap-1 border-2 max-w-44 justify-center py-1 rounded-md'
          onClick={() => handleShowSeasons()}
        >
          <p>Select any season</p>
          <MdKeyboardArrowDown className='text-2xl' />
        </div>
        {showSeasons && (
          <div className='border-2 max-h-72 max-w-96 overflow-y-scroll cursor-pointer'>
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

      <HorizontalSlide data={seasonalAniData} sliderId='SeasonalAni' />
    </div>
  );
};

export default SeasonalAni;
