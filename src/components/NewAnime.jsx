import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNewAnime from "../api/newAniApi";
import { FaPlayCircle } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";
import { Link } from "react-router-dom";

const NewAnime = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { newAnimeData } = useSelector((state) => state.newAnime);
  const dispatch = useDispatch();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("slide-in");

  // Preload the next image
  const preloadImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  };

  // This useEffect changes the content after a certain time
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("slide-out"); // Start slide-out animation
      setTimeout(() => {
        setCurrentCardIndex(
          (prevState) => (prevState + 1) % newAnimeData.length,
        );
        setAnimationClass("slide-in"); // Start slide-in animation for new content
      }, 800);
    }, 3000); // Interval for changing content

    // Preload the next image
    if (newAnimeData.length > 0) {
      const nextIndex = (currentCardIndex + 1) % newAnimeData.length;
      preloadImage(newAnimeData[nextIndex].images.webp.image_url);
    }

    return () => clearInterval(interval);
  }, [newAnimeData, currentCardIndex]);

  // Fetch new anime from api
  useEffect(() => {
    dispatch(fetchNewAnime(apiUrl));
  }, [dispatch, apiUrl]);

  const handleClick = (data) => {
    dispatch(setShowDetails(true));
    dispatch(setData(data));
  };

  const currentAnime =
    newAnimeData.length > 0 ? newAnimeData[currentCardIndex] : null;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <h2 className="mt-9 pb-4 text-xl">New This Season</h2>
      {newAnimeData.length > 0 && (
        <Link
          key={currentAnime.mal_id}
          to={`/details/${currentAnime.title}`}
          className="h-[265px] sm:h-96"
        >
          <div
            className={`flex h-full ${animationClass} justify-between sm:justify-start`}
            // sends data to show anime details
            onClick={() =>
              handleClick({
                title: currentAnime.title,
                title_japanese: currentAnime.title_japanese,
                image: currentAnime.images.webp.image_url,
                large_image: currentAnime.images.webp.large_image_url,
                episodes: currentAnime.episodes,
                score: currentAnime.score,
                rank: currentAnime.rank ? currentAnime.rank : null,
                synopsis: currentAnime.synopsis,
                popularity: currentAnime.popularity,
                members: currentAnime.members,
                status: currentAnime.status,
                year: currentAnime.year,
                favorites: currentAnime.favorites,
                rating: currentAnime.rating,
              })
            }
          >
            {/* Anime image */}
            <div key={currentAnime.mal_id} className="w-[270px]">
              <img
                src={currentAnime.images.webp.large_image_url}
                alt={`${currentAnime.title} anime picture`}
                className="fade-opacity h-[265px] sm:h-full"
              />
            </div>

            {/* Show how many eps the type and score of the anime and synopsis */}
            <div className="flex w-1/2 flex-col gap-5 p-2">
              <div className="max-w-full text-lg font-bold text-white sm:text-2xl">
                <p className="truncate">{currentAnime.title}</p>
              </div>
              <div className="h-full w-full sm:pt-2">
                <p className="line-clamp-5 sm:line-clamp-6">
                  {currentAnime.synopsis}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <div className="mini">
                  <FaPlayCircle />
                  <p>{currentAnime.type}</p>
                </div>
                <div className="mini">
                  <MdAccessTime />
                  <p>{currentAnime.episodes}eps</p>
                </div>
                <div className="mini">
                  <FaStar />
                  <p>{currentAnime.score}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NewAnime;
