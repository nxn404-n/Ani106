import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchUpcomingAni from "../api/upcomingAniApi";
import HorizontalSlide from "./HorizontalSlide";

const UpcomingAni = () => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { upcomingAnidata, upcomingAnimeStatus } = useSelector(
    (state) => state.upcomingAni,
  );

  useEffect(() => {
    dispatch(fetchUpcomingAni(apiUrl));
  }, [dispatch, apiUrl]);

  // Conditionally rendering the content of upcoming anime so that it is only visible when we get data from the API
  if (upcomingAnimeStatus !== "succeeded") {
    return null;
  }
  return (
    <div className="flex flex-col gap-7">
      <h2 className="mt-9 text-xl">Upcoming Anime</h2>

      <HorizontalSlide data={upcomingAnidata} sliderId="UpcomingAni" />
    </div>
  );
};

export default UpcomingAni;
