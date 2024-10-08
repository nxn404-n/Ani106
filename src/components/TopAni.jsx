// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopAni } from "../api/topAniApi";
import HorizontalSlide from "./HorizontalSlide";

const TopAni = () => {
  // Api endpoints
  const apiUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();

  // Get the top anime data from the redux store
  const { topAnidata, topAniStatus } = useSelector((state) => state.topAni);

  // Fetch top anime list everytime the website loads
  useEffect(() => {
    dispatch(fetchTopAni(apiUrl));
  }, [dispatch, apiUrl]);

  return (
    <>
      {topAniStatus === 'succeeded' ? (
        <div className="flex flex-col gap-7">
          <h2 className="mt-9 text-xl">Top Anime</h2>
  
          <HorizontalSlide data={topAnidata} sliderId="TopAni" />
        </div>
      ) : null}
    </>
  );
};

export default TopAni;
