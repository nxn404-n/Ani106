// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopAni } from "../api/topAniApi";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

const TopAni = () => {
  // Api endpoints
  const apiUrl = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();

  // Get the top anime data from the redux store
  const { data } = useSelector((state) => state.topAni);

  // Fetch top anime list everytime the website loads
  useEffect(() => {
    dispatch(fetchTopAni(apiUrl));
  }, [dispatch, apiUrl]);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 250;
  }

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 250;
  }

  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-xl mt-9 text-white">Top Anime</h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        <MdOutlineKeyboardArrowLeft 
          className="slideBtn left-0 rounded-e-full"
          onClick={slideLeft}
        />

         {/* Right Arrow */}
         <MdOutlineKeyboardArrowRight 
          className="slideBtn right-0 rounded-s-full"
          onClick={slideRight}
        />
        
        {/* Horizontal scrolling container */}
        <div className="flex items-center overflow-x-auto gap-5 scroll-smooth scroll-container" id="slider">
          {data.map((anime) => (
            <div
              key={anime.mal_id}
              className="flex-shrink-0 w-48 p-3 bg-gray-800 rounded-lg text-center"
            >
              <img
                className="w-full h-64 object-cover rounded-lg mb-3"
                src={anime.images.webp.image_url}
                alt={anime.title}
              />
              <p className="text-white text-sm truncate">#{anime.rank} {anime.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAni;
