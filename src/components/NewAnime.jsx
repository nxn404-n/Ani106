import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNewAnime from "../api/newAniApi";
import { FaPlayCircle } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { setData, setShowDetails } from "../feature/aniDetailsSlice";

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
          (prevState) => (prevState + 1) % newAnimeData.length
        );
        setAnimationClass("slide-in"); // Start slide-in animation for new content
      }, 500);
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
    dispatch(setShowDetails());
    dispatch(setData(data));
  };

  const currentAnime = newAnimeData.length > 0 ? newAnimeData[currentCardIndex] : null;


  return (
    <div className='h-full w-full flex flex-col'>
      <h2 className='text-xl mt-9 text-white pb-4'>New This Season</h2>
      {newAnimeData.length > 0 && (
        <div
          className={`flex h-[270px] ${animationClass}`}
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
          <div key={currentAnime.mal_id}>
            <img
              src={currentAnime.images.webp.image_url}
              alt={`${currentAnime.title} anime picture`}
              className='w-auto h-auto'
            />
          </div>
          <div className='flex flex-col w-1/2 justify-between'>
            <div className='text-lg text-white max-w-44'>
              <p className='truncate'>{currentAnime.title}</p>
            </div>
            <div className='text-sm flex gap-2'>
              <div className='mini'>
                <FaPlayCircle />
                <p>{currentAnime.type}</p>
              </div>
              <div className='mini'>
                <MdAccessTime />
                <p>{currentAnime.episodes}</p>
              </div>
              <div className='mini'>
                <FaStar />
                <p>{currentAnime.score}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAnime;
