import { useDispatch, useSelector } from "react-redux";
import fetchSeasonalAniData from "../api/seasonalAniApi";
import HorizontalSlide from "./HorizontalSlide";
import { useEffect } from "react";

const SeasonalAni = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.seasonalAni);

  const handleClick = (season, year) => {
    dispatch(fetchSeasonalAniData({ url: apiUrl, season: season, year: year }));
  };

  useEffect(() => {
    dispatch(fetchSeasonalAniData({ url: apiUrl, season: "fall", year: 2024 }));
  }, [apiUrl, dispatch]);

  return (
    <div>
      <h2 className='text-xl mt-9 text-white'>Seasonal Anime</h2>
      <button className='customBtn' onClick={() => handleClick("winter", 2024)}>
        Winter 2024
      </button>
      <button className='customBtn' onClick={() => handleClick("spring", 2024)}>
        Spring 2024
      </button>
      <button className='customBtn' onClick={() => handleClick("summer", 2024)}>
        Summer 2024
      </button>
      <button className='customBtn' onClick={() => handleClick("fall", 2024)}>
        Fall 2024
      </button>
      <HorizontalSlide data={data} sliderId='SeasonalAni' />
    </div>
  );
};

export default SeasonalAni;
