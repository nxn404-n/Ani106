import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchUpcomingAni from "../api/upcomingAniApi";
import HorizontalSlide from "./HorizontalSlide";

const UpcomingAni = () => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { upcomingAnidata } = useSelector((state) => state.upcomingAni);

  useEffect(() => {
    dispatch(fetchUpcomingAni(apiUrl));
  }, [dispatch, apiUrl]);

  return (
    <div className='flex flex-col gap-7'>
      <h2 className='text-xl mt-9 text-white'>Upcoming Anime</h2>

      <HorizontalSlide data={upcomingAnidata} sliderId='UpcomingAni' />
    </div>
  );
};

export default UpcomingAni;
